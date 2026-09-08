import gameStateWaitEnemy, {
  endGameStateWaitEnemy,
} from '@/client/js/gameState/findTheSamePicture/gameStateWaitEnemy';
import gameStateReady from '@/client/js/gameState/findTheSamePicture/gameStateReady';
import gameStateFirstUserAni from '@/client/js/gameState/findTheSamePicture/gameStateFirstUserAni';
import gameStatePlaying from '@/client/js/gameState/findTheSamePicture/gameStatePlaying';
import gameStateGameOver from '@/client/js/gameState/findTheSamePicture/gameStateGameOver';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { markGameSessionCompleted } from '@/client/js/module/webRTC/connectSignaling';

export default {
  waitEnemy: () => {
    gameStateWaitEnemy();
  },

  waitEnemyEnd: () => {
    endGameStateWaitEnemy();
  },

  ready: (options = {}) => {
    gameStateReady(options);
  },

  firstUserAni: (options = {}) => {
    gameStateFirstUserAni(options);
  },

  playing: (options = {}) => {
    gameStatePlaying(options);
  },

  gameOver: (options = {}) => {
    const gameId = runtime.state?.gameId;

    if (
      gameId &&
      runtime.resultMarkedGameId !== gameId
    ) {
      runtime.resultMarkedGameId = gameId;
      markGameSessionCompleted();
    }

    gameStateGameOver(options);
  },
};
