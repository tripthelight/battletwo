import BattingZoneMoveRt from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveRt.js';
import roundEndBetMoveEnd from '@/client/js/views/game/indianPocker/fns/common/roundEndBetMoveEnd.js';
import roundEndBetEnemyMoveXY from '@/client/js/views/game/indianPocker/fns/common/roundEndBetEnemyMoveXY.js';
import { errorManagement } from '@/client/js/module/errorManagement';

export default (_state) => {
  return new Promise((resolve, reject) => {
    let STATE_CASE = ['win', 'lose', 'fold'];
    if (STATE_CASE.filter((item) => _state === item).length) {
      const BET_COINS = document.querySelector('.bet-coins');
      if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.betting-zone에서 .enemy-block으로 칩을 옯길 때 .bet-coins 엘리먼트가 없습니다' });
      const BET_COIN_RES_ARR = BattingZoneMoveRt();
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
            if (!BET_COIN_EL) return errorManagement({ errCase: 'errorComn', message: 'round end에서 .bet-coins 엘리먼트가 없습니다' });
            const BET_COINS_EL = BET_COIN_EL.querySelectorAll('li');
            if (!BET_COINS_EL) return errorManagement({ errCase: 'errorComn', message: 'round end에서 .bet-coins li 엘리먼트가 없습니다' });

            const BET_COINS_ELEM = BET_COINS_EL[0];
            cw = BET_COINS_ELEM.clientWidth;
            ty = BET_COIN_RES_ARR[i].translateY;
            ch = BET_COINS_ELEM.clientHeight;

            // call case
            if (_state === 'lose') {
              enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').x;
              enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').y;
            } else if (_state === 'win') {
              enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').x;
              enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').y;
            } else if (_state === 'fold') {
              // fold case
              if (BET_COIN_RES_ARR[i].betState === 'end') {
                enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').x;
                enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'end').y;
              } else {
                enemyX = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').x;
                enemyY = roundEndBetEnemyMoveXY(cw, ch, ty, 'add').y;
              }
            }
            BET_COINS_ELEM.style.transition = 'transform ' + Number(aniTime / 1000) + 's ease-in';
            BET_COINS_ELEM.style.transform = 'translate(' + enemyX + 'px, ' + enemyY + 'px)';

            // call case
            let stateRes;
            switch (_state) {
              case 'lose':
                stateRes = document.querySelector('.coins-enemy');
                break;
              case 'win':
                stateRes = document.querySelector('.coins-player');
                break;
              case 'fold':
                if (BET_COIN_RES_ARR[i].betState === 'end') {
                  stateRes = document.querySelector('.coins-enemy');
                } else {
                  stateRes = document.querySelector('.coins-player');
                }
                break;
              default:
                break;
            }
            return {
              el: BET_COINS_ELEM,
              state: stateRes,
              result: _state,
            };
          })
          .then((_data) => {
            setTimeout(() => {
              if (_data.state) _data.state.appendChild(document.createElement('li'));
              _data.el.remove();
              // call case
              if (i === BET_COIN_RES_ARR.length - 1) resolve(_data.result);
            }, Number(aniTime));
          });
      }
    } else {
      return errorManagement({ errCase: 'errorComn', message: 'call 이후 win | lose | fold 가 아닙니다 :: ' });
    }
  });
};
