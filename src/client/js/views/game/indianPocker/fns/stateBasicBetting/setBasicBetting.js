import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import {GRS} from '@/client/js/module/crypts/generateRandomString';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
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
      X.enc(decodeTF(_t([99, 109, 104, 97]))) // "cmha" : true
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

    const conditiPeer = encryptNumOfStr(GRS([_t([119])],parseInt(_t([51]))) + _t([98])); // ex) "wwwb" : 1

    // const PLAY_CHECK = window.sessionStorage.coinsPlayerBet;
    // if (!PLAY_CHECK || Number(PLAY_CHECK) !== 1) return false;
    const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    if (encryptVal2 === null) return false;
    const decryptVal2 = dec(encryptVal2); // coinsPlayerBet value number
    if (Number(decryptVal2) !== conditiPeer) return false;

    // const ENEMY_CHECK = window.sessionStorage.coinsEnemyBet;
    // if (!ENEMY_CHECK || Number(ENEMY_CHECK) !== 1) return false;
    const encryptKey3 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    if (encryptVal3 === null) return false;
    const decryptVal3 = dec(encryptVal3); // coinsEnemyBet value number
    if (Number(decryptVal3) !== conditiPeer) return false;

    STATE_BASIC_BET.nextStep();
  },
  enemyBetStateCheck: () => {
    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    if (encryptVal1 === decryptVal1) {
      const encryptKey2 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      // if (window.sessionStorage.basicBettingState === 'true') {
      // basicBettingState === true
      if (
        encryptVal2 !== null &&
        encryptVal2 !== '' &&
        X.dec(encryptVal2)
      ) {
        const encryptKey3 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
        const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
        // if (window.sessionStorage.coinsEnemyBet) {
        if (encryptVal3 !== null && encryptVal3 !== '') {
          // 상대의 gameState를 playing으로 변경시키기
          request('basicBettingCompleted');
          SET_BASIC_BETTING.basicBetCheck();
        };
      };
    };
  },
  betCoinStateAddEnd: (_host) => {
    // const COIN_BET = window.sessionStorage.betCoin;
    // if (!COIN_BET) throw throwObj('sessionStorageLoss', 'betCoinStateAddEnd - basic bet as betCoin sessionStorage key failed.');
    const encryptKey4 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
    const encryptVal4 = storageMethod("s", "GET_ITEM", encryptKey4);
    if (encryptVal4 === null) throw throwObj('sessionStorageLoss', 'betCoinStateAddEnd - basic bet as betCoin sessionStorage key failed.');
    // const COIN_BET_ARR = JSON.parse(COIN_BET);
    const COIN_BET_ARR = JSON.parse(encryptVal4);

    const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting

    // if (window.sessionStorage.betState === 'basicBetting') {
    if (encryptVal1 === decryptVal1) {
      if (COIN_BET_ARR.length > 0) {
        for (let i = 0; i < COIN_BET_ARR.length; i++) {
          COIN_BET_ARR[i].betState = 'end'; // string
        };
        // storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(COIN_BET_ARR));
        storageMethod('s', 'SET_ITEM', encryptKey4, JSON.stringify(COIN_BET_ARR));
      }
    }
    // 기본배팅 일 때만 실행
    if (_host === 'player') {
      pcDraggableCheck('coins-player', false);
      sendCoinsPlayer();
    } else if (_host === 'enemy') {
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
      const encryptKey2 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
      // if (window.sessionStorage.coinsEnemyBet) {
      if (encryptVal2 !== null && encryptVal2 !== '') {
        SET_BASIC_BETTING.basicBetCheck();
      };
    };
  },
};
