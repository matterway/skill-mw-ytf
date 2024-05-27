import {Context} from '@matterway/sdk';
import {successStep} from 'steps/@success';
import {uploadFileStep} from './uploadFile';

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  const _uploadedFile = await uploadFileStep(ctx);

  await successStep(ctx);
}
