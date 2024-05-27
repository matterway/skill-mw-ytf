import {
  convertBase64ToBuffer,
  showUploadFile,
  type Context,
} from '@matterway/sdk';
import {DroppedFile} from '@matterway/sdk/lib/file/components';
import {Workbook} from 'exceljs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';

export async function uploadFileStep(ctx: Context) {
  console.log('step: uploadFileStep');

  const showUploadFileOptions = {
    title: t('uploadFile.title'),
    description: t('uploadFile.description'),
    text: t('uploadFile.text'),
    uploadButton: t('uploadFile.uploadButton'),
    loadingText: t('uploadFile.loadingText'),
    error: t('uploadFile.error'),
    maxFileLimit: 1,
    fileUploadTitle: '',
    buttons: [{text: t('uploadFile.submit'), value: 'ok'}],
    validate: async (droppedFile: DroppedFile) => {
      console.debug('validate: start', droppedFile);
      const validationResult = {
        isValid: false,
        message: t('uploadFile.invalidFormat'),
      };
      const fileBuffer = convertBase64ToBuffer(droppedFile.data);
      const workbook = await new Workbook().xlsx.load(fileBuffer);
      const worksheet = workbook.worksheets[0];

      // return false if the worksheet is empty
      if (isEmpty(worksheet)) {
        validationResult.message = t('uploadFile.emptyFile');
        return validationResult;
      }

      // return false if the worksheet has no data
      const data = worksheet.getRows(2, worksheet.rowCount); // skip the header row
      if (data && data.length <= 1) {
        validationResult.message = t('uploadFile.noData');
        return validationResult;
      }

      validationResult.isValid = true;

      return validationResult;
    },
  };

  const files = await showUploadFile(ctx, showUploadFileOptions);

  if (!files) {
    return null;
  }

  console.log('step: uploadFileStep end', files[0]);
  return {excelFile: files[0]};
}
