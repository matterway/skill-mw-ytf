import {highlightXPath, type Context} from '@matterway/sdk';
import {isEmpty} from 'lodash-es';
import {SELECTORS} from 'shared/selectors';
import {Entry} from 'shared/types';

export async function highlightCreatedEntriesStep(
  ctx: Context,
  excelData: Entry[],
) {
  console.log('step: highlightCreatedEntriesStep', {excelData});
  const {
    highlightCreatedEntries: {xProjectName},
  } = SELECTORS;

  const highlightedPromises = [];

  if (excelData.length > 0) {
    for (const entry of excelData) {
      if (isEmpty(entry.projectName)) {
        continue;
      }

      const tableElements = await ctx.page.$x(xProjectName(entry.projectName));

      if (tableElements.length > 1) {
        for (let i = 1; i <= tableElements.length; i++) {
          highlightedPromises.push(
            `(${xProjectName(entry.projectName)})[${i}]`,
          );
        }
      } else {
        highlightedPromises.push(xProjectName(entry.projectName));
      }
    }
  }

  await Promise.all(
    highlightedPromises.map((selector) => {
      return highlightXPath(ctx, selector);
    }),
  );

  console.log('step: highlightCreatedEntriesStep end');
  return highlightedPromises;
}
