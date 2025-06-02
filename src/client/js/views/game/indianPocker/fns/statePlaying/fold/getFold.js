import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
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
    const promise = new Promise((resolve, reject) => {
      resolve(_data);
    });
    promise
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
            const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const ENEMY_BET = window.sessionStorage.coinsEnemyBet;
            storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(COINS_PLAYER) + Number(PLAYER_BET) + Number(ENEMY_BET));
            foldSendResultComn();
            storageMethod('s', 'SET_ITEM', 'betUser', true);
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
    const COINS_ENEMY_RES = window.sessionStorage.coinsEnemy;
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
    const D_ARR = ['coinsEnemyBet', 'coinsPlayerBet', 'coinsEnemyExtBet', 'coinsPlayerExtBet', 'betCoin', 'betCoinPos', 'extFirstBet', 'drewReady', 'drewState'];
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
