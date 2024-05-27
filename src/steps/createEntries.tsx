import {
  clickByXPath,
  fill,
  waitForSelector,
  type Context,
  setValue,
  showProgress,
} from '@matterway/sdk';
import {SELECTORS} from 'shared/selectors';
import {Entry} from 'shared/types';
import dayjs from 'dayjs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';

export async function createEntriesStep(ctx: Context, excelData: Entry[]) {
  console.log('step: createEntriesStep', excelData);
  await showProgress(ctx, t('progress.createData'));

  const {
    navigateToProjectManagement: {xAddRecordsBtn},
    createEntries: {
      projectName,
      startDate,
      targetEndDate,
      budget,
      xSaveBtn,
      xProjectsBreadcrumb,
    },
  } = SELECTORS;

  if (excelData.length > 0) {
    for (const entry of excelData) {
      if (isEmpty(entry.projectName)) {
        continue;
      }

      const formattedDate = dayjs(entry.startDate).format('YYYY-MM-DD');
      const formattedEndDate = dayjs(entry.targetEndDate).format('YYYY-MM-DD');

      await clickByXPath(ctx, xAddRecordsBtn);
      await showProgress(ctx, t('progress.createData'));
      await waitForSelector(ctx, projectName);
      await fill(ctx, projectName, entry.projectName);
      await setValue(ctx, startDate, formattedDate);
      await setValue(ctx, targetEndDate, formattedEndDate);
      await fill(ctx, budget, String(entry.budget));
      await clickByXPath(ctx, xSaveBtn);
      await showProgress(ctx, t('progress.createData'));
      await clickByXPath(ctx, xProjectsBreadcrumb);
      await showProgress(ctx, t('progress.createData'));
    }
  }

  console.log('step: createEntriesStep end');
}
