import {click, waitForSelector, type Context} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';
import {SELECTORS} from 'shared/selectors';

export async function navigateToProjectManagementStep(ctx: Context) {
  console.log('step: navigateToProjectManagementStep');
  void showUI.progress(ctx, t('progress.createData'), {overlay: true});

  const {projects, xAddRecordsBtn} = SELECTORS.navigateToProjectManagement;

  await click(ctx, projects);
  await waitForSelector(ctx, xAddRecordsBtn);

  console.log('step: navigateToProjectManagementStep end');
}
