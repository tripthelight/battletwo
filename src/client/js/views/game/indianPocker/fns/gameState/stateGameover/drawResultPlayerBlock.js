import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import drewElementComn from '@/client/js/views/game/indianPocker/fns/common/drewElementComn';
import resultAnimation from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/resultAnimation';

export default () => {
  // element | seeeion 체크
  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 결과 출력 중 result 세션이 없습니다' });
  const RESULT_RES = RESULT === 'true' ? true : RESULT === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 result 세션이 true나 false가 아닙니다' });
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (PLAYER_BLOCK && !RESULT_RES) return resultAnimation();
  if (PLAYER_BLOCK && RESULT_RES) {
    const COINS = PLAYER_BLOCK.querySelectorAll('li');
    if (COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) COINS[i].remove();
      for (let i = 0; i < Number(window.sessionStorage.coinsPlayer); i++) PLAYER_BLOCK.appendChild(document.createElement('li'));
    }
  }

  // 명령
  setTimeout(() => {
    if (!PLAYER_BLOCK) {
      drewElementComn('div', 'player-block');
      setTimeout(() => {
        if (RESULT_RES) {
          const PLAYER_BLOCK_EL = document.querySelector('.player-block');
          for (let i = 0; i < Number(window.sessionStorage.coinsPlayer); i++) PLAYER_BLOCK_EL.appendChild(document.createElement('li'));
        }
        // 다음 함수 실행
        setTimeout(resultAnimation, timeInterval_1);
      }, timeInterval_1);
    }
  }, timeInterval_1);
};
