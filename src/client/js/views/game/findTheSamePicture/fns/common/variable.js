export const SCHEMA_VERSION = 1;
export const BOARD_SIZE = 16;
export const TRACK_SIZE = 20;
export const START_POSITION = 10;
export const FIRST_USER_ANI_DURATION_MS = 5600;
export const REVEAL_MS = 1000;
export const ACTION_TIMEOUT_MS = 5000;
export const HELLO_RETRY_MS = 900;
export const HELLO_RETRY_MAX = 4;
export const MAX_NICKNAME_LENGTH = 20;

export const ALPHABET = Object.freeze(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
);

export const STORAGE_KEYS = Object.freeze({
  clientId: 'findTheSamePicture.clientId.v1',
  state: 'findTheSamePicture.state.v1',
  recordedGameId: 'findTheSamePicture.recordedGameId.v1',
});
