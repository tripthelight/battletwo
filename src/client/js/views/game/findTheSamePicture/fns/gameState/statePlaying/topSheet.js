import { topSheet } from '@/client/components/popup/topSheet/topSheet';
import { text } from '@/client/js/functions/language';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';

const GUIDE_DURATION_MS = 5000;

export function clearTurnTopSheet() {
  topSheet.hide(true);
}

export function showTurnTopSheet() {
  const state = runtime.state;

  if (
    !state ||
    state.status !== 'playing' ||
    runtime.uiLocked
  ) {
    return;
  }

  const message =
    state.turn === runtime.clientId
      ? text.findsamepicture.touch
      : text.findsamepicture.wait;

  topSheet.show(
    message,
    GUIDE_DURATION_MS,
  );
}
