import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import { request } from '@/client/js/network/findTheSamePicture/request';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import {
  HELLO_RETRY_MAX,
  HELLO_RETRY_MS,
  MAX_NICKNAME_LENGTH,
} from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import { getLocalNickname } from '@/client/js/views/game/findTheSamePicture/fns/common/utils';
import {
  chooseState,
  createInitialState,
  getPairIds,
  loadStoredState,
  saveState,
  stateMatchesCurrentPair,
} from '@/client/js/views/game/findTheSamePicture/fns/common/state';
import { clearAllReveals } from '@/client/js/views/game/findTheSamePicture/fns/board/board';
import { clearPendingAction, processAction, applyActionResult } from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/action';

function enterCurrentGameState({ showIntro = true } = {}) {
  const state = runtime.state;

  if (!state) return;

  if (state.status === 'gameover') {
    findTheSamePictureGameState.gameOver();
    return;
  }

  if (Date.now() < state.readyAt) {
    findTheSamePictureGameState.ready({ showIntro });
    return;
  }

  findTheSamePictureGameState.playing();
}

export function sendCurrentState() {
  if (!runtime.state || !runtime.peerId) return;

  request('FSP/STATE', {
    state: runtime.state,
  });
}

function handleStatePayload(state) {
  if (!stateMatchesCurrentPair(state)) return;

  const current = runtime.state;

  if (
    current &&
    current.gameId === state.gameId &&
    state.revision < current.revision
  ) {
    return;
  }

  if (
    current &&
    current.gameId !== state.gameId
  ) {
    return;
  }

  findTheSamePictureGameState.waitEnemyEnd();
  saveState(state);
  clearPendingAction();
  clearAllReveals();

  if (runtime.revealTimerId) {
    clearTimeout(runtime.revealTimerId);
    runtime.revealTimerId = null;
  }

  enterCurrentGameState({
    showIntro: state.revision === 0,
  });
}

function handleHello(payload) {
  if (
    !payload ||
    typeof payload.clientId !== 'string' ||
    payload.clientId === runtime.clientId
  ) {
    return;
  }

  const peerNickname =
    typeof payload.nickname === 'string'
      ? payload.nickname
          .trim()
          .slice(0, MAX_NICKNAME_LENGTH)
      : '';

  if (!peerNickname) return;

  runtime.peerId = payload.clientId;
  runtime.peerNickname = peerNickname;
  runtime.coordinatorId = getPairIds()[0];

  if (runtime.helloRetryId) {
    clearTimeout(runtime.helloRetryId);
    runtime.helloRetryId = null;
  }

  if (!payload.reply) {
    sendHello(true);
  }

  const selectedState = chooseState(
    loadStoredState(),
    payload.state,
  );

  if (selectedState) {
    findTheSamePictureGameState.waitEnemyEnd();
    saveState(selectedState);
    enterCurrentGameState({
      showIntro: selectedState.revision === 0,
    });

    if (runtime.coordinatorId === runtime.clientId) {
      sendCurrentState();
    }

    return;
  }

  if (runtime.coordinatorId === runtime.clientId) {
    const initialState = createInitialState();
    findTheSamePictureGameState.waitEnemyEnd();
    saveState(initialState);
    findTheSamePictureGameState.ready({ showIntro: true });
    sendCurrentState();
    return;
  }

}

export function sendHello(reply = false) {
  if (!runtime.clientId) return;

  request('FSP/HELLO', {
    clientId: runtime.clientId,
    nickname: getLocalNickname(),
    reply,
    state: loadStoredState(),
  });
}

export function scheduleHelloRetry() {
  if (
    runtime.peerId ||
    runtime.helloRetryCount >= HELLO_RETRY_MAX
  ) {
    return;
  }

  if (runtime.helloRetryId) {
    clearTimeout(runtime.helloRetryId);
  }

  runtime.helloRetryId = setTimeout(() => {
    runtime.helloRetryId = null;

    if (runtime.peerId) return;

    runtime.helloRetryCount += 1;
    sendHello(false);
    scheduleHelloRetry();
  }, HELLO_RETRY_MS);
}

export function handleFindTheSamePicturePeerReady() {
  if (!runtime.started) return;
  sendHello(false);
}

export function handleFindTheSamePicturePayload(payload) {
  switch (payload.type) {
    case 'FSP/HELLO':
      handleHello(payload);
      break;

    case 'FSP/STATE':
      handleStatePayload(payload.state);
      break;

    case 'FSP/STATE_REQUEST':
      sendCurrentState();
      break;

    case 'FSP/ACTION':
      processAction(payload);
      break;

    case 'FSP/ACTION_RESULT':
      applyActionResult(payload);
      break;

    default:
      console.warn(
        '[findTheSamePicture] Unknown game payload:',
        payload,
      );
      break;
  }
}
