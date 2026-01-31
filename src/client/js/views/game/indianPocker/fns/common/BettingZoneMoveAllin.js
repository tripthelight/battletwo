import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import roundEndBetMoveEnd from '@/client/js/views/game/indianPocker/fns/common/roundEndBetMoveEnd.js';
import roundEndBetEnemyMoveXY from '@/client/js/views/game/indianPocker/fns/common/roundEndBetEnemyMoveXY.js';

export default (_removeCoins) => {
  return new Promise((resolve, reject) => {
    if (_removeCoins.rc < 1) return resolve(_removeCoins);

    const BET_COIN_KEY = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const BET_COIN = storageMethod("s", "GET_ITEM", BET_COIN_KEY);
    const BET_COIN_ARR = JSON.parse(BET_COIN);

    // const BET_COIN = window.sessionStorage.betCoin;
    // const BET_COIN_ARR = JSON.parse(BET_COIN);
    const BET_COINS = document.querySelector('.bet-coins');
    const BET_COINS_LI = BET_COINS.querySelectorAll('li');
    if (BET_COIN_ARR.length !== BET_COINS_LI.length) {
      console.log('error - BettingZoneMoveAllin.js - BET_COIN_ARR.length !== BET_COINS_LI.length');
      return errorManagement({ errCase: 'errorComn' });
    }
    let aniTime = Number(1000 / _removeCoins.rc);
    let enemyX = 0;
    let enemyY = 0;
    let cw = 0;
    let ch = 0;
    let ty = 0;
    for (let i = 0, p = Promise.resolve(); i < _removeCoins.rc; i++) {
      p = p
        .then(() => {
          return roundEndBetMoveEnd(Number(aniTime));
        })
        .then(() => {
          const BET_COINS_LOOP = document.querySelector('.bet-coins');
          const BET_COINS_LOOP_LI = BET_COINS_LOOP.querySelectorAll('li');
          const MOVE_EL = BET_COINS_LOOP_LI[BET_COINS_LOOP_LI.length - 1];
          cw = MOVE_EL.clientWidth;
          ty = BET_COIN_ARR[BET_COIN_ARR.length - 1].translateY;
          ch = MOVE_EL.clientHeight;
          enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').x;
          enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').y;
          MOVE_EL.style.transition = 'transform ' + Number(aniTime / 1000) + 's ease-in';
          MOVE_EL.style.transform = 'translate(' + enemyX + 'px, ' + enemyY + 'px)';
          return {
            el: MOVE_EL,
            state: document.querySelector('.coins-player'),
          };
        })
        .then((_data) => {
          setTimeout(() => {
            if (_data.state) {
              _data.state.appendChild(document.createElement('li'));
            }
            _data.el.remove();
            // betCoin, betCoinPos 세션을 뒤에서 부터 하나씩 삭제
            let arr = [];
            let arrPos = [];
            // if (window.sessionStorage.betCoin) arr = JSON.parse(window.sessionStorage.betCoin);
            const BET_COIN_OBJ = storageMethod("s", "GET_ITEM", BET_COIN_KEY); // betCoin value
            if (BET_COIN_OBJ !== null && BET_COIN_OBJ !== "" && JSON.parse(BET_COIN_OBJ).length > 0) arr = JSON.parse(BET_COIN_OBJ);
            if (window.sessionStorage.betCoinPos) arrPos = JSON.parse(window.sessionStorage.betCoinPos);
            arr.pop();
            arrPos.pop();
            // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(arr));
            storageMethod('s', 'SET_ITEM', BET_COIN_KEY, JSON.stringify(arr)); // betCoin
            storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(arrPos));
            if (i === _removeCoins.rc - 1) return resolve(_removeCoins);
          }, Number(aniTime));
        });
    }
  });
};
