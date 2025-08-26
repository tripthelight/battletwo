import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from '@/client/js/functions/variable';
import { bottomSheet } from '@/client/components/popup/bottomSheet/bottomSheet';
import { text } from '@/client/js/functions/language';
import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import BattingZoneMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveEnemyBlock';
import BettingZoneMoveComnFold from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComnFold';
import PlayerBlockMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/PlayerBlockMoveEnemyBlock';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import resultTxtInnerHtml from '@/client/js/views/game/indianPocker/fns/common/resultTxtInnerHtml';
import storageMethod from '@/client/js/module/storage/storageMethod';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';
import cardHideAnimationComn from '@/client/js/views/game/indianPocker/fns/common/cardHideAnimationComn';


export const SET_FOLD = {
  foldPenaltySessionModify: (_statePenalty) => {
    // const P_COINS = Number(window.sessionStorage.coinsPlayer);
    // const E_COINS = Number(window.sessionStorage.coinsEnemy);
    const COINS_ENEMY = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY) errorManagement({ errCase: 'elementLoss', message: 'fold ani 완료 후 .coins-enemy 엘리먼트가 없습니다' });
    const COINS_PLAYER = document.querySelector('.coins-player');
    if (!COINS_PLAYER) errorManagement({ errCase: 'elementLoss', message: 'fold ani 완료 후 .coins-player 엘리먼트가 없습니다' });
    // const COINS_ENEMY_LI = COINS_ENEMY.querySelectorAll('li');
    // const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll('li');
    /*
    if (COINS_ENEMY_LI.length > 0) for (let i = 0; i < COINS_ENEMY_LI.length; i++) COINS_ENEMY_LI[i].remove();
    if (Number(E_COINS) > 0) for (let i = 0; i < Number(E_COINS); i++) COINS_ENEMY.appendChild(document.createElement('li'));
    if (COINS_PLAYER_LI.length > 0) for (let i = 0; i < COINS_PLAYER_LI.length; i++) COINS_PLAYER_LI[i].remove();
    if (Number(P_COINS) > 0) for (let i = 0; i < Number(P_COINS); i++) COINS_PLAYER.appendChild(document.createElement('li'));
    */
    // const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState'];
    const D_ARR = [
      'coinsEnemyBet',
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      'coinsEnemyExtBet',
      'coinsPlayerExtBet',
      'betCoin',
      'betCoinPos',
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
      'drewState'
    ];
    storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);
    pcDraggableCheck('coins-player', false);
    setTimeout(
      () => {
        GET_ROUND_END.getWinnerCoinNext('die');
        cardHideAnimationComn();
        // setTimeout(GET_ROUND_END.goNextRound, timeInterval_1);
      },
      _statePenalty ? timeInterval_1000 : 0,
    );
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'fold 에서 .betting-zone 엘리먼트가 없습니다.' });

    document.documentElement.style.setProperty('--round-result-height', `${BETTING_ZONE.clientHeight}px`);

    let txtArr = ['YOU', 'FOLD', 'NEXT'];
    let resultEl = document.createElement('div');
    resultEl.classList.add('round-result');
    resultEl.innerHTML = txtArr[0];
    BETTING_ZONE.appendChild(resultEl);
    setTimeout(resultTxtInnerHtml, timeInterval_1000, resultEl, txtArr, 1);
    setTimeout(resultTxtInnerHtml, timeInterval_2000, resultEl, txtArr, 2);
    setTimeout(() => {
      resultEl.remove();
    }, timeInterval_3201);
  },
  setFold: (_num) => {
    const PROMISE = new Promise((resolve, reject) => {
      resolve(_num);
    });
    PROMISE
      .then((_numRes) => {
        const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
        const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
        const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser

        // storageMethod('s', 'SET_ITEM', 'betUser', false);
        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2); // betUser, false
        storageMethod('s', 'REMOVE_ITEM', 'drewState');
        flipPlayerCardComn(flipPlayerCard, _numRes);

        // 내 카드 확인 완료 했으니 storage 에서 제거
        storageMethod('s', 'REMOVE_ITEM', 'playCardNum');

        // 1. YOU FOLD NEXT 문구 출력
        // 2. 배팅이 끝난 코인은 enemy block으로 이동
        // 3. player의 추가 배팅이 있으면 player block으로 이동
        SET_FOLD.roundResultDisplay();
        BattingZoneMoveEnemyBlock('fold').then((_state) => {
          BettingZoneMoveComnFold().then(() => {
            // storageMethod('s', 'SET_ITEM', 'coinsEnemy', Number(window.sessionStorage) + _numRes);
            // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
            const encryptKey1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
            const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
            const decryptVal1 = encryptVal1 !== null ? dec(encryptVal1) : 0; // coinsEnemy value number

            // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
            const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
            const decryptVal2 = encryptVal2 !== null ? dec(encryptVal2) : 0; // coinsPlayer value number

            const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;

            // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const encryptKey4 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
            const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
            const decryptVal4 = encryptVal4 !== null ? dec(encryptVal4) : 0; // coinsPlayerBet value number

            const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;

            // const FOLD_CE = COINS_ENEMY && Number(COINS_ENEMY) >= 0 ? Number(COINS_ENEMY) : 0;
            const FOLD_CE = encryptVal1 !== null && Number(decryptVal1) >= 0 ? Number(decryptVal1) : 0;

            // const FOLD_CP = COINS_PLAYER && Number(COINS_PLAYER) >= 0 ? Number(COINS_PLAYER) : 0;
            const FOLD_CP = encryptVal2 !== null && Number(decryptVal2) >= 0 ? Number(decryptVal2) : 0;

            const FOLD_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) >= 0 ? Number(COINS_ENEMY_BET) : 0;

            // const FOLD_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) >= 0 ? Number(COINS_PLAYER_BET) : 0;
            const FOLD_CPB = encryptVal4 !== null && Number(decryptVal4) >= 0 ? Number(decryptVal4) : 0;

            const FOLD_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) >= 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
            const RES_E = Number(FOLD_CEB + FOLD_CPB - FOLD_CPEB);

            // storageMethod('s', 'SET_ITEM', 'coinsEnemy', FOLD_CE + RES_E);
            storageMethod('s', 'SET_ITEM', encryptKey1, enc(FOLD_CE + RES_E)); // coinsEnemy

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', FOLD_CP + FOLD_CPEB);
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(FOLD_CP + FOLD_CPEB)); // coinsPlayer

            if (_num === 10) {
              bottomSheet.show(text.indianpocker.penalty, timeInterval_5000);
              PlayerBlockMoveEnemyBlock().then(() => {
                SET_FOLD.foldPenaltySessionModify(true);
              });
            } else {
              SET_FOLD.foldPenaltySessionModify(false);
            }
          });
        });
      })
      .catch((error) => {
        console.log('error setFold : ', error);
        return errorManagement({ errCase: 'errorComn', errorDetails: error });
      });
  },
};
