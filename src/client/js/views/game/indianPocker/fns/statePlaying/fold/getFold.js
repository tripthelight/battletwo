import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { text } from '@/client/js/functions/language';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from '@/client/js/functions/variable';
import { bottomSheet } from '@/client/components/popup/bottomSheet/bottomSheet';
// import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
// import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import selectedCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/selectedCard';
import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import flipLocalCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/flipLocalCard';
// import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes';
// import getLocalCardNum from '@/client/js/views/game/indianPocker/fns/common/getLocalCardNum';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock';
import BettingZoneMoveComn from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComn';
import foldSendResultComn from '@/client/js/views/game/indianPocker/fns/common/foldSendResultComn';
import EnemyBlockMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/EnemyBlockMovePlayerBlock';
import cardHideAnimationComn from '@/client/js/views/game/indianPocker/fns/common/cardHideAnimationComn';
import { GET_ROUND_END } from '@/client/js/views/game/indianPocker/fns/statePlaying/roundEnd/getRoundEnd';
import resultTxtInnerHtml from '@/client/js/views/game/indianPocker/fns/common/resultTxtInnerHtml.js';

export const GET_FOLD = {
  receivefold: (_data) => {
    const PROMISE = new Promise((resolve, reject) => {
      resolve(_data);
    });
    PROMISE
      .then((_data) => {
        const { penalty, playerCardNum } = _data;
        /*
        flipPlayerCardComn(flipPlayerCard, playerNumRes());
        */




        // flipPlayerCardComn(flipPlayerCard, getLocalCardNum());

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
        selectedCard(playerCardNum, mergePayload())
          .then((svg) => setTimeout(flipLocalCard, 200, { svg, svgWrap: PLAYER_CARD, imgEl: CARD_IMG }));




        // 내 카드 확인 완료 했으니 storage 에서 제거
        storageMethod(
          's',
          'REMOVE_ITEM',
          findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]) // playCardNum
        );

        GET_FOLD.roundResultDisplay();
        BattingZoneMovePlayerBlock('win').then((_state) => {
          BettingZoneMoveComn(_state).then((_stateNext) => {
            const encryptKey1_1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
            const encryptKey1_2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]);  // betUserFirst

            // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
            const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
            const decryptVal2 = dec(encryptVal2); // coinsPlayer value number

            // const PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const encryptKey3 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
            const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
            const decryptVal3 = dec(encryptVal3); // coinsPlayerBet value number

            // const ENEMY_BET = window.sessionStorage.coinsEnemyBet;
            const encryptKey4 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
            const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
            const decryptVal4 = dec(encryptVal4); // coinsEnemyBet value number

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(COINS_PLAYER) + Number(PLAYER_BET) + Number(ENEMY_BET));
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(Number(decryptVal2) + Number(decryptVal3) + Number(decryptVal4)));

            foldSendResultComn();
            // storageMethod('s', 'SET_ITEM', 'betUser', true);
            // betUser, true
            storageMethod('s', 'SET_ITEM',
              encryptKey1_1, // betUser
              X.enc(decodeTF(_t([115, 119, 114, 110]))) // "swrn" : true
            );
            // betUserFirst, true
            storageMethod('s', 'SET_ITEM',
              encryptKey1_2, // betUserFirst
              X.enc(decodeTF(_t([99, 102, 104, 117]))) // "cfhu" : true
            );
            if (penalty) {
              // 상대 카드가 10일 때
              bottomSheet.show(text.indianpocker.benefit, timeInterval_5000);
              EnemyBlockMovePlayerBlock().then((_result) => {
                foldSendResultComn();
                GET_FOLD.redrawCoinsEnemy();
                GET_FOLD.nextRound();
              });
            } else {
              GET_FOLD.nextRound();
            }
          });
        });
      })
      .catch((error) => {
        console.log('error getFold');
        return errorManagement({ errCase: 'errorComn' });
      });
  },
  redrawCoinsEnemy: () => {
    // const COINS_ENEMY_RES = window.sessionStorage.coinsEnemy;
    const ENEMY_COINS = document.querySelector('.coins-enemy');
    const ENEMY_COINS_LI = ENEMY_COINS.querySelectorAll('li');
    // if (ENEMY_COINS_LI.length > 0) for (let i = 0; i < ENEMY_COINS_LI.length; i++) ENEMY_COINS_LI[i].remove();
    // for (let j = 0; j < Number(COINS_ENEMY_RES); j++) ENEMY_COINS.appendChild(document.createElement('li'));
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'fold 에서 .betting-zone 엘리먼트가 없습니다.' });

    document.documentElement.style.setProperty('--round-result-height', `${BETTING_ZONE.clientHeight}px`);

    let txtArr = ['OPPONENT', 'FOLD', 'NEXT'];
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
  nextRound: () => {
    // const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState'];
    const D_ARR = [
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
      findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
      findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet,
      findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
      findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]) // drewState
    ];
    storageMethod('s', 'REMOVE_ARR', '', '', D_ARR);

    setTimeout(() => {
      cardHideAnimationComn();
      setTimeout(() => {
        // GET_ROUND_END.getWinnerCoinNext('win');
        setTimeout(() => {
          // GET_ROUND_END.getWinnerCoinNext('win');
          GET_ROUND_END.getWinnerCoinNext(1);
          // GET_ROUND_END.goNextRound('win');
        }, timeInterval_1);
      }, timeInterval_1);
    }, timeInterval_1);
  },
  sendFoldData: (_data) => {
    // storageMethod('s', 'SET_ITEM', 'foldState', true);
    storageMethod('s', 'SET_ITEM',
      findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), // foldState
      X.enc(decodeTF(_t([107, 119, 104, 97]))) // "kwha" : true
    );

    // storageMethod('s', 'SET_ITEM', 'foldUser', false);
    storageMethod('s', 'SET_ITEM',
      findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), // foldUser
      X.enc(decodeTF(_t([100, 111, 108, 116, 97]))) // "dolta" : false
    );

    // storageMethod('s', 'SET_ITEM', 'coinsEnemyRemoteFold', _data.coinsEnemyRemoteFold);
    storageMethod('s', 'SET_ITEM',
      findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), // coinsEnemyRemoteFold
      enc(_data.coinsEnemyRemoteFold)
    );
    // storageMethod('s', 'SET_ITEM', 'coinsPlayerRemoteFold', _data.coinsPlayerRemoteFold);
    storageMethod('s', 'SET_ITEM',
      findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), // coinsPlayerRemoteFold
      enc(_data.coinsPlayerRemoteFold)
    );
  },
};
