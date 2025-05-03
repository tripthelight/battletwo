import { timeInterval_1, timeInterval_1190 } from '@/client/js/functions/variable';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { errorManagement } from '@/client/js/module/errorManagement';
import drewResultInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drewResultInfo';

export default () => {
  // element | seeeion 체크
  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 ani 중 result 세션이 없습니다' });
  const RESULT_RES = RESULT === 'true' ? true : RESULT === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 result 세션이 true나 false가 아닙니다' });
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  const PLAYER_BLOCK = document.querySelector('.player-block');
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  // const COINS_PLAYER = document.querySelector('.coins-player');

  // 명령
  setTimeout(() => {
    if (RESULT_RES) PLAYER_BLOCK.classList.add('win');
    if (!RESULT_RES) ENEMY_BLOCK.classList.add('win');
    setTimeout(() => {
      LOADING_EVENT.hide();
      drewResultInfo();
      setTimeout(() => {
        if (!RESULT_RES) if (COINS_ENEMY) COINS_ENEMY.remove();
      }, timeInterval_1190);
    }, timeInterval_1);
  }, timeInterval_1);
};
