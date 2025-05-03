import { timeInterval_1 } from '@/client/js/functions/variable';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';
import { errorManagement } from '@/client/js/module/errorManagement';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import sendCoinsPlayer from '@/client/js/views/game/indianPocker/fns/common/sendCoinsPlayer';
import stopEnemyTime from '@/client/js/views/game/indianPocker/fns/common/stopEnemyTime';

export const SET_BASIC_BETTING = {
  setBasicBetting: (_event) => {
    window.sessionStorage.setItem('basicBettingState', true);
    if (window.sessionStorage.basicBettingState === 'true') {
      _event.target.classList.add('active');
      setTimeout(() => {
        removeCoinActive();
        setTimeout(playerCoinsData, timeInterval_1, _event);
      }, timeInterval_1);
    }
  },
  basicBetCheck: () => {
    const BASIC_BET = window.sessionStorage.betState;
    if (BASIC_BET !== 'basicBetting') return false;
    const PLAY_CHECK = window.sessionStorage.coinsPlayerBet;
    if (!PLAY_CHECK || Number(PLAY_CHECK) !== 1) return false;
    const ENEMY_CHECK = window.sessionStorage.coinsEnemyBet;
    if (!ENEMY_CHECK || Number(ENEMY_CHECK) !== 1) return false;

    setTimeout(STATE_BASIC_BET.nextStep, timeInterval_1);
  },
  enemyBetStateCheck: () => {
    setTimeout(() => {
      if (window.sessionStorage.betState === 'basicBetting') {
        console.log('여기는 타고..');
        if (window.sessionStorage.basicBettingState === 'true') {
          console.log('여기는 안타겠네..');
          if (window.sessionStorage.coinsEnemyBet) {
            setTimeout(SET_BASIC_BETTING.basicBetCheck, timeInterval_1);
          }
        }
      }
    }, timeInterval_1);
  },
  betCoinStateAddEnd: (_host) => {
    const COIN_BET = window.sessionStorage.betCoin;
    if (!COIN_BET) return errorManagement({ errCase: 'errorComn', message: '기본배팅 할 때 betCoin 세션이 없습니다.' });
    const COIN_BET_ARR = JSON.parse(COIN_BET);

    setTimeout(() => {
      if (window.sessionStorage.betState === 'basicBetting') {
        if (COIN_BET_ARR.length > 0) {
          for (let i = 0; i < COIN_BET_ARR.length; i++) {
            COIN_BET_ARR[i].betState = 'end';
          }
          window.sessionStorage.setItem('betCoin', JSON.stringify(COIN_BET_ARR));
        }
      }
      // 기본배팅 일 때만 실행
      if (_host === 'player') {
        console.log('player >>>> ');
        pcDraggableCheck('coins-player', false);
        setTimeout(sendCoinsPlayer, timeInterval_1);
      } else if (_host === 'enemy') {
        console.log('enemy >>>> ');
        // enemy의 기본배팅을 받았을 경우 enemy의 시간이 멈춰야 됨
        stopEnemyTime();
        setTimeout(SET_BASIC_BETTING.enemyBetStateCheck, timeInterval_1);
      }
    }, timeInterval_1);
  },
  basicBettingBetStateCheck: () => {
    if (window.sessionStorage.basicBettingState === 'true') {
      if (window.sessionStorage.coinsEnemyBet) {
        setTimeout(SET_BASIC_BETTING.basicBetCheck, timeInterval_1);
      }
    }
  },
};
