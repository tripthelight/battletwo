import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import drewElementComn from '@/client/js/views/game/indianPocker/fns/common/drewElementComn';
import resultAnimation from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/resultAnimation';
import {
  getGameOverCoinsPlayer,
  getGameOverResult,
} from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

export default () => {
  const result = getGameOverResult();

  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 결과 데이터가 없습니다',
    });
  }

  const PLAYER_BLOCK = document.querySelector('.player-block');

  if (PLAYER_BLOCK && !result) return resultAnimation();

  if (PLAYER_BLOCK && result) {
    const COINS = PLAYER_BLOCK.querySelectorAll('li');

    if (COINS.length > 0) {
      for (let i = 0; i < COINS.length; i += 1) COINS[i].remove();

      const count = getGameOverCoinsPlayer();
      if (!Number.isInteger(count) || count < 0) {
        return errorManagement({
          errCase: 'sessionStorageLoss',
          message: 'game over 상태에서 player coin 데이터가 없습니다',
        });
      }

      for (let i = 0; i < count; i += 1) {
        PLAYER_BLOCK.appendChild(document.createElement('li'));
      }
    }
  }

  setTimeout(() => {
    if (!PLAYER_BLOCK) {
      drewElementComn('div', 'player-block');

      setTimeout(() => {
        if (result) {
          const PLAYER_BLOCK_EL = document.querySelector('.player-block');
          const count = getGameOverCoinsPlayer();

          if (!PLAYER_BLOCK_EL || !Number.isInteger(count) || count < 0) {
            return errorManagement({
              errCase: 'sessionStorageLoss',
              message: 'game over 상태에서 player coin 데이터가 없습니다',
            });
          }

          for (let i = 0; i < count; i += 1) {
            PLAYER_BLOCK_EL.appendChild(document.createElement('li'));
          }
        }

        setTimeout(resultAnimation, timeInterval_1);
      }, timeInterval_1);
    }
  }, timeInterval_1);
};
