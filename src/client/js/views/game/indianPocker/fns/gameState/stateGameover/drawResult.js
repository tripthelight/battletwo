import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import resultAnimation from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/resultAnimation';
import drawResultEnemyBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResultEnemyBlock';
import {
  getGameOverCoinsPlayer,
  getGameOverResult,
} from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

export default () => {
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) {
    return errorManagement({
      errCase: 'elementLoss',
      message: 'game over 상태에서 #gameScene 엘리먼트가 없습니다',
    });
  }

  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (COINS_ENEMY) COINS_ENEMY.classList.remove('active');
  if (COINS_ENEMY) COINS_ENEMY.classList.add('disabled');

  const COINS_PLAYER = document.querySelector('.coins-player');
  if (COINS_PLAYER) COINS_PLAYER.classList.remove('active');
  if (COINS_PLAYER) COINS_PLAYER.classList.add('disabled');

  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  const BETTING_ZONE = document.querySelector('.betting-zone');
  const PLAYER_BLOCK = document.querySelector('.player-block');

  const result = getGameOverResult();
  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과 데이터가 없습니다',
    });
  }

  if (PLAYER_BLOCK && !result) return resultAnimation();

  if (PLAYER_BLOCK && result) {
    const COINS = PLAYER_BLOCK.querySelectorAll('li');

    if (COINS.length > 0) {
      const coinsPlayer = PLAYER_BLOCK.querySelector('.coins-player');

      if (coinsPlayer) {
        for (let i = 0; i < COINS.length; i += 1) COINS[i].remove();

        const count = getGameOverCoinsPlayer();
        if (!Number.isInteger(count) || count < 0) {
          return errorManagement({
            errCase: 'sessionStorageLoss',
            message: 'game over 상태에서 player coin 데이터가 없습니다',
          });
        }

        for (let i = 0; i < count; i += 1) {
          coinsPlayer.appendChild(document.createElement('li'));
        }
      }
    }
  }

  if (ENEMY_BLOCK && BETTING_ZONE && PLAYER_BLOCK) {
    return resultAnimation();
  }

  setTimeout(drawResultEnemyBlock, timeInterval_1);
};
