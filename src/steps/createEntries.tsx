import {
  clickByXPath,
  fill,
  waitForSelector,
  type Context,
  setValue,
} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {SELECTORS} from 'shared/selectors';
import {Entry} from 'shared/types';
import dayjs from 'dayjs';
import {t} from 'i18next';
import {isEmpty} from 'lodash-es';

export async function createEntriesStep(ctx: Context, excelData: Entry[]) {
  console.log('step: createEntriesStep', excelData);
  void showUI.progress(ctx, t('progress.createData'), {overlay: true});

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
      void showUI.progress(ctx, t('progress.createData'), {overlay: true});
      await waitForSelector(ctx, projectName);
      await fill(ctx, projectName, entry.projectName);
      await setValue(ctx, startDate, formattedDate);
      await setValue(ctx, targetEndDate, formattedEndDate);
      await fill(ctx, budget, String(entry.budget));
      await clickByXPath(ctx, xSaveBtn);
      void showUI.progress(ctx, t('progress.createData'), {overlay: true});
      await clickByXPath(ctx, xProjectsBreadcrumb);
      void showUI.progress(ctx, t('progress.createData'), {overlay: true});
    }
  }

  console.log('step: createEntriesStep end');
}
