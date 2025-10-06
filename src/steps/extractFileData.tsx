import {MwFile, type Context} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {Workbook} from 'exceljs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';
import {Entry} from 'shared/types';

export async function extractFileDataStep(ctx: Context, excelFile: MwFile) {
  console.log('step: extractFileDataStep', {excelFile});

  void showUI.progress(ctx, t('progress.fetchData'), {overlay: true});

  const workbook = await new Workbook().xlsx.load(excelFile.arrayBuffer);
  const worksheet = workbook.worksheets[0];

  const data = worksheet.getRows(2, worksheet.rowCount);
  const extractedData: Entry[] =
    data
      ?.map((row) => ({
        projectName: row.getCell(1).value?.toString() || '',
        startDate: row.getCell(2).value?.toString() || '',
        targetEndDate: row.getCell(3).value?.toString() || '',
        budget: row.getCell(4).value?.toString() || '',
      }))
      .filter((obj) => !isEmpty(obj.projectName)) || [];

  console.log('step: extractFileDataStep end', {extractedData});
  return extractedData;
}
