import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import sendCoinsPlayer from '@/client/js/views/game/indianPocker/fns/common/sendCoinsPlayer';
import stopEnemyTime from '@/client/js/views/game/indianPocker/fns/common/stopEnemyTime';

export const SET_BASIC_BETTING = {
  setBasicBetting: (_event) => {
    storageMethod('s', 'SET_ITEM', 'basicBettingState', true);
    if (window.sessionStorage.basicBettingState === 'true') {
      if (!_event?.target) return;
      _event.target.classList.add('active');
      removeCoinActive();
      playerCoinsData(_event);
    };
  },
  basicBetCheck: () => {
    // const BASIC_BET = window.sessionStorage.betState;
    // if (BASIC_BET !== 'basicBetting') return false;
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    if (encryptVal1 !== encryptKey2) return false;
    const PLAY_CHECK = window.sessionStorage.coinsPlayerBet;
    if (!PLAY_CHECK || Number(PLAY_CHECK) !== 1) return false;
    const ENEMY_CHECK = window.sessionStorage.coinsEnemyBet;
    if (!ENEMY_CHECK || Number(ENEMY_CHECK) !== 1) return false;
    STATE_BASIC_BET.nextStep();
  },
  enemyBetStateCheck: () => {
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    // if (window.sessionStorage.betState === 'basicBetting') {
    if (encryptVal1 === encryptKey2) {
      console.log('여기는 타고..');
      if (window.sessionStorage.basicBettingState === 'true') {
        console.log('여기는 안타겠네..');
        if (window.sessionStorage.coinsEnemyBet) {
          SET_BASIC_BETTING.basicBetCheck();
        };
      };
    };
  },
  betCoinStateAddEnd: (_host) => {
    const COIN_BET = window.sessionStorage.betCoin;
    if (!COIN_BET) return errorManagement({ errCase: 'sessionStorageLoss', message: '기본배팅 할 때 betCoin 세션이 없습니다.' });
    const COIN_BET_ARR = JSON.parse(COIN_BET);

    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting

    // if (window.sessionStorage.betState === 'basicBetting') {
    if (encryptVal1 === encryptKey2) {
      if (COIN_BET_ARR.length > 0) {
        for (let i = 0; i < COIN_BET_ARR.length; i++) {
          COIN_BET_ARR[i].betState = 'end';
        }
        storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(COIN_BET_ARR));
      }
    }
    // 기본배팅 일 때만 실행
    if (_host === 'player') {
      console.log('player >>>> ');
      pcDraggableCheck('coins-player', false);
      sendCoinsPlayer();
    } else if (_host === 'enemy') {
      console.log('enemy >>>> ');
      // enemy의 기본배팅을 받았을 경우 enemy의 시간이 멈춰야 됨
      stopEnemyTime();
      SET_BASIC_BETTING.enemyBetStateCheck();
    };
  },
  basicBettingBetStateCheck: () => {
    if (window.sessionStorage.basicBettingState === 'true') {
      if (window.sessionStorage.coinsEnemyBet) {
        SET_BASIC_BETTING.basicBetCheck();
      }
    }
  },
};
