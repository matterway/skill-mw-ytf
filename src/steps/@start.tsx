import {Context} from '@matterway/sdk';
import {successStep} from 'steps/@success';
import {uploadFileStep} from './uploadFile';
import {extractFileDataStep} from './extractFileData';
import {navigateToProjectManagementStep} from './navigateToProjectManagement';

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  const uploadedFile = await uploadFileStep(ctx);

  if (uploadedFile !== null) {
    const _excelData = await extractFileDataStep(ctx, uploadedFile);
    await navigateToProjectManagementStep(ctx);
  }

  await successStep(ctx);
}
