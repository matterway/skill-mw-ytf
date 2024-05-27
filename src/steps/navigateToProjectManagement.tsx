import {click, showProgress, waitForXPath, type Context} from '@matterway/sdk';
import {t} from 'i18next';
import {SELECTORS} from 'shared/selectors';

export async function navigateToProjectManagementStep(ctx: Context) {
  console.log('step: navigateToProjectManagementStep');
  await showProgress(ctx, t('progress.createData'));

  const {projects, xAddRecordsBtn} = SELECTORS.navigateToProjectManagement;

  await click(ctx, projects);
  await waitForXPath(ctx, xAddRecordsBtn);

  console.log('step: navigateToProjectManagementStep end');
}
