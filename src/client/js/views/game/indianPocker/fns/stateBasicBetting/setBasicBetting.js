import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import removeCoinActive from '@/client/js/views/game/indianPocker/fns/common/removeCoinActive';
import playerCoinsData from '@/client/js/views/game/indianPocker/fns/common/playerCoinsData';
import STATE_BASIC_BET from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/init';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import sendCoinsPlayer from '@/client/js/views/game/indianPocker/fns/common/sendCoinsPlayer';
import stopEnemyTime from '@/client/js/views/game/indianPocker/fns/common/stopEnemyTime';
import { request } from '@/client/js/network/indianPocker/request';

export const SET_BASIC_BETTING = {
  setBasicBetting: (_event) => {
    // storageMethod('s', 'SET_ITEM', 'basicBettingState', true);
    const encryptKey1 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
    storageMethod('s', 'SET_ITEM',
      encryptKey1, // basicBettingState
      X.enc(decodeTF(textDE([99, 109, 104, 97]))) // "cmha" : true
    );

    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    // if (window.sessionStorage.basicBettingState === 'true') {
    // basicBettingState === true
    if (X.dec(encryptVal1)) {
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
    const decryptVal1 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    if (encryptVal1 !== decryptVal1) return false;


    // const PLAY_CHECK = window.sessionStorage.coinsPlayerBet;
    // if (!PLAY_CHECK || Number(PLAY_CHECK) !== 1) return false;
    const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    if (encryptVal2 === null) return false;
    const decryptVal2 = dec(encryptVal2); // coinsPlayerBet value number
    if (Number(decryptVal2) !== 1) return false;

    const ENEMY_CHECK = window.sessionStorage.coinsEnemyBet;
    if (!ENEMY_CHECK || Number(ENEMY_CHECK) !== 1) return false;
    STATE_BASIC_BET.nextStep();
  },
  enemyBetStateCheck: () => {
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    if (encryptVal1 === decryptVal1) {
      console.log('기본 배팅 진입');

      const encryptKey2 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      // if (window.sessionStorage.basicBettingState === 'true') {
      // basicBettingState === true
      if (
        encryptVal2 !== null &&
        encryptVal2 !== '' &&
        X.dec(encryptVal2)
      ) {
        console.log('내가 먼저 배팅하고 상대의 배팅 코인을 받음');
        if (window.sessionStorage.coinsEnemyBet) {
          // 상대의 gameState를 playing으로 변경시키기
          request('basicBettingCompleted');
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
    const decryptVal1 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting

    // if (window.sessionStorage.betState === 'basicBetting') {
    if (encryptVal1 === decryptVal1) {
      if (COIN_BET_ARR.length > 0) {
        for (let i = 0; i < COIN_BET_ARR.length; i++) {
          COIN_BET_ARR[i].betState = 'end'; // string
        };
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
      console.log('나는 상대의 기본 배팅 코인을 받음 ---------- ');
      // enemy의 기본배팅을 받았을 경우 enemy의 시간이 멈춰야 됨
      stopEnemyTime();
      SET_BASIC_BETTING.enemyBetStateCheck();
    };
  },
  basicBettingBetStateCheck: () => {
    const encryptKey1 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    // if (window.sessionStorage.basicBettingState === 'true') {
    // basicBettingState === true
    if (
      encryptVal1 !== null &&
      encryptVal1 !== '' &&
      X.dec(encryptVal1)
    ) {
      if (window.sessionStorage.coinsEnemyBet) {
        SET_BASIC_BETTING.basicBetCheck();
      }
    }
  },
};
