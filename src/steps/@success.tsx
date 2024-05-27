import type {Context} from '@matterway/sdk';
import {highlightXPath, showSuccessNotice} from '@matterway/sdk';
import {t} from 'i18next';

// You can duplicate this step to represent different endings for this task
// which are not "technical errors", such as "could not find the material".

export async function successStep(ctx: Context, highlights: string[]) {
  console.log('step: successStep');

  // Only add logic here if it is performing closure specific to this ending

  await showSuccessNotice(ctx, {
    title: '',
    description: '',
    text: '',
    subtitle: t('success.subtitle'),
    icon: 'checkmark-circle-outline',
  });

  await Promise.all(
    highlights.map((highlight) => {
      return highlightXPath(ctx, highlight).stop();
    }),
  );
}
