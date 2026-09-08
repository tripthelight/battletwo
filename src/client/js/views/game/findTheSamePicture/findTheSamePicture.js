import '@/client/assets/scss/game/findTheSamePicture/common';
import '@/client/js/common/common';
import initNickName from '@/client/js/functions/initNickName';
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import {
  restoreStoredGameOverState,
} from '@/client/js/views/game/findTheSamePicture/fns/common/state';
import {
  markGameHistoryEntry,
  skipRetiredGameHistoryEntry,
} from '@/client/js/module/navigation/gameHistory';
import {
  connectSignaling,
} from '@/client/js/module/webRTC/connectSignaling';
import {
  deliverToGame,
  handleEnvelope,
} from '@/client/js/network/findTheSamePicture/response';
import {
  prepareFindTheSamePicturePage,
  startFindTheSamePictureGame,
} from '@/client/js/views/game/findTheSamePicture/fns/common/lifecycle';

const GAME_NAME = 'findTheSamePicture';

async function startGame() {
  console.log('[findTheSamePicture] Peer READY. Game start.');
  startFindTheSamePictureGame();
}

async function init() {
  await initNickName();
  prepareFindTheSamePicturePage();

  // 완료된 게임에서의 새로고침은 이전 Peer와 다시 매칭하지 않는다.
  // 저장된 gameover state만 로컬에서 복구해 결과 화면을 유지한다.
  if (restoreStoredGameOverState()) {
    findTheSamePictureGameState.gameOver();
    return;
  }

  findTheSamePictureGameState.waitEnemy();

  connectSignaling(
    false,
    {
      deliverToGame,
      handleEnvelope,
      startGame,
      gameName: GAME_NAME,
      requiresStorage: false,
    },
  );
}

markGameHistoryEntry();

window.addEventListener(
  'pageshow',
  async (event) => {
    if (skipRetiredGameHistoryEntry(event)) return;
    await init();
  },
);
