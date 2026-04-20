import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import basicBetMainCheck from '@/client/js/views/game/indianPocker/fns/common/basicBetMainCheck';

export const ROUND_RESULT_STEP = {
  BASIC_BET: 'basicBet',
  DREW: 'drew',
  GAME_OVER: 'gameOver',
};

const ROUND_RESULT_RELOAD_FALLBACK_MS = 5000;
let pendingReload = null;

const KEYS = {
  gameState: () => findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]),
  basicBet: () => findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]),
  gameOver: () => findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]),
  playingReloadUser: () => findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]),
  drewState: () => findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]),
  drewReady: () => findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]),
};

function readBool(key) {
  const value = storageMethod('s', 'GET_ITEM', key);
  return value !== null && value !== '' && X.dec(value);
}

function isValidStep(step) {
  return step === ROUND_RESULT_STEP.BASIC_BET ||
    step === ROUND_RESULT_STEP.DREW ||
    step === ROUND_RESULT_STEP.GAME_OVER;
}

function isReloadWaiting() {
  return Boolean(pendingReload && !pendingReload.done) || readBool(KEYS.playingReloadUser());
}

function isStepReady(step) {
  if (step === ROUND_RESULT_STEP.BASIC_BET) {
    return storageMethod('s', 'GET_ITEM', KEYS.gameState()) === KEYS.basicBet();
  }

  if (step === ROUND_RESULT_STEP.DREW) {
    return readBool(KEYS.drewReady());
  }

  if (step === ROUND_RESULT_STEP.GAME_OVER) {
    return storageMethod('s', 'GET_ITEM', KEYS.gameState()) === KEYS.gameOver();
  }

  return false;
}

export function getRoundResultNextStep() {
  if (readBool(KEYS.drewState())) return ROUND_RESULT_STEP.DREW;
  if (basicBetMainCheck()) return ROUND_RESULT_STEP.GAME_OVER;
  return ROUND_RESULT_STEP.BASIC_BET;
}

function enterPending(reason) {
  if (!pendingReload || pendingReload.done) return;

  const pending = pendingReload;
  if (pending.timer) clearTimeout(pending.timer);

  pendingReload = {
    ...pending,
    done: true,
    timer: null,
  };

  storageMethod('s', 'EMPTY_VALUE', KEYS.playingReloadUser());
  LOADING_EVENT.show();
  pending.enterNextStep({
    step: pending.step,
    reloadState: pending.reloadState,
    reason,
  });
}

export function beginRoundResultReloadWait({ reloadState = '', enterNextStep }) {
  if (typeof enterNextStep !== 'function') return;

  const step = getRoundResultNextStep();
  pendingReload = {
    step,
    reloadState,
    enterNextStep,
    done: false,
    timer: null,
  };

  LOADING_EVENT.show();
  request('requestRoundResultReloadSync', {
    step,
    reloadState,
  });

  pendingReload.timer = setTimeout(() => {
    if (!pendingReload || pendingReload.done) return;
    if (pendingReload.step !== getRoundResultNextStep()) return;

    enterPending('localFallback');
  }, ROUND_RESULT_RELOAD_FALLBACK_MS);
}

export function announceRoundResultStepReady(step = getRoundResultNextStep()) {
  if (!isValidStep(step)) return;

  request('roundResultStepReady', {
    step,
  });
}

export function handleRoundResultReloadRequest(message) {
  const remoteStep = message?.step;
  const localStep = getRoundResultNextStep();
  const waiting = isReloadWaiting();
  const accepted = isValidStep(remoteStep) && localStep === remoteStep && (waiting || isStepReady(localStep));

  request('responseRoundResultReloadSync', {
    step: localStep,
    accepted,
  });

  if (accepted && waiting) {
    enterPending('doubleReload');
  }
}

export function handleRoundResultReloadResponse(message) {
  if (!pendingReload || pendingReload.done) return;

  const remoteStep = message?.step;
  if (message?.accepted && remoteStep === pendingReload.step) {
    enterPending('doubleReloadResponse');
  }
}

export function handleRoundResultStepReady(message) {
  if (!pendingReload || pendingReload.done) return false;

  const remoteStep = message?.step;
  if (remoteStep === pendingReload.step) {
    request('roundResultStepAck', {
      step: pendingReload.step,
    });
    enterPending('remoteStepReady');
    return true;
  } else {
    console.warn('round result reload step mismatch', {
      local: pendingReload.step,
      remote: remoteStep,
    });
  }

  return false;
}

export function handleRoundResultStepAck() {}
