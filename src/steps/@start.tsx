import {Context} from '@matterway/sdk';
import {successStep} from 'steps/@success';
import {uploadFileStep} from './uploadFile';
import {extractFileDataStep} from './extractFileData';
import {navigateToProjectManagementStep} from './navigateToProjectManagement';
import {createEntriesStep} from './createEntries';
import {highlightCreatedEntriesStep} from './highlightCreatedEntries';

export async function startStep(ctx: Context) {
  console.log('step: startStep');

  const uploadedFile = await uploadFileStep(ctx);

  let highlights: string[] = [];
  if (uploadedFile !== null) {
    const excelData = await extractFileDataStep(ctx, uploadedFile);
    await navigateToProjectManagementStep(ctx);
    await createEntriesStep(ctx, excelData);
    highlights = await highlightCreatedEntriesStep(ctx, excelData);
  }

  await successStep(ctx, highlights);
}
