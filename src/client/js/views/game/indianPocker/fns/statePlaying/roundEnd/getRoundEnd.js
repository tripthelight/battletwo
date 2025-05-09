import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_202, timeInterval_3201, timeInterval_3202, timeInterval_401, timeInterval_402 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import disabledMoveCoins from '@/client/js/views/game/indianPocker/fns/common/disabledMoveCoins';
import playerNumRes from '@/client/js/views/game/indianPocker/fns/common/playerNumRes';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import flipPlayerCardComn from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCardComn';
import flipPlayerCard from '@/client/js/views/game/indianPocker/fns/common/flipPlayerCard';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum';
import BattingZoneMovePlayerBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMovePlayerBlock';
import BettingZoneMoveComnCallRaise from '@/client/js/views/game/indianPocker/fns/common/BettingZoneMoveComnCallRaise';
import BattingZoneMoveEnemyBlock from '@/client/js/views/game/indianPocker/fns/common/BattingZoneMoveEnemyBlock';
import cardHideAnimationComn from '@/client/js/views/game/indianPocker/fns/common/cardHideAnimationComn';
import { STATE_PLAYING } from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/init';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import resultTxtInnerHtml from '@/client/js/views/game/indianPocker/fns/common/resultTxtInnerHtml';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber.js';

export const GET_ROUND_END = {
  receiveRoundEnd: () => {
    window.sessionStorage.setItem('betResulting', true); // refresh check
    window.sessionStorage.removeItem('drewFlipCardMode');
    window.sessionStorage.removeItem('drewReady');
    window.sessionStorage.removeItem('dropState');
    if (window.sessionStorage.drewCardReady) {
      LOADING_EVENT.hide();
      window.sessionStorage.removeItem('drewCardReady');
    }
    setTimeout(GET_ROUND_END.stopBetUser, timeInterval_1);
  },
  stopBetUser: () => {
    const PLAYER_BLOCK = document.querySelector('.player-block');
    if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn' });
    PLAYER_BLOCK.classList.remove('active');
    PLAYER_BLOCK.classList.add('disabled');
    const COINS_PLAYER = PLAYER_BLOCK.querySelector('.coins-player');
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn' });
    COINS_PLAYER.classList.remove('active');
    COINS_PLAYER.classList.add('disabled');
    // disabled enemy block
    const ENEMY_BLOCK = document.querySelector('.enemy-block');
    if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn' });
    ENEMY_BLOCK.classList.remove('active');
    ENEMY_BLOCK.classList.add('disabled');
    const COINS_ENEMY = ENEMY_BLOCK.querySelector('.coins-enemy');
    if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn' });
    COINS_ENEMY.classList.remove('active');
    COINS_ENEMY.classList.add('disabled');
    const ENEMY_CARD = ENEMY_BLOCK.querySelector('.enemy-card');
    if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn' });
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
    const P_NUM_RES = playerNumRes();
    flipPlayerCardComn(flipPlayerCard, P_NUM_RES);
    setTimeout(GET_ROUND_END.cardNumCompare, timeInterval_401, P_NUM_RES);
  },
  cardNumCompare: (_playerNumRes) => {
    const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
    if (!BATTLE_CARD_NUM) return errorManagement({ errCase: 'errorComn' });
    const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
    if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length <= 0) return errorManagement({ errCase: 'errorComn' });
    let enemyNumRes = playerNum(BATTLE_CARD_ARR, 'enemy');
    let result = '';
    if (Number(_playerNumRes) > Number(enemyNumRes)) {
      result = 'win';
      window.sessionStorage.removeItem('drewState');
    } else if (Number(_playerNumRes) < Number(enemyNumRes)) {
      result = 'lose';
      window.sessionStorage.removeItem('drewState');
    } else if (Number(_playerNumRes) == Number(enemyNumRes)) {
      result = 'drew';
      window.sessionStorage.setItem('betUser', window.sessionStorage.betUserFirst);
      window.sessionStorage.setItem('drewState', true);
      window.sessionStorage.setItem('roundEnd', false);
      window.sessionStorage.setItem('extFirstBet', false);
    } else {
      errorManagement({ errCase: 'errorComn' });
    }
    setTimeout(GET_ROUND_END.savsSessionResult, timeInterval_1, result);
  },
  savsSessionResult: (_result) => {
    const BET_USER = window.sessionStorage.betUser;
    if (!BET_USER) return errorManagement({ errCase: 'errorComn' });
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn' });
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn' });
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    if (!COINS_PLAYER_BET) return errorManagement({ errCase: 'errorComn' });
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    if (!COINS_ENEMY_BET) return errorManagement({ errCase: 'errorComn' });
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    if (!COINS_PLAYER_EXT_BET) return errorManagement({ errCase: 'errorComn' });
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    if (!COINS_ENEMY_EXT_BET) return errorManagement({ errCase: 'errorComn' });
    const PNUM = Number(COINS_PLAYER_BET);
    const ENUM = Number(COINS_ENEMY_BET);
    const RESULT = Number(PNUM) + Number(ENUM);
    if (_result !== 'drew') window.sessionStorage.setItem('coinsPlayerBet', 0);
    if (_result !== 'drew') window.sessionStorage.setItem('coinsEnemyBet', 0);
    window.sessionStorage.setItem('coinsPlayerExtBet', 0);
    window.sessionStorage.setItem('coinsEnemyExtBet', 0);
    // 새로고침 을 위해 roundEnd seeeion 추가
    window.sessionStorage.setItem('roundEnd', true);
    switch (_result) {
      case 'win':
        window.sessionStorage.setItem('betUser', true);
        window.sessionStorage.setItem('coinsPlayer', Number(COINS_PLAYER) + RESULT);
        break;
      case 'lose':
        window.sessionStorage.setItem('betUser', false);
        window.sessionStorage.setItem('coinsEnemy', Number(COINS_ENEMY) + RESULT);
        break;
      case 'drew':
        break;
      default:
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
        errorManagement({ errCase: 'errorComn' });
        break;
    }
  },
  roundResultDisplay: (_result) => {
    const ENEMY_CARD = document.querySelector('.enemy-card');
    if (!ENEMY_CARD) return errorManagement({ errCase: 'errorComn', message: 'roundResultDisplay 에서 .enemy-card 엘리먼트가 없습니다.' });
    const PLAYER_CARD = document.querySelector('.player-card');
    if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: 'roundResultDisplay 에서 .player-card 엘리먼트가 없습니다.' });
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: 'roundResultDisplay 에서 .betting-zone 엘리먼트가 없습니다.' });
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
    let encryptCardNumbers = new Promise((resolve, reject) => {
      if (window.sessionStorage.cardNum && JSON.parse(window.sessionStorage.cardNum).length > 0) {
        if (_result === 'drew') return STATE_PLAYING.drew();
        if (_result !== 'drew') return indianPockerGameState.basicBet();
      } else {
        setTimeout(() => {
          resolve(encryptCardNumber());
        }, timeInterval_1);
      }
    });
    encryptCardNumbers
      .then((numArr) => {
        window.sessionStorage.setItem('cardNum', JSON.stringify(numArr));
        if (_result === 'drew') STATE_PLAYING.drew();
        if (_result !== 'drew') indianPockerGameState.basicBet();
      })
      .catch((err) => {
        errorManagement({ errCase: 'errorComn' });
      });
  },
  getWinnerCoinNext: (_result) => {
    // 동점이 아닐 때
    if (_result === 'drew') return setTimeout(GET_ROUND_END.roundResultDisplay, timeInterval_202, _result, false);
    const BET_COINS = document.querySelector('.bet-coins');
    if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: 'call | raise 결과에서 .bet-coins 엘리먼트가 없습니다' });
    const CPINS_ENEMY = document.querySelector('.coins-enemy');
    if (!CPINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: 'call | raise 결과에서 .coins-enemy 엘리먼트가 없습니다' });
    const ENEMY_COINS = CPINS_ENEMY.querySelectorAll('li');
    const CPINS_PLAYER = document.querySelector('.coins-player');
    if (!CPINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'call | raise 결과에서 .coins-player 엘리먼트가 없습니다' });
    const PLAYER_COINS = CPINS_PLAYER.querySelectorAll('li');
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'call | raise 결과에서 coinsPlayer 세션이 없습니다' });
    const PNUM = Number(COINS_PLAYER);
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: 'call | raise 결과에서 coinsEnemy 세션이 없습니다' });
    const ENUM = Number(COINS_ENEMY);
    for (let i = 0; i < PLAYER_COINS.length; i++) PLAYER_COINS[i].remove();
    for (let j = 0; j < PNUM; j++) CPINS_PLAYER.appendChild(document.createElement('li'));
    for (let k = 0; k < ENEMY_COINS.length; k++) ENEMY_COINS[k].remove();
    for (let l = 0; l < ENUM; l++) CPINS_ENEMY.appendChild(document.createElement('li'));
    BET_COINS.remove();
    window.sessionStorage.setItem('betCoin', []);
    window.sessionStorage.setItem('betCoinPos', []);
    window.sessionStorage.setItem('basicBettingState', false);
    setTimeout(GET_ROUND_END.goNextRound, timeInterval_402, _result);
  },
};
