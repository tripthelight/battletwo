import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { getStyle } from '@/client/js/functions/comnExport';
import { timeInterval_1, timeInterval_1001 } from '@/client/js/functions/variable';

export default () => {
  return new Promise((resolve, reject) => {
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'fold 버튼 페널티 받을 시 .betting-zone 엘리먼트가 없습니다' });
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'fold 버튼 페널티 받을 시 coinsPlayer 세션이 없습니다' });

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'fold 버튼 페널티 받을 시 coinsEnemy 세션이 없습니다' });
    // if (Number(COINS_ENEMY) === 0) return resolve('nextRound'); // 다음 함수 실행
    const encryptKey1_1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal1_1 = window.sessionStorage.getItem(encryptKey1_1);
    if (encryptVal1_1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'fold 버튼 페널티 받을 시 coinsEnemy 세션이 없습니다' });
    const decryptVal1_1 = dec(encryptVal1_1); // coinsEnemy value number
    if (decryptVal1_1 === 0) return resolve('nextRound'); // 다음 함수 실행




    const COINS_ENEMY_EL = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_EL) return errorManagement({ errCase: 'elementLoss', message: 'fold 버튼 페널티 받을 시 .coins-enemy 엘리먼트가 없습니다' });
    const ENEMY_COINS = COINS_ENEMY_EL.querySelectorAll('li');
    if (ENEMY_COINS.length === 0) return resolve('nextRound'); // 다음 함수 실행

    const COINS_PLAYER_EL = document.querySelector('.coins-player');
    if (!COINS_PLAYER_EL) return errorManagement({ errCase: 'elementLoss', message: 'fold 버튼 페널티 받을 시 .coins-player 엘리먼트가 없습니다' });
    const PLAYER_COINS = COINS_PLAYER_EL.querySelectorAll('li');
    const LAST_PLAYER_EL = PLAYER_COINS.length > 0 ? PLAYER_COINS[PLAYER_COINS.length - 1] : 0;

    // const PENALTY_COINS = Number(COINS_ENEMY) >= 10 ? 10 : Number(COINS_ENEMY);
    const PENALTY_COINS = decryptVal1_1 >= 10 ? 10 : decryptVal1_1;
    const EPL = getStyle(COINS_ENEMY_EL, 'padding-left');
    const PPL = getStyle(COINS_PLAYER_EL, 'padding-left');
    const PPR = getStyle(COINS_PLAYER_EL, 'padding-right');
    const PPT = getStyle(COINS_PLAYER_EL, 'padding-top');
    const BZBTW = getStyle(BETTING_ZONE, 'border-top-width');
    const BZBBW = getStyle(BETTING_ZONE, 'border-bottom-width');
    let basicTop = Number(BETTING_ZONE.clientHeight);
    let cw = ENEMY_COINS[0] ? ENEMY_COINS[0].getBoundingClientRect().width : PLAYER_COINS[0] ? PLAYER_COINS[0].getBoundingClientRect().width : 0;
    let ch = ENEMY_COINS[0] ? ENEMY_COINS[0].getBoundingClientRect().height : PLAYER_COINS[0] ? PLAYER_COINS[0].getBoundingClientRect().height : 0;
    let lastOsLeft = LAST_PLAYER_EL === 0 ? 0 : LAST_PLAYER_EL.offsetLeft;
    let lastOsTop = LAST_PLAYER_EL === 0 ? 0 : LAST_PLAYER_EL.offsetTop;
    let enemyIdx = ENEMY_COINS.length - 1;
    let lIdx = 1;
    let yIdx = 0;
    let moves = [];
    let x = 0;
    let y = 0;
    const IW = Math.floor((COINS_PLAYER_EL.clientWidth - Number(PPL + PPR)) / cw) * cw;
    if (lastOsLeft - PPL + cw >= IW) {
      lastOsLeft = PPL;
      lIdx = 0;
      yIdx = 1;
    }
    for (let i = 0; i < Number(PENALTY_COINS); i++) {
      x = Number(0 - ENEMY_COINS[enemyIdx].offsetLeft) + lastOsLeft + Number(cw * lIdx);
      y = Number(0 - ENEMY_COINS[enemyIdx].offsetTop) + Number(ch * yIdx) + COINS_ENEMY_EL.clientHeight + basicTop + BZBTW + BZBBW + lastOsTop;
      moves.push({
        x: x,
        y: y,
      });
      enemyIdx = enemyIdx - 1;
      if (lastOsLeft + cw + cw * lIdx >= IW) {
        lastOsLeft = PPL;
        lIdx = 0;
        yIdx = yIdx + 1;
      } else {
        lIdx = lIdx + 1;
      }
    }
    let mIdx = 0;
    for (let i = ENEMY_COINS.length; i > ENEMY_COINS.length - Number(PENALTY_COINS); i--) {
      let resIdx = i - 1;
      ENEMY_COINS[resIdx].style.transition = 'transform 1s ease-in';
      ENEMY_COINS[resIdx].style.transform = 'translate(' + moves[mIdx].x + 'px, ' + moves[mIdx].y + 'px)';
      mIdx = mIdx + 1;
    }

    setTimeout(() => {
      const encryptKey1_2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptVal1_2 = window.sessionStorage.getItem(encryptKey1_2);
      const decryptVal1_2 = dec(encryptVal1_2); // coinsEnemy value number

      const P_RESULT = Number(window.sessionStorage.coinsPlayer) + Number(PENALTY_COINS);

      // const E_RESULT = Number(window.sessionStorage.coinsEnemy) - Number(PENALTY_COINS);
      const E_RESULT = decryptVal1_2 - Number(PENALTY_COINS);

      storageMethod('s', 'SET_ITEM', 'coinsPlayer', P_RESULT);

      // storageMethod('s', 'SET_ITEM', 'coinsEnemy', E_RESULT);
      storageMethod('s', 'SET_ITEM', encryptKey1_2, enc(E_RESULT));

      setTimeout(resolve, timeInterval_1);
    }, timeInterval_1001);
  });
};
