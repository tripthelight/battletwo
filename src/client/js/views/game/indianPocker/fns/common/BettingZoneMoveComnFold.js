import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import BattingZoneMoveRt from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveRt';
import roundEndBetMoveEnd from '@/client/js/views/game/indianPocker/fns/common/roundEndBetMoveEnd';
import roundEndBetEnemyMoveXY from '@/client/js/views/game/indianPocker/fns/common/roundEndBetEnemyMoveXY';

export default (_state) => {
  return new Promise((resolve, reject) => {
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return errorManagement({ errCase: 'elementLoss', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 .bet-coins 엘리먼트가 없습니다' });

    const K = [
      findCharCode([76, 80, 65, 82, 87, 69, 78, 74, 83, 90]), // translateY
      findCharCode([80, 72, 83, 88, 76, 75, 78, 84, 65, 89]), // betState
    ];

    const BET_COIN_RES_ARR = BattingZoneMoveRt(); // return sessionStorage betCoin
    let cw = 0;
    let ch = 0;
    let ty = 0;
    let enemyX = 0;
    let enemyY = 0;
    let aniTime = Number(3000 / (BET_COIN_RES_ARR.length + 1));
    for (let i = 0, p = Promise.resolve(); i < BET_COIN_RES_ARR.length; i++) {
      p = p
        .then(() => {
          return roundEndBetMoveEnd(Number(aniTime));
        })
        .then(() => {
          const BET_COIN_EL = document.querySelector('.bet-coins');
          if (!BET_COIN_EL) return errorManagement({ errCase: 'elementLoss', message: 'round end에서 .bet-coins 엘리먼트가 없습니다' });
          const BET_COINS_EL = BET_COIN_EL.querySelectorAll('li');
          if (!BET_COINS_EL) return errorManagement({ errCase: 'elementLoss', message: 'round end에서 .bet-coins li 엘리먼트가 없습니다' });

          const BET_COINS_ELEM = BET_COINS_EL[0];
          cw = BET_COINS_ELEM.getBoundingClientRect().width;
          ch = BET_COINS_ELEM.getBoundingClientRect().height;
          // ty = BET_COIN_RES_ARR[i].translateY;
          ty = BET_COIN_RES_ARR[i][K[0]];

          // if (BET_COIN_RES_ARR[i].betState === 'end') {
          if (BET_COIN_RES_ARR[i][K[1]] === 'end') {
            enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').x;
            enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').y;
          } else {
            enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').x;
            enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').y;
          }
          BET_COINS_ELEM.style.transition = 'transform ' + Number(aniTime / 1000) + 's ease-in';
          BET_COINS_ELEM.style.transform = 'translate(' + enemyX + 'px, ' + enemyY + 'px)';
          return {
            el: BET_COINS_ELEM,
            // state: BET_COIN_RES_ARR[i].betState === 'end' ? document.querySelector('.coins-enemy') : document.querySelector('.coins-player'),
            state: BET_COIN_RES_ARR[i][K[1]] === 'end' ? document.querySelector('.coins-enemy') : document.querySelector('.coins-player'),
          };
        })
        .then((_data) => {
          setTimeout(() => {
            if (_data.state) _data.state.appendChild(document.createElement('li'));
            _data.el.remove();
            if (i === BET_COIN_RES_ARR.length - 1) resolve();
          }, Number(aniTime));
        });
    }
  });
};
