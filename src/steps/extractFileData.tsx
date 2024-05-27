import {
  SDKFile,
  convertBase64ToBuffer,
  showProgress,
  type Context,
} from '@matterway/sdk';
import {Workbook} from 'exceljs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';
import {Entry} from 'shared/types';

export async function extractFileDataStep(ctx: Context, excelFile: SDKFile) {
  console.log('step: extractFileDataStep', {excelFile});

  await showProgress(ctx, t('progress.fetchData'));

  const fileBuffer = convertBase64ToBuffer(excelFile.data);
  const workbook = await new Workbook().xlsx.load(fileBuffer);
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
