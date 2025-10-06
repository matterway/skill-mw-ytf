import {type Context} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {DroppedMwFile} from '@matterway/sdk/lib/file/components';
import {Workbook} from 'exceljs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';

export async function uploadFileStep(ctx: Context) {
  console.log('step: uploadFileStep');

  const files = await showUI.fileUpload(ctx, {
    fileUploadTitle: 'Upload File',
    name: 'uploadFile',
    title: t('uploadFile.title'),
    description: t('uploadFile.description'),
    text: t('uploadFile.text'),
    loadingText: t('uploadFile.loadingText'),
    error: t('uploadFile.error'),
    maxFileLimit: 1,
    minFileLimit: 1,
    allowedTypes: {
      types: ['.xlsx', '.xls'],
      message: t('uploadFile.invalidFormat'),
    },
    maxFileSize: {
      size: 5 * 1024 * 1024, // 5MB
      message: t('uploadFile.fileTooLarge'),
    },
    buttons: [{text: t('uploadFile.submit'), value: 'ok'}],
    validate: async (droppedFile: DroppedMwFile) => {
      console.debug('validate: start', droppedFile);

      // Use arrayBuffer directly - no need to fetch
      if (!droppedFile.webUrl) {
        console.error('No webUrl available', {droppedFile});
        return {isValid: false, message: 'Could not read file'};
      }

      try {
        const workbook = await new Workbook().xlsx.load(
          droppedFile.arrayBuffer,
        );
        const worksheet = workbook.worksheets[0];

        // return false if the worksheet is empty
        if (isEmpty(worksheet)) {
          return {isValid: false, message: t('uploadFile.emptyFile')};
        }

        // return false if the worksheet has no data
        const data = worksheet.getRows(2, worksheet.rowCount); // skip the header row
        if (data && data.length <= 1) {
          return {isValid: false, message: t('uploadFile.noData')};
        }

        return {isValid: true, message: ''};
      } catch (error) {
        console.error('Validation error:', error);
        return {isValid: false, message: 'Invalid file format'};
      }
    },
  });

  const file = files?.[0];
  if (!file) {
    throw new Error('No file uploaded');
  }

  console.log('step: uploadFileStep end', {file});
  return file;
}
