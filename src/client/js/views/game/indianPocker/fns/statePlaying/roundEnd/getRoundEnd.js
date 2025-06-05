import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_202, timeInterval_3201, timeInterval_3202, timeInterval_401, timeInterval_402 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import findCharCode from '@/client/js/functions/findCharCode';
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
    storageMethod('s', 'REMOVE_ITEM', 'drewReady');
    storageMethod('s', 'REMOVE_ITEM', 'dropState');
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
    if (window.sessionStorage.drewState && window.sessionStorage.drewState === 'true') LOADING_EVENT.hide();
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

    let result = '';
    if (Number(cardNum.player) > Number(cardNum.enemy)) {
      result = 'win';
      storageMethod('s', 'REMOVE_ITEM', 'drewState');
    } else if (Number(cardNum.player) < Number(cardNum.enemy)) {
      result = 'lose';
      storageMethod('s', 'REMOVE_ITEM', 'drewState');
    } else if (Number(cardNum.player) === Number(cardNum.enemy)) {
      result = 'drew';
      storageMethod('s', 'SET_ITEM', 'betUser', window.sessionStorage.betUserFirst);
      storageMethod('s', 'SET_ITEM', 'drewState', true);
      storageMethod('s', 'SET_ITEM', 'roundEnd', false);
      storageMethod('s', 'SET_ITEM', 'extFirstBet', false);
    } else {
      console.log('error - getRoundEnd.js - cardNumCompare !result');
      errorManagement({ errCase: 'errorComn' });
    }

    // 내 카드 확인 완료 했으니 storage 에서 제거
    storageMethod('s', 'REMOVE_ITEM', 'playCardNum');

    setTimeout(GET_ROUND_END.savsSessionResult, timeInterval_1, result);
  },
  savsSessionResult: (_result) => {
    const BET_USER = window.sessionStorage.betUser;
    if (!BET_USER) {
      console.log('error - getRoundEnd.js - !BET_USER');
      errorManagement({ errCase: 'errorComn' });
    }
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER');
      errorManagement({ errCase: 'errorComn' });
    }
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY');
      errorManagement({ errCase: 'errorComn' });
    }
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    if (!COINS_PLAYER_BET) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    if (!COINS_ENEMY_BET) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    /*
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    if (!COINS_PLAYER_EXT_BET) {
      console.log('error - getRoundEnd.js - !COINS_PLAYER_EXT_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    if (!COINS_ENEMY_EXT_BET) {
      console.log('error - getRoundEnd.js - !COINS_ENEMY_EXT_BET');
      errorManagement({ errCase: 'errorComn' });
    }
    */
    const PNUM = Number(COINS_PLAYER_BET);
    const ENUM = Number(COINS_ENEMY_BET);
    const RESULT = Number(PNUM) + Number(ENUM);
    if (_result !== 'drew') storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', 0);
    if (_result !== 'drew') storageMethod('s', 'SET_ITEM', 'coinsEnemyBet', 0);
    storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', 0);
    storageMethod('s', 'SET_ITEM', 'coinsEnemyExtBet', 0);
    // 새로고침 을 위해 roundEnd seeeion 추가
    storageMethod('s', 'SET_ITEM', 'roundEnd', true);
    switch (_result) {
      case 'win':
        storageMethod('s', 'SET_ITEM', 'betUser', true);
        storageMethod('s', 'SET_ITEM', 'coinsPlayer', Number(COINS_PLAYER) + RESULT);
        break;
      case 'lose':
        storageMethod('s', 'SET_ITEM', 'betUser', false);
        storageMethod('s', 'SET_ITEM', 'coinsEnemy', Number(COINS_ENEMY) + RESULT);
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
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsPlayer 세션이 없습니다' });
    const PNUM = Number(COINS_PLAYER);
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) return errorManagement({ errCase: 'sessionStorageLoss', message: 'call | raise 결과에서 coinsEnemy 세션이 없습니다' });
    const ENUM = Number(COINS_ENEMY);
    /*
    for (let i = 0; i < PLAYER_COINS.length; i++) PLAYER_COINS[i].remove();
    for (let j = 0; j < PNUM; j++) CPINS_PLAYER.appendChild(document.createElement('li'));
    for (let k = 0; k < ENEMY_COINS.length; k++) ENEMY_COINS[k].remove();
    for (let l = 0; l < ENUM; l++) CPINS_ENEMY.appendChild(document.createElement('li'));
    */
    BET_COINS.remove();
    storageMethod('s', 'SET_ITEM', 'betCoin', []);
    storageMethod('s', 'SET_ITEM', 'betCoinPos', []);
    storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
    storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
    setTimeout(GET_ROUND_END.goNextRound, timeInterval_402, _result);
  },
};
