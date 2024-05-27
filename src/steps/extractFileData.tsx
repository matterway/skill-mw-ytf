import {SDKFile, convertBase64ToBuffer, type Context} from '@matterway/sdk';
import {Workbook} from 'exceljs';
import {isEmpty} from 'lodash-es';

export async function extractFileDataStep(ctx: Context, excelFile: SDKFile) {
  console.log('step: extractFileDataStep', {excelFile});

  const fileBuffer = convertBase64ToBuffer(excelFile.data);
  const workbook = await new Workbook().xlsx.load(fileBuffer);
  const worksheet = workbook.worksheets[0];

  const data = worksheet.getRows(2, worksheet.rowCount);
  const extractedData = data
    ?.map((row) => ({
      projectName: row.getCell(1).value,
      startDate: row.getCell(2).value,
      targetEndDate: row.getCell(3).value,
      budget: row.getCell(4).value,
    }))
    .filter(
      (obj) =>
        !isEmpty(obj.projectName) ||
        !isEmpty(obj.startDate) ||
        !isEmpty(obj.targetEndDate) ||
        !isEmpty(obj.budget),
    );

  console.log('step: extractFileDataStep end', {extractedData});
  return extractedData;
}
