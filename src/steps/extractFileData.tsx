import { MwFile, type Context } from '@matterway/sdk';
import { showUI } from '@matterway/sdk/lib/UIv2';
import { Workbook, Row } from 'exceljs';
import { t } from 'i18next';
import { isEmpty } from 'lodash-es';
import { Entry } from 'shared/types';

import { EXPECTED_HEADERS } from 'shared/constants';

export async function extractFileDataStep(ctx: Context, excelFile: MwFile) {
  console.log('step: extractFileDataStep', { excelFile });

  void showUI.progress(ctx, t('progress.fetchData'), { overlay: true });

  const workbook = await new Workbook().xlsx.load(excelFile.arrayBuffer);
  const worksheet = workbook.worksheets[0];

  const headerRow = worksheet.getRow(1);
  const validHeaders = EXPECTED_HEADERS.every((expected, index) => {
    const cellValue = headerRow.getCell(index + 1).value?.toString();
    return cellValue === expected;
  });

  if (!validHeaders) {
    throw new Error(`Invalid file structure. Expected headers: ${EXPECTED_HEADERS.join(', ')}`);
  }

  const data = worksheet.getRows(2, worksheet.rowCount);
  const extractedData: Entry[] =
    data
      ?.map((row: Row) => {
        const projectName = row.getCell(1).value?.toString() || '';
        const startDate = row.getCell(2).value?.toString() || '';
        const targetEndDate = row.getCell(3).value?.toString() || '';
        const budget = row.getCell(4).value?.toString() || '';

        if (!isEmpty(projectName)) {
          if (isEmpty(startDate) || isEmpty(targetEndDate)) {
            throw new Error(
              `Invalid data for project "${projectName}": Start date and Target end date are required.`
            );
          }

          const start = new Date(startDate);
          const end = new Date(targetEndDate);
          if (end < start) {
            throw new Error(
              `Invalid date range for project "${projectName}": End date (${targetEndDate}) cannot be before start date (${startDate}).`
            );
          }
        }

        return {
          projectName,
          startDate,
          targetEndDate,
          budget,
        };
      })
      .filter((obj: Entry) => !isEmpty(obj.projectName)) || [];

  console.log('step: extractFileDataStep end', { extractedData });
  return extractedData;
}
