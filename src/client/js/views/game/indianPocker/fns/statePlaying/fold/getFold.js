import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { text } from '@/client/js/functions/language';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from '@/client/js/functions/variable';
import { bottomSheet } from '@/client/components/popup/bottomSheet/bottomSheet';
import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes';
import getLocalCardNum from '@/client/js/views/game/indianPocker/fns/common/getLocalCardNum';
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
        /*
        flipPlayerCardComn(flipPlayerCard, playerNumRes());
        */
        flipPlayerCardComn(flipPlayerCard, getLocalCardNum());
        // 내 카드 확인 완료 했으니 storage 에서 제거
        storageMethod('s', 'REMOVE_ITEM', 'playCardNum');

        GET_FOLD.roundResultDisplay();
        BattingZoneMovePlayerBlock('win').then((_state) => {
          BettingZoneMoveComn(_state).then((_stateNext) => {
            const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
            const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser

            // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
            const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
            const decryptVal2 = dec(encryptVal2); // coinsPlayer value number

            // const PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const encryptKey3 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
            const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
            const decryptVal3 = dec(encryptVal3); // coinsPlayerBet value number

            const ENEMY_BET = window.sessionStorage.coinsEnemyBet;

            // storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(COINS_PLAYER) + Number(PLAYER_BET) + Number(ENEMY_BET));
            storageMethod('s', 'SET_ITEM', encryptKey2, enc(Number(decryptVal2) + Number(decryptVal3) + Number(ENEMY_BET)));

            foldSendResultComn();
            // storageMethod('s', 'SET_ITEM', 'betUser', true);
            storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1); // betUser, true
            if (_data.penalty) {
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
      'coinsEnemyBet',
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      'coinsEnemyExtBet',
      'coinsPlayerExtBet',
      'betCoin',
      'betCoinPos',
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
          GET_ROUND_END.getWinnerCoinNext('win');
          // GET_ROUND_END.goNextRound('win');
        }, timeInterval_1);
      }, timeInterval_1);
    }, timeInterval_1);
  },
  sendFoldData: (_data) => {
    storageMethod('s', 'SET_ITEM', 'foldState', true);
    storageMethod('s', 'SET_ITEM', 'foldUser', false);
    storageMethod('s', 'SET_ITEM', 'coinsEnemyRemoteFold', _data.coinsEnemyRemoteFold);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerRemoteFold', _data.coinsPlayerRemoteFold);
  },
};
