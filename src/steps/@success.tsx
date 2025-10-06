import type {Context} from '@matterway/sdk';
import {removeAllHighlights} from '@matterway/sdk';
import {showUI} from '@matterway/sdk/lib/UIv2';
import {t} from 'i18next';

// You can duplicate this step to represent different endings for this task
// which are not "technical errors", such as "could not find the material".

export async function successStep(ctx: Context) {
  console.log('step: successStep');

  // Only add logic here if it is performing closure specific to this ending

  await showUI.success(ctx, {
    text: '',
    title: t('success.subtitle'),
  });

  await removeAllHighlights();
}
