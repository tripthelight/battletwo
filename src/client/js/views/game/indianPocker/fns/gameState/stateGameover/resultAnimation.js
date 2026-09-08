import { timeInterval_1, timeInterval_1190 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import drewResultInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drewResultInfo';
import { getGameOverResult } from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';

export default () => {
  const result = getGameOverResult();

  if (typeof result !== 'boolean') {
    return errorManagement({
      errCase: 'sessionStorageLoss',
      message: 'game over 상태에서 animation 결과 데이터가 없습니다',
    });
  }

  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  const PLAYER_BLOCK = document.querySelector('.player-block');
  const COINS_ENEMY = document.querySelector('.coins-enemy');

  setTimeout(() => {
    if (result && PLAYER_BLOCK) PLAYER_BLOCK.classList.add('win');
    if (!result && ENEMY_BLOCK) ENEMY_BLOCK.classList.add('win');

    setTimeout(() => {
      LOADING_EVENT.hide();
      drewResultInfo();

      setTimeout(() => {
        if (!result && COINS_ENEMY) COINS_ENEMY.remove();
      }, timeInterval_1190);
    }, timeInterval_1);
  }, timeInterval_1);
};
