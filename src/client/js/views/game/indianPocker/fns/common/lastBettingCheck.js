import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import deviceStateStore from '@/client/store/deviceStateStore';

export default () => {
  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
  // const BET_USER = window.sessionStorage.betUser;
  const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);

  // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
  const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet ?? 0;

  // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet ?? 0;
  const encryptKey4 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
  const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
  const decryptVal4 = encryptVal4 !== null ? dec(encryptVal4) : 0; // coinsPlayerBet value number

  const PLAYER_COINS_BLOCK = document.querySelector('.coins-player');
  const PLAYER_COINS = PLAYER_COINS_BLOCK.querySelectorAll('li');
  const C_E_B = Number(COINS_ENEMY_BET);
  // const P_E_B = Number(COINS_PLAYER_BET);
  const P_E_B = Number(decryptVal4);

  // const STATE = BET_USER && BET_USER === 'true' && COINS_ENEMY && Number(COINS_ENEMY) === 0 && C_E_B === P_E_B;
  const STATE =
    encryptVal1 === encryptVal_1 && // betUser === true
    encryptVal2 &&
    dec(encryptVal2) === 0 &&
    C_E_B === P_E_B;

  if (!STATE) return false;

  /*
  if (!BET_USER || (BET_USER && BET_USER === 'false')) return;
  if (!COINS_ENEMY || (COINS_ENEMY && Number(COINS_ENEMY) > 0)) return;
  if (C_E_B !== P_E_B) return;
  */

  // 상대방 추가 배팅 할 코인 없음
  PLAYER_COINS.forEach((liEl) => {
    // 내 보유 코인의 drag를 막아야 함
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') {
      liEl.setAttribute('draggable', false);
    }
    // 내 보유 코인의 시간을 멈춰야 함
    liEl.querySelectorAll('span.m, span.h').forEach((spanEl) => {
      spanEl.getAnimations().forEach((animation) => animation.cancel());
    });
  });

  return true;
};
