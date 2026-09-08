import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import { request } from '@/client/js/network/findTheSamePicture/request';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import {
  ACTION_TIMEOUT_MS,
  BOARD_SIZE,
  REVEAL_MS,
  TRACK_SIZE,
} from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import {
  createId,
  randomInt,
} from '@/client/js/views/game/findTheSamePicture/fns/common/utils';
import {
  getPairIds,
  saveState,
  stateMatchesCurrentPair,
} from '@/client/js/views/game/findTheSamePicture/fns/common/state';
import {
  endReveal,
  startReveal,
} from '@/client/js/views/game/findTheSamePicture/fns/board/board';
import {
  animateWrongTrackShift,
  renderTracks,
} from '@/client/js/views/game/findTheSamePicture/fns/track/track';
import {
  canLocalPlayerAct,
  showFailEffect,
  updateBoardInteractivity,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/interaction';
import {
  clearTurnTopSheet,
  showTurnTopSheet,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/topSheet';

function sendCurrentState() {
  if (!runtime.state || !runtime.peerId) return;

  request('FSP/STATE', {
    state: runtime.state,
  });
}

export function clearPendingAction() {
  runtime.pendingActionId = null;
  runtime.actionStartedAt = 0;

  if (runtime.actionTimeoutId) {
    clearTimeout(runtime.actionTimeoutId);
    runtime.actionTimeoutId = null;
  }
}

function scheduleActionTimeout(actionId, boardIndex) {
  if (runtime.actionTimeoutId) {
    clearTimeout(runtime.actionTimeoutId);
  }

  runtime.actionTimeoutId = setTimeout(() => {
    runtime.actionTimeoutId = null;

    if (runtime.pendingActionId !== actionId) return;

    endReveal(boardIndex);
    clearPendingAction();
    runtime.uiLocked = false;
    updateBoardInteractivity();
    showTurnTopSheet();

    request('FSP/STATE_REQUEST', {
      requesterId: runtime.clientId,
    });
  }, ACTION_TIMEOUT_MS);
}

function createNextStateForAction(action) {
  const current = runtime.state;
  const actor = current.players[action.actorId];
  const opponentId = getPairIds().find(
    (playerId) => playerId !== action.actorId,
  );
  const targetImage = actor.track[actor.position - 1];
  const revealedImage = current.board[action.boardIndex];
  const correct = targetImage === revealedImage;
  const nextTrack = actor.track.slice();
  let nextPosition = actor.position;
  let winner = null;
  let turn = action.actorId;

  if (correct) {
    nextPosition -= 1;

    if (nextPosition === 0) {
      winner = action.actorId;
    }
  } else {
    for (let i = TRACK_SIZE - 1; i >= 2; i -= 1) {
      nextTrack[i] = nextTrack[i - 1];
    }

    nextTrack[1] = current.board[randomInt(current.board.length)];
    nextPosition += 1;
    turn = opponentId;

    if (nextPosition > TRACK_SIZE - 1) {
      winner = opponentId;
    }
  }

  const now = Date.now();
  const nextState = {
    ...current,
    revision: current.revision + 1,
    updatedAt: now,
    status: winner ? 'gameover' : 'playing',
    winner,
    turn,
    players: {
      ...current.players,
      [action.actorId]: {
        ...actor,
        track: nextTrack,
        position: nextPosition,
      },
    },
    lastActionId: action.actionId,
  };

  return {
    correct,
    revealedImage,
    nextState,
  };
}

export function processAction(action) {
  if (runtime.coordinatorId !== runtime.clientId) return;

  if (
    !runtime.state ||
    runtime.state.status !== 'playing' ||
    action.actorId !== runtime.state.turn ||
    !runtime.state.players[action.actorId] ||
    !Number.isInteger(action.boardIndex) ||
    action.boardIndex < 0 ||
    action.boardIndex >= BOARD_SIZE ||
    !Number.isInteger(action.expectedRevision) ||
    action.expectedRevision !== runtime.state.revision ||
    typeof action.actionId !== 'string'
  ) {
    sendCurrentState();
    return;
  }

  const result = createNextStateForAction(action);
  const payload = {
    type: 'FSP/ACTION_RESULT',
    actionId: action.actionId,
    actorId: action.actorId,
    boardIndex: action.boardIndex,
    revealedImage: result.revealedImage,
    correct: result.correct,
    state: result.nextState,
  };

  request('FSP/ACTION_RESULT', {
    actionId: payload.actionId,
    actorId: payload.actorId,
    boardIndex: payload.boardIndex,
    revealedImage: payload.revealedImage,
    correct: payload.correct,
    state: payload.state,
  });

  applyActionResult(payload);
}

export function handleBoardClick(event) {
  const button = event.target.closest('.btn');

  if (!button || !canLocalPlayerAct()) return;

  const boardIndex = Number(button.dataset.boardIndex);

  if (
    !Number.isInteger(boardIndex) ||
    boardIndex < 0 ||
    boardIndex >= BOARD_SIZE
  ) {
    return;
  }

  const actionId = `${runtime.clientId}:${createId()}`;
  const action = {
    actionId,
    actorId: runtime.clientId,
    boardIndex,
    expectedRevision: runtime.state.revision,
  };

  clearTurnTopSheet();
  runtime.uiLocked = true;
  runtime.pendingActionId = actionId;
  runtime.actionStartedAt = Date.now();
  startReveal(boardIndex);
  updateBoardInteractivity();
  scheduleActionTimeout(actionId, boardIndex);

  if (runtime.coordinatorId === runtime.clientId) {
    processAction(action);
    return;
  }

  request('FSP/ACTION', action);
}

export function applyActionResult(payload) {
  if (
    !payload ||
    typeof payload.actionId !== 'string' ||
    !runtime.state?.players?.[payload.actorId] ||
    !Number.isInteger(payload.boardIndex) ||
    payload.boardIndex < 0 ||
    payload.boardIndex >= BOARD_SIZE ||
    !Number.isInteger(payload.revealedImage) ||
    typeof payload.correct !== 'boolean' ||
    !stateMatchesCurrentPair(payload.state) ||
    payload.state.lastActionId !== payload.actionId ||
    payload.state.board[payload.boardIndex] !== payload.revealedImage
  ) {
    return;
  }

  const current = runtime.state;

  if (
    current &&
    payload.state.gameId !== current.gameId
  ) {
    return;
  }

  if (
    current &&
    payload.state.revision <= current.revision
  ) {
    return;
  }

  if (
    current &&
    payload.state.revision !== current.revision + 1
  ) {
    request('FSP/STATE_REQUEST', {
      requesterId: runtime.clientId,
    });
    return;
  }

  if (
    current &&
    payload.actorId !== current.turn
  ) {
    return;
  }

  const actor = current.players[payload.actorId];
  const targetImage = actor.track[actor.position - 1];
  const expectedCorrect =
    current.board[payload.boardIndex] === targetImage;

  if (expectedCorrect !== payload.correct) {
    request('FSP/STATE_REQUEST', {
      requesterId: runtime.clientId,
    });
    return;
  }

  const wasLocalPending =
    runtime.pendingActionId === payload.actionId;
  const elapsed = wasLocalPending
    ? Date.now() - runtime.actionStartedAt
    : 0;

  clearTurnTopSheet();
  saveState(payload.state);
  runtime.uiLocked = true;
  startReveal(payload.boardIndex);

  if (
    !payload.correct &&
    payload.actorId === runtime.clientId
  ) {
    showFailEffect();
  }

  clearPendingAction();
  updateBoardInteractivity();

  if (runtime.revealTimerId) {
    clearTimeout(runtime.revealTimerId);
  }

  const delay = Math.max(
    120,
    REVEAL_MS - Math.min(elapsed, REVEAL_MS - 120),
  );

  runtime.revealTimerId = setTimeout(() => {
    runtime.revealTimerId = null;
    endReveal(payload.boardIndex);

    const finishVisualUpdate = (tracksAlreadyRendered = false) => {
      if (!tracksAlreadyRendered) {
        renderTracks();
      }

      if (runtime.state?.status === 'gameover') {
        findTheSamePictureGameState.gameOver();
        return;
      }

      runtime.uiLocked = false;
      updateBoardInteractivity();
      showTurnTopSheet();
    };

    if (!payload.correct) {
      animateWrongTrackShift(
        payload.actorId,
        current,
        payload.state,
      ).then(finishVisualUpdate);
      return;
    }

    finishVisualUpdate(false);
  }, delay);
}
