import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import {GRS} from '@/client/js/module/crypts/generateRandomString';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import storageMethod from '@/client/js/module/storage/storageMethod';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_202, timeInterval_3201, timeInterval_3202, timeInterval_401, timeInterval_402 } from '@/client/js/functions/variable';
import { request } from '@/client/js/network/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum';
import getLocalCardNum from '@/client/js/views/game/indianPocker/fns/common/getLocalCardNum';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock';
import BettingZoneMoveComnCallRaise from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComnCallRaise';
import BattingZoneMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveEnemyBlock';
import cardHideAnimationComn from '@/client/js/views/game/indianPocker/fns/common/cardHideAnimationComn';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import resultTxtInnerHtml from '@/client/js/views/game/indianPocker/fns/common/resultTxtInnerHtml';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber.js';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard.js';

export const GET_ROUND_END = {
  receiveRoundEnd: () => {
    storageMethod('s', 'SET_ITEM', 'betResulting', true); // refresh check
    storageMethod('s', 'REMOVE_ITEM', 'drewFlipCardMode');
    // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
    storageMethod('s', 'REMOVE_ITEM', findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78])); // drewReady
    // storageMethod('s', 'REMOVE_ITEM', 'dropState');
    storageMethod('s', 'REMOVE_ITEM', findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89])); // dropState
    if (window.sessionStorage.drewCardReady) {
      LOADING_EVENT.hide();
      storageMethod('s', 'REMOVE_ITEM', 'drewCardReady');
    }
    setTimeout(GET_ROUND_END.stopBetUser, timeInterval_1);
  },
  stopBetUser: () => {
    const PLAYER_BLOCK = document.querySelector('.player-block');
    if (!PLAYER_BLOCK) {
      console.log('error - getRoundEnd.js - !PLAYER_BLOCK');
      return errorManagement({ errCase: 'errorComn' });
    }
    PLAYER_BLOCK.classList.remove('active');
    PLAYER_BLOCK.classList.add('disabled');
    const COINS_PLAYER = PLAYER_BLOCK.querySelector('.coins-player');
    if (!COINS_PLAYER) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER');
      return errorManagement({ errCase: 'errorComn' });
    }
    COINS_PLAYER.classList.remove('active');
    COINS_PLAYER.classList.add('disabled');
    // disabled enemy block
    const ENEMY_BLOCK = document.querySelector('.enemy-block');
    if (!ENEMY_BLOCK) {
      console.log('error - getRoundEnd.js - !ENEMY_BLOCK');
      return errorManagement({ errCase: 'errorComn' });
    }
    ENEMY_BLOCK.classList.remove('active');
    ENEMY_BLOCK.classList.add('disabled');
    const COINS_ENEMY = ENEMY_BLOCK.querySelector('.coins-enemy');
    if (!COINS_ENEMY) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY');
      return errorManagement({ errCase: 'errorComn' });
    }
    COINS_ENEMY.classList.remove('active');
    COINS_ENEMY.classList.add('disabled');
    const ENEMY_CARD = ENEMY_BLOCK.querySelector('.enemy-card');
    if (!ENEMY_CARD) {
      console.log('error - getRoundEnd.js - !ENEMY_CARD');
      return errorManagement({ errCase: 'errorComn' });
    }
    ENEMY_CARD.classList.remove('active');
    ENEMY_CARD.classList.add('disabled');
    // disabled touch move
    disabledMoveCoins();
    setTimeout(GET_ROUND_END.removeBottomButtons, timeInterval_1);
  },
  removeBottomButtons: () => {
    BTN_STATE.HIDE();
    // if (window.sessionStorage.drewState && window.sessionStorage.drewState === 'true') LOADING_EVENT.hide();
    const encryptKey1 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    // drewState === true
    if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) LOADING_EVENT.hide();

    setTimeout(GET_ROUND_END.flipPlayCard, timeInterval_1);
  },
  flipPlayCard: () => {
    /*
    const P_NUM_RES = playerNumRes();
    flipPlayerCardComn(flipPlayerCard, P_NUM_RES);
    setTimeout(GET_ROUND_END.cardNumCompare, timeInterval_401, P_NUM_RES);
    */
    /*
    const PLAYER_CARD_NUM = window.sessionStorage.getItem('playCardNum');
    if (PLAYER_CARD_NUM === null || (PLAYER_CARD_NUM !== null && PLAYER_CARD_NUM === '')) {
      return errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - playCardNum null' });
    }
    const PLAYER_CARD_NUMBER = playerNum(PLAYER_CARD_NUM);
    */

    const PLAYER_CARD_NUMBER = getLocalCardNum();
    flipPlayerCardComn(flipPlayerCard, getLocalCardNum());
    setTimeout(GET_ROUND_END.cardNumCompare, timeInterval_401, PLAYER_CARD_NUMBER);
  },
  cardNumCompare: (_playerNumRes) => {
    /*
    const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
    if (!BATTLE_CARD_NUM) {
      console.log('error - getRoundEnd.js - !BATTLE_CARD_NUM');
      return errorManagement({ errCase: 'errorComn' });
    }

    const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
    if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length <= 0) {
      console.log('error - getRoundEnd.js - !BATTLE_CARD_ARR || BATTLE_CARD_ARR.length <= 0');
      return errorManagement({ errCase: 'errorComn' });
    }

    let enemyNumRes = playerNum(BATTLE_CARD_ARR, 'enemy');

    let result = '';
    if (Number(_playerNumRes) > Number(enemyNumRes)) {
      result = 'win';
      storageMethod('s', 'REMOVE_ITEM', 'drewState');
    } else if (Number(_playerNumRes) < Number(enemyNumRes)) {
      result = 'lose';
      storageMethod('s', 'REMOVE_ITEM', 'drewState');
    } else if (Number(_playerNumRes) === Number(enemyNumRes)) {
      result = 'drew';
      storageMethod('s', 'SET_ITEM', 'betUser', window.sessionStorage.betUserFirst);
      storageMethod('s', 'SET_ITEM', 'drewState', true);
      storageMethod('s', 'SET_ITEM', 'roundEnd', false);
      storageMethod('s', 'SET_ITEM', 'extFirstBet', false);
    } else {
      console.log('error - getRoundEnd.js - cardNumCompare !result');
      errorManagement({ errCase: 'errorComn' });
    }
    */

    const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
    if (BATTLE_CARD_NUM === null) {
      return errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - !BATTLE_CARD_NUM' });
    }

    const cardNum = {
      enemy: playerNum(BATTLE_CARD_NUM),
      player: _playerNumRes,
    };

    console.log('enemy card num =============== ', cardNum.enemy);
    console.log('player card num =============== ', cardNum.player);

    const encryptKey2 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState

    let result = '';
    if (Number(cardNum.player) > Number(cardNum.enemy)) {
      result = 'win';
      // storageMethod('s', 'REMOVE_ITEM', 'drewState');
      storageMethod('s', 'REMOVE_ITEM', encryptKey2); // drewState
    } else if (Number(cardNum.player) < Number(cardNum.enemy)) {
      result = 'lose';
      // storageMethod('s', 'REMOVE_ITEM', 'drewState');
      storageMethod('s', 'REMOVE_ITEM', encryptKey2); // drewState
    } else if (Number(cardNum.player) === Number(cardNum.enemy)) {
      result = 'drew';

      const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
      const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
      const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
      const encryptVal2 = booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]);  // betUserFirst

      // storageMethod('s', 'SET_ITEM', 'betUser', window.sessionStorage.betUserFirst);
      storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal2);

      // storageMethod('s', 'SET_ITEM', 'drewState', true);
      storageMethod('s', 'SET_ITEM',
        encryptKey2, // drewState
        X.enc(decodeTF(_t([115, 102, 114, 97]))) // "sfra" : true
      );

      storageMethod('s', 'SET_ITEM',
        findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
        X.enc(decodeTF(_t([106, 103, 118, 116, 97]))) // "jgvta" : false
      );
      storageMethod('s', 'SET_ITEM',
        findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
        X.enc(decodeTF(_t([120, 111, 118, 116, 97]))) // "xovta" : false
      );
    } else {
      console.log('error - getRoundEnd.js - cardNumCompare !result');
      errorManagement({ errCase: 'errorComn' });
    }

    // 내 카드 확인 완료 했으니 storage 에서 제거
    storageMethod('s', 'REMOVE_ITEM', 'playCardNum');

    setTimeout(GET_ROUND_END.savsSessionResult, timeInterval_1, result);
  },
  savsSessionResult: (_result) => {
    const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
    const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
    const encryptKey1 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
    const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const encryptKey3 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]);  // coinsEnemy
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const encryptKey4 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    const encryptKey5 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    const encryptKey6 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal6 = window.sessionStorage.getItem(encryptKey6);
    const encryptKey7 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal7 = window.sessionStorage.getItem(encryptKey7);
    const encryptKey8 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
    const encryptVal8 = window.sessionStorage.getItem(encryptKey8);

    // const BET_USER = window.sessionStorage.betUser;
    // if (!BET_USER) {
    if (encryptVal2 === null) { // betUser key null
      console.log('error - getRoundEnd.js - !BET_USER');
      errorManagement({ errCase: 'errorComn' });
    }
    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    // if (!COINS_PLAYER) {
    if (encryptVal4 === null) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER');
      errorManagement({ errCase: 'errorComn' });
    }
    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // if (!COINS_ENEMY) {
    if (encryptVal3 === null) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY');
      errorManagement({ errCase: 'errorComn' });
    }

    // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    // if (!COINS_PLAYER_BET) {
    if (encryptVal5 === null) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER_BET');
      errorManagement({ errCase: 'errorComn' });
    }

    // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    // if (!COINS_ENEMY_BET) {
    if (encryptVal7 === null) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    /*
    // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    // if (!COINS_PLAYER_EXT_BET) {
    if (encryptVal6 === null) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER_EXT_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    // if (!COINS_ENEMY_EXT_BET) {
    if (encryptVal8 === null) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY_EXT_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    */
    const insertBet = enc(encryptNumOfStr(GRS([_t([119]), _t([119])],parseInt(_t([50]))))); // ex) "ee" : 0
    const PNUM = Number(COINS_PLAYER_BET);
    const ENUM = Number(COINS_ENEMY_BET);
    const RESULT = Number(PNUM) + Number(ENUM);

    // if (_result !== 'drew') storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', 0);
    if (_result !== 'drew') storageMethod('s', 'SET_ITEM', encryptKey5, insertBet);

    if (_result !== 'drew') storageMethod('s', 'SET_ITEM', encryptKey7, insertBet); // coinsEnemyBet

    // storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
    storageMethod('s', 'SET_ITEM', encryptKey6, insertBet); // coinsPlayerExtBet

    storageMethod('s', 'SET_ITEM', encryptKey8, insertBet); // coinsEnemyExtBet

    // 새로고침 을 위해 roundEnd seeeion 추가
    storageMethod('s', 'SET_ITEM',
      encryptKey1, // roundEnd
      X.enc(decodeTF(_t([99, 109, 114, 97]))) // "cmra" : true
    );
    switch (_result) {
      case 'win':
        // storageMethod('s', 'SET_ITEM', 'betUser', true);
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_1); // betUser, true
        // storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(COINS_PLAYER) + RESULT);
        const decryptVal4 = dec(encryptVal4); // coinsPlayer value number
        storageMethod('s', 'SET_ITEM', encryptKey4, enc(Number(decryptVal4) + RESULT)); // coinsPlayer
        break;
      case 'lose':
        // storageMethod('s', 'SET_ITEM', 'betUser', false);
        storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_2); // betUser, false
        storageMethod('s', 'SET_ITEM', encryptKey3, enc(Number(COINS_ENEMY) + RESULT)); // coinsEnemy
        break;
      case 'drew':
        break;
      default:
        console.log('error - getRoundEnd.js - savsSessionResult !_result');
        errorManagement({ errCase: 'errorComn' });
        break;
    }
    setTimeout(GET_ROUND_END.getWinnerCoin, timeInterval_1, _result);
  },
  getWinnerCoin: (_result) => {
    switch (_result) {
      case 'win':
        BattingZoneMovePlayerBlock(_result).then((_state) => {
          GET_ROUND_END.roundResultDisplay(_state);
          BettingZoneMoveComnCallRaise(_state).then((_stateNext) => {
            GET_ROUND_END.getWinnerCoinNext(_stateNext);
          });
        });
        break;
      case 'lose':
        BattingZoneMoveEnemyBlock(_result).then((_state) => {
          GET_ROUND_END.roundResultDisplay(_state);
          BettingZoneMoveComnCallRaise(_state).then((_stateNext) => {
            GET_ROUND_END.getWinnerCoinNext(_stateNext);
          });
        });
        break;
      case 'drew':
        GET_ROUND_END.getWinnerCoinNext(_result);
        break;
      default:
        console.log('error - getRoundEnd.js - getWinnerCoin !_result');
        errorManagement({ errCase: 'errorComn' });
        break;
    }
  },
  roundResultDisplay: (_result) => {
    const ENEMY_CARD = document.querySelector('.enemy-card');
    if (!ENEMY_CARD) return errorManagement({ errCase: 'elementLoss', message: 'roundResultDisplay 에서 .enemy-card 엘리먼트가 없습니다.' });
    const PLAYER_CARD = document.querySelector('.player-card');
    if (!PLAYER_CARD) return errorManagement({ errCase: 'elementLoss', message: 'roundResultDisplay 에서 .player-card 엘리먼트가 없습니다.' });
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: 'roundResultDisplay 에서 .betting-zone 엘리먼트가 없습니다.' });

    document.documentElement.style.setProperty('--round-result-height', `${BETTING_ZONE.clientHeight}px`);

    let txtArr = [];
    let resultEl = document.createElement('div');
    resultEl.classList.add('round-result');
    resultEl.classList.add(_result);
    switch (_result) {
      case 'win':
        txtArr = ['YOU', 'WIN', 'NEXT'];
        break;
      case 'lose':
        txtArr = ['YOU', 'LOSE', 'NEXT'];
        break;
      case 'drew':
        txtArr = ['WE', 'DREW', 'NEXT'];
        break;
      default:
        console.log('error - getRoundEnd.js - roundResultDisplay !_result');
        errorManagement({ errCase: 'errorComn' });
        break;
    }
    resultEl.innerHTML = txtArr[0];
    BETTING_ZONE.appendChild(resultEl);
    setTimeout(resultTxtInnerHtml, timeInterval_1000, resultEl, txtArr, 1);
    setTimeout(resultTxtInnerHtml, timeInterval_2000, resultEl, txtArr, 2);
    setTimeout(() => {
      resultEl.remove();
    }, timeInterval_3201);
    setTimeout(GET_ROUND_END.cardHideAnimation, timeInterval_3202, _result);
  },
  cardHideAnimation: (_result) => {
    const RES_STATE = ['win', 'lose', 'drew'];
    if (RES_STATE.filter((item) => _result === item).length) {
      cardHideAnimationComn();
      if (_result === 'drew') setTimeout(GET_ROUND_END.goNextRound, timeInterval_402, _result);
    }
  },
  goNextRound: (_result) => {
    const encryptCardNumbers = new Promise((resolve, reject) => {
      console.log('1 ************* ', _result);

      // if (window.sessionStorage.cardNum && JSON.parse(window.sessionStorage.cardNum).length > 0) {
      // sessionStorage cardNum key 찾기
      const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]); // cardNum
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      // if (decryptVal !== null && JSON.parse(decryptVal).length > 0) {
      if (decryptVal === null) {
        reject('한 set 종료(roundEnd) 후 cardNum key 세션 없음');
      } else {
        /*
        if (decryptVal === '') {
          // 20장 모두 소진 시 -
          // 새 카드 set 생성
          // *****************************************************************
          setTimeout(() => {
            console.log('3 ************* ');
            makeCard();
            // resolve(encryptCardNumber());
          }, timeInterval_1);
          // *****************************************************************
        } else {
          if (!_result) return;
          console.log('2 ************* ', _result);
          if (_result === 'drew') return STATE_PLAYING.drew();
          if (_result !== 'drew') {
            return indianPockerGameState.basicBet();
          }
        }
        */

        if (!_result) return;
        console.log('2 ************* ', _result);
        if (_result === 'drew') {
          return STATE_PLAYING.drew();
        }
        if (_result !== 'drew') {
          return indianPockerGameState.basicBet();
        }
        resolve();
      }
    });
    encryptCardNumbers
      /*
      .then((numArr) => {
        console.log('4 ************* ', _result);
        if (numArr) {
          if (!_result) return;
          console.log('5 ************* ', _result);
          // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(numArr));
          if (_result === 'drew') return STATE_PLAYING.drew();
          if (_result !== 'drew') {
            return indianPockerGameState.basicBet();
          }
        }
      })
      */
      .then(() => {
        console.log('4 ************* ', _result);
        if (!_result) return;
        console.log('5 ************* ', _result);
        if (_result === 'drew') return STATE_PLAYING.drew();
        if (_result !== 'drew') {
          return indianPockerGameState.basicBet();
        }
      })
      .catch((err) => {
        // request('opponentFouls', { message: err });
        errorManagement({ errCase: 'errorComn', message: 'error - getRoundEnd.js - encryptCardNumbers :: ' + err });
        return;
      });
  },
  getWinnerCoinNext: (_result) => {
    // 동점이 아닐 때
    if (_result === 'drew') return setTimeout(GET_ROUND_END.roundResultDisplay, timeInterval_202, _result, false);
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return errorManagement({ errCase: 'elementLoss', message: 'call | raise 결과에서 .bet-coins 엘리먼트가 없습니다' });
    const CPINS_ENEMY = document.querySelector('.coins-enemy');
    if (!CPINS_ENEMY) return errorManagement({ errCase: 'elementLoss', message: 'call | raise 결과에서 .coins-enemy 엘리먼트가 없습니다' });
    const ENEMY_COINS = CPINS_ENEMY.querySelectorAll('li');
    const CPINS_PLAYER = document.querySelector('.coins-player');
    if (!CPINS_PLAYER) return errorManagement({ errCase: 'elementLoss', message: 'call | raise 결과에서 .coins-player 엘리먼트가 없습니다' });
    const PLAYER_COINS = CPINS_PLAYER.querySelectorAll('li');

    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    // if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsPlayer 세션이 없습니다' });
    // const PNUM = Number(COINS_PLAYER);
    const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    if (encryptVal1 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsPlayer 세션이 없습니다' });
    const decryptVal1 = dec(encryptVal1); // coinsPlayer value number

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    // if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsEnemy 세션이 없습니다' });
    // const ENUM = Number(COINS_ENEMY);
    const encryptKey2 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    if (encryptVal2 === null) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsEnemy 세션이 없습니다' });
    const decryptVal2 = dec(encryptVal2); // coinsEnemy value number

    /*
    for (let i = 0; i < PLAYER_COINS.length; i++) PLAYER_COINS[i].remove();
    for (let j = 0; j < PNUM; j++) CPINS_PLAYER.appendChild(document.createElement('li'));
    for (let k = 0; k < ENEMY_COINS.length; k++) ENEMY_COINS[k].remove();
    for (let l = 0; l < ENUM; l++) CPINS_ENEMY.appendChild(document.createElement('li'));
    */
    BET_COINS.remove();
    storageMethod('s', 'SET_ITEM', 'betCoin', []);
    storageMethod('s', 'SET_ITEM', 'betCoinPos', []);

    // storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
    storageMethod('s', 'SET_ITEM',
      findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
      X.enc(decodeTF(_t([100, 111, 98, 105, 110]))) // "dobin" : false
    );
    // storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
    const encryptKey3 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
    const encryptVal3 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
    storageMethod('s', 'SET_ITEM', encryptKey3, encryptVal3);
    setTimeout(GET_ROUND_END.goNextRound, timeInterval_402, _result);
  },
};
