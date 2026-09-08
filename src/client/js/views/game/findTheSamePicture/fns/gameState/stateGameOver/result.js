import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { STORAGE_KEYS } from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import { safeJsonParse } from '@/client/js/views/game/findTheSamePicture/fns/common/utils';
import { clearGameState } from '@/client/js/views/game/findTheSamePicture/fns/common/state';
import {
  SESSION_END_REASON,
  terminateGameSession,
} from '@/client/js/module/webRTC/connectSignaling';
import {
  updateBoardInteractivity,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/interaction';
import {
  clearTurnTopSheet,
} from '@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/topSheet';

const GAME_PATH = '/game/findTheSamePicture';

function recordGameResult() {
  const state = runtime.state;

  if (!state || state.status !== 'gameover') return;

  if (
    window.sessionStorage.getItem(STORAGE_KEYS.recordedGameId) ===
    state.gameId
  ) {
    return;
  }

  const win = state.winner === runtime.clientId;
  const current = safeJsonParse(
    window.localStorage.getItem('gameResults'),
    {},
  ) || {};
  const previous = current.findsamepicture || {
    win: 0,
    lose: 0,
  };

  current.findsamepicture = {
    win: Number(previous.win || 0) + (win ? 1 : 0),
    lose: Number(previous.lose || 0) + (win ? 0 : 1),
  };

  window.localStorage.setItem(
    'gameResults',
    JSON.stringify(current),
  );
  window.sessionStorage.setItem(
    STORAGE_KEYS.recordedGameId,
    state.gameId,
  );
}

export function showResult() {
  const state = runtime.state;
  const { result, resultTitle } = runtime.elements;

  if (
    !state ||
    state.status !== 'gameover' ||
    !result ||
    !resultTitle
  ) {
    return;
  }

  runtime.uiLocked = true;
  clearTurnTopSheet();
  updateBoardInteractivity();
  resultTitle.textContent =
    state.winner === runtime.clientId
      ? 'WIN'
      : 'LOSE';
  result.hidden = false;
  recordGameResult();
}

export function leaveFinishedGame(path) {
  clearTurnTopSheet();
  clearGameState();

  // REPLAY는 이전 게임과 완전히 분리된 새 매칭이다.
  // FSP 전용 clientId를 폐기해 직전 Peer가 보유한 gameover state가
  // 다음 대기 세션의 player pair로 다시 인정되지 않도록 한다.
  if (path === GAME_PATH) {
    window.sessionStorage.removeItem(STORAGE_KEYS.clientId);
  }

  terminateGameSession({
    reason: SESSION_END_REASON.LEAVE,
    notifyPeer: true,
  });

  window.location.replace(path);
}
