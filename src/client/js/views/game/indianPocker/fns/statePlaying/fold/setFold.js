import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from '@/client/js/functions/variable';
import { bottomSheet } from '@/client/components/popup/bottomSheet/bottomSheet';
import { text } from '@/client/js/functions/language';
// import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
// import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import selectedCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/selectedCard';
import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import flipLocalCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/flipLocalCard';
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
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
      findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
      'betCoinPos',
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
      findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]) // drewState
    ];
    storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);
    pcDraggableCheck('coins-player', false);
    setTimeout(
      () => {
        // GET_ROUND_END.getWinnerCoinNext('die');
        GET_ROUND_END.getWinnerCoinNext(3);
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
  setFold: (_data) => {
    const PROMISE = new Promise((resolve, reject) => {
      resolve(_data);
    });
    PROMISE
      .then((_data) => {
        const { _penalty, _num } = _data;
        const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
        const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
        const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
        const encryptKey2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]);  // betUserFirst

        // storageMethod('s', 'SET_ITEM', 'betUser', false);
        storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2); // betUser, false
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_2); // betUserFirst, false
        storageMethod('s', 'REMOVE_ITEM', findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77])); // drewState


        // flipPlayerCardComn(flipPlayerCard, _numRes);

        const PLAYER_BLOCK = document.querySelector('.player-block');
        if (!PLAYER_BLOCK) {
          console.log('error - getRoundEnd.js - !PLAYER_BLOCK');
          return errorManagement({ errCase: 'errorComn' });
        }
        const PLAYER_CARD = document.querySelector('.player-card');
        if (!PLAYER_CARD) {
          console.log('error - getRoundEnd.js - !PLAYER_BLOCK');
          return errorManagement({ errCase: 'errorComn' });
        }
        const CARD_IMG = PLAYER_CARD.querySelector('img.card');
        if (!CARD_IMG) {
          console.log('error - getRoundEnd.js - !PLAYER_CARD');
          return errorManagement({ errCase: 'errorComn' });
        }
        PLAYER_BLOCK.classList.add('round-end');
        selectedCard(_num, mergePayload())
          .then((svg) => setTimeout(flipLocalCard, 200, { svg, svgWrap: PLAYER_CARD, imgEl: CARD_IMG }));





        // 내 카드 확인 완료 했으니 storage 에서 제거
        storageMethod(
          's',
          'REMOVE_ITEM',
          findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]) // playCardNum
        );

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
            const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemy value number

            // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
            const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
            const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayer value number

            // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
            const encryptKey3 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
            const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
            const decryptVal3 = encryptVal3 !== null && encryptVal3 !== '' ? dec(encryptVal3) : 0; // coinsEnemyBet value number

            // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const encryptKey4 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
            const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
            const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsPlayerBet value number

            // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
            const encryptKey5 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
            const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
            const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0; // coinsPlayerExtBet value number

            // const FOLD_CE = COINS_ENEMY && Number(COINS_ENEMY) >= 0 ? Number(COINS_ENEMY) : 0;
            const FOLD_CE = encryptVal1 !== null && encryptVal1 !== '' && Number(decryptVal1) >= 0 ? Number(decryptVal1) : 0;

            // const FOLD_CP = COINS_PLAYER && Number(COINS_PLAYER) >= 0 ? Number(COINS_PLAYER) : 0;
            const FOLD_CP = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2) >= 0 ? Number(decryptVal2) : 0;

            // const FOLD_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) >= 0 ? Number(COINS_ENEMY_BET) : 0;
            const FOLD_CEB = encryptVal3 !== null && encryptVal3 !== '' && Number(decryptVal3) >= 0 ? Number(decryptVal3) : 0;

            // const FOLD_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) >= 0 ? Number(COINS_PLAYER_BET) : 0;
            const FOLD_CPB = encryptVal4 !== null && encryptVal4 !== '' && Number(decryptVal4) >= 0 ? Number(decryptVal4) : 0;

            // const FOLD_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) >= 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
            const FOLD_CPEB = encryptVal5 !== null && encryptVal5 !== '' && Number(decryptVal5) >= 0 ? Number(decryptVal5) : 0;

            const RES_E = Number(FOLD_CEB + FOLD_CPB - FOLD_CPEB);

            // storageMethod('s', 'SET_ITEM', 'coinsEnemy', FOLD_CE + RES_E);
            storageMethod('s', 'SET_ITEM', encryptKey1, enc(FOLD_CE + RES_E)); // coinsEnemy

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', FOLD_CP + FOLD_CPEB);
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(FOLD_CP + FOLD_CPEB)); // coinsPlayer

            // if (_num === 10) {
            if (_penalty) {
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
