import CARD_IMAGES from '@/client/js/views/game/findTheSamePicture/fns/common/cardAssets';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import {
  ALPHABET,
  BOARD_SIZE,
  MAX_NICKNAME_LENGTH,
  SCHEMA_VERSION,
  START_POSITION,
  STORAGE_KEYS,
  TRACK_SIZE,
  FIRST_USER_ANI_DURATION_MS,
} from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import {
  createId,
  getLocalNickname,
  randomInt,
  safeJsonParse,
  shuffleCopy,
} from '@/client/js/views/game/findTheSamePicture/fns/common/utils';

export function createTrack(boardImages) {
  const track = shuffleCopy(boardImages);

  while (track.length < TRACK_SIZE) {
    track.push(boardImages[randomInt(boardImages.length)]);
  }

  return track;
}

export function getPairIds() {
  if (!runtime.clientId || !runtime.peerId) {
    return [];
  }

  return [runtime.clientId, runtime.peerId].sort();
}

export function stateMatchesCurrentPair(state) {
  if (
    !state ||
    state.schema !== SCHEMA_VERSION ||
    typeof state.gameId !== 'string' ||
    !state.players ||
    typeof state.players !== 'object' ||
    !runtime.clientId ||
    !runtime.peerId
  ) {
    return false;
  }

  const pair = getPairIds();
  const statePair = Object.keys(state.players).sort();

  if (
    pair.length !== 2 ||
    statePair.length !== 2 ||
    pair[0] !== statePair[0] ||
    pair[1] !== statePair[1]
  ) {
    return false;
  }

  if (
    !Array.isArray(state.board) ||
    state.board.length !== BOARD_SIZE ||
    new Set(state.board).size !== BOARD_SIZE ||
    !Array.isArray(state.letters) ||
    state.letters.length !== BOARD_SIZE ||
    new Set(state.letters).size !== BOARD_SIZE ||
    !Number.isInteger(state.revision) ||
    state.revision < 0 ||
    !Number.isFinite(state.createdAt) ||
    !Number.isFinite(state.updatedAt) ||
    !Number.isFinite(state.readyAt) ||
    state.updatedAt < state.createdAt ||
    (state.status !== 'playing' && state.status !== 'gameover') ||
    !pair.includes(state.turn) ||
    state.coordinatorId !== pair[0] ||
    (state.status === 'gameover' && !pair.includes(state.winner)) ||
    (state.status === 'playing' && state.winner !== null) ||
    (state.lastActionId !== null &&
      typeof state.lastActionId !== 'string') ||
    state.board.some(
      (imageIndex) =>
        !Number.isInteger(imageIndex) ||
        imageIndex < 0 ||
        imageIndex >= CARD_IMAGES.length,
    ) ||
    state.letters.some(
      (letter) =>
        typeof letter !== 'string' ||
        letter.length !== 1 ||
        !ALPHABET.includes(letter),
    )
  ) {
    return false;
  }

  const boardImageSet = new Set(state.board);
  const playersValid = pair.every((playerId) => {
    const player = state.players[playerId];

    return (
      player &&
      typeof player.nickname === 'string' &&
      player.nickname.length > 0 &&
      player.nickname.length <= MAX_NICKNAME_LENGTH &&
      Array.isArray(player.track) &&
      player.track.length === TRACK_SIZE &&
      player.track.every(
        (imageIndex) =>
          Number.isInteger(imageIndex) &&
          boardImageSet.has(imageIndex),
      ) &&
      Number.isInteger(player.position) &&
      player.position >= 0 &&
      player.position <= TRACK_SIZE
    );
  });

  if (!playersValid) {
    return false;
  }

  if (state.status === 'playing') {
    return pair.every((playerId) => {
      const position = state.players[playerId].position;
      return position > 0 && position < TRACK_SIZE;
    });
  }

  return pair.some((playerId) => {
    const position = state.players[playerId].position;
    return position === 0 || position === TRACK_SIZE;
  });
}

export function loadStoredState() {
  return safeJsonParse(
    window.sessionStorage.getItem(STORAGE_KEYS.state),
  );
}

export function saveState(state) {
  runtime.state = state;
  window.sessionStorage.setItem(
    STORAGE_KEYS.state,
    JSON.stringify(state),
  );
}

export function clearGameState() {
  window.sessionStorage.removeItem(STORAGE_KEYS.state);
  window.sessionStorage.removeItem(STORAGE_KEYS.recordedGameId);
}

/**
 * 완료된 게임에서 브라우저 새로고침이 발생한 경우에는
 * 새 매칭에 참가하지 않고 저장된 결과 화면만 로컬에서 복구한다.
 *
 * playing state는 기존 WebRTC 재연결 경로가 담당하므로 여기서는
 * gameover state만 복구 대상으로 인정한다.
 */
export function restoreStoredGameOverState() {
  const state = loadStoredState();

  if (!state || state.status !== 'gameover') {
    return false;
  }

  if (
    !runtime.clientId ||
    !state.players ||
    typeof state.players !== 'object'
  ) {
    clearGameState();
    return false;
  }

  const playerIds = Object.keys(state.players);

  if (
    playerIds.length !== 2 ||
    !playerIds.includes(runtime.clientId)
  ) {
    clearGameState();
    return false;
  }

  const peerId = playerIds.find(
    (playerId) => playerId !== runtime.clientId,
  );

  if (!peerId) {
    clearGameState();
    return false;
  }

  const previousPeerId = runtime.peerId;
  const previousPeerNickname = runtime.peerNickname;
  const previousCoordinatorId = runtime.coordinatorId;

  runtime.peerId = peerId;
  runtime.peerNickname = state.players[peerId]?.nickname || 'OPPONENT';
  runtime.coordinatorId = [runtime.clientId, peerId].sort()[0];

  if (!stateMatchesCurrentPair(state)) {
    runtime.peerId = previousPeerId;
    runtime.peerNickname = previousPeerNickname;
    runtime.coordinatorId = previousCoordinatorId;
    clearGameState();
    return false;
  }

  runtime.state = state;
  return true;
}

export function createInitialState() {
  const pair = getPairIds();
  const coordinatorId = pair[0];
  const boardImages = shuffleCopy(
    Array.from(
      { length: CARD_IMAGES.length },
      (_, index) => index,
    ),
  ).slice(0, BOARD_SIZE);
  const board = shuffleCopy(boardImages);
  const letters = shuffleCopy(ALPHABET).slice(0, BOARD_SIZE);
  const now = Date.now();

  return {
    schema: SCHEMA_VERSION,
    gameId: createId(),
    coordinatorId,
    revision: 0,
    createdAt: now,
    updatedAt: now,
    readyAt: now + FIRST_USER_ANI_DURATION_MS,
    status: 'playing',
    winner: null,
    turn: pair[randomInt(pair.length)],
    board,
    letters,
    players: {
      [runtime.clientId]: {
        nickname: getLocalNickname(),
        track: createTrack(boardImages),
        position: START_POSITION,
      },
      [runtime.peerId]: {
        nickname: runtime.peerNickname,
        track: createTrack(boardImages),
        position: START_POSITION,
      },
    },
    lastActionId: null,
  };
}

export function chooseState(localState, remoteState) {
  const localValid = stateMatchesCurrentPair(localState);
  const remoteValid = stateMatchesCurrentPair(remoteState);

  if (localValid && !remoteValid) {
    return localState;
  }

  if (!localValid && remoteValid) {
    return remoteState;
  }

  if (!localValid && !remoteValid) {
    return null;
  }

  if (localState.gameId === remoteState.gameId) {
    if (remoteState.revision > localState.revision) {
      return remoteState;
    }

    if (localState.revision > remoteState.revision) {
      return localState;
    }

    if (remoteState.updatedAt > localState.updatedAt) {
      return remoteState;
    }

    return localState;
  }

  if (runtime.coordinatorId === runtime.clientId) {
    return localState;
  }

  return remoteState;
}
