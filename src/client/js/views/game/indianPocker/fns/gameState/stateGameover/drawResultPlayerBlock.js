import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import drewElementComn from '@/client/js/views/game/indianPocker/fns/common/drewElementComn';
import resultAnimation from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/resultAnimation';

export default () => {
  // element | seeeion 체크
  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 결과 출력 중 result 세션이 없습니다' });
  const RESULT_RES = RESULT === 'true' ? true : RESULT === 'false' ? false : errorManagement({ errCase: 'sessionStorageLoss', message: 'game over 상태에서 result 세션이 true나 false가 아닙니다' });
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (PLAYER_BLOCK && !RESULT_RES) return resultAnimation();
  if (PLAYER_BLOCK && RESULT_RES) {
    const COINS = PLAYER_BLOCK.querySelectorAll('li');
    if (COINS.length > 0) {
      for (let i = 0; i < COINS.length; i++) COINS[i].remove();

      const encryptKey2_1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
      const encryptVal2_1 = window.sessionStorage.getItem(encryptKey2_1);
      const decryptVal2_1 = dec(encryptVal2_1); // coinsPlayer value number
      // for (let i = 0; i < Number(window.sessionStorage.coinsPlayer); i++) PLAYER_BLOCK.appendChild(document.createElement('li'));
      for (let i = 0; i < Number(decryptVal2_1); i++) PLAYER_BLOCK.appendChild(document.createElement('li'));
    };
  };

  // 명령
  setTimeout(() => {
    if (!PLAYER_BLOCK) {
      drewElementComn('div', 'player-block');
      setTimeout(() => {
        if (RESULT_RES) {
          const PLAYER_BLOCK_EL = document.querySelector('.player-block');

          const encryptKey2_2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
          const encryptVal2_2 = window.sessionStorage.getItem(encryptKey2_2);
          const decryptVal2_2 = dec(encryptVal2_2); // coinsPlayer value number
          // for (let i = 0; i < Number(window.sessionStorage.coinsPlayer); i++) PLAYER_BLOCK_EL.appendChild(document.createElement('li'));
          for (let i = 0; i < Number(decryptVal2_2); i++) PLAYER_BLOCK_EL.appendChild(document.createElement('li'));
        }
        // 다음 함수 실행
        setTimeout(resultAnimation, timeInterval_1);
      }, timeInterval_1);
    }
  }, timeInterval_1);
};
