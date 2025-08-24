import findCharCode from '@/client/js/functions/findCharCode';
import { enc } from '@/client/js/module/crypts/obf8lower';
import storageMethod from '@/client/js/module/storage/storageMethod';
import deviceStateStore from '@/client/store/deviceStateStore';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import touchCoinState from '@/client/js/views/game/indianPocker/fns/common/touchCoinState';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';

export default (e) => {
  if (!touchCoinState(e.target)) return;
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return;
  const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return;
  BET_COIN_ARR[reactiveState.mTargetIdx].translateX = reactiveState.mmX;
  BET_COIN_ARR[reactiveState.mTargetIdx].translateY = reactiveState.mmY;
  storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(BET_COIN_ARR));

  const onTransitionEnd = () => {
    e.target.style.removeProperty('transition');
    e.target.removeEventListener('transitionend', onTransitionEnd);
  };
  // 상대 플레이어 자리에 있을 경우
  if (reactiveState.mmY < 0 - e.target.clientHeight / 2) {
    e.target.style.transition = 'transform .2s ease-in';
    e.target.style.transform = 'translate(' + reactiveState.mtX + 'px, ' + reactiveState.mtY + 'px)';
    e.target.addEventListener('transitionend', onTransitionEnd);

    BET_COIN_ARR[reactiveState.mTargetIdx].translateX = reactiveState.mtX;
    BET_COIN_ARR[reactiveState.mTargetIdx].translateY = reactiveState.mtY;
    storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(BET_COIN_ARR));
  }

  // touch end 했는데 배팅존에 머무를 경우 여기까지 탐

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트를 찾을 수 없습니다.' });
  const BET_COINS = document.querySelector('.bet-coins');
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.bet-coins 엘리먼트를 찾을 수 없습니다.' });
  const BET_COINS_LI = BET_COINS.querySelectorAll('li');
  if (!BET_COINS_LI || BET_COINS_LI.length <= 0) return;
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '.coins-player 엘리먼트를 찾을 수 없습니다.' });
  const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll('li');
  if (!PLAYER_BLOCK.classList.contains('over')) return;

  const POS = window.sessionStorage.betCoinPos;
  const POS_ARR = JSON.parse(POS);
  if (!POS_ARR || POS_ARR.length <= 0) return;
  POS_ARR.splice(reactiveState.mTargetIdx, 1);
  storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(POS_ARR));

  const BET = window.sessionStorage.betCoin;
  const BET_ARR = JSON.parse(BET);
  if (!BET_ARR || BET_ARR.length <= 0) return;
  BET_ARR.splice(reactiveState.mTargetIdx, 1);
  storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(BET_ARR));

  BET_COINS_LI[reactiveState.mTargetIdx].remove();
  const LI = document.createElement('li');
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState === 'pc') LI.setAttribute('draggable', true);

  // S: betting-zone에서  player-block으로 뺀 코인에 시계 그리기
  const hasH = LI.querySelector('.h');
  const hasM = LI.querySelector('.m');
  if (!hasH && !hasM) {
    let minuteEl = document.createElement('span');
    let hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    LI.appendChild(minuteEl);
    LI.appendChild(hourEl);
    posClock(hourEl, minuteEl);
    animateClock(hourEl, minuteEl, false);
  }
  // E: betting-zone에서  player-block으로 뺀 코인에 시계 그리기

  COINS_PLAYER.appendChild(LI);
  LI.style.animationDelay = COINS_PLAYER.length * 0.1 + 's';

  // 칩 빼기
  // const PLAYER_COINS = window.sessionStorage.coinsPlayer;
  // if (!PLAYER_COINS) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayer 세션을 찾을 수 없습니다.' });
  const encryptKey3 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
  if (encryptVal3 === null) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayer 세션을 찾을 수 없습니다.' });

  // const PLAYER_COINS_NUM = Number(PLAYER_COINS);
  const decryptVal3 = dec(encryptVal3); // coinsPlayer value number

  // storageMethod('s', 'SET_ITEM', 'coinsPlayer', PLAYER_COINS_NUM + 1);
  storageMethod('s', 'SET_ITEM', 'coinsPlayer', enc(decryptVal3 + 1));

  const PLAYER_COINS_BET = window.sessionStorage.coinsPlayerBet;
  if (!PLAYER_COINS_BET) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayerBet 세션을 찾을 수 없습니다.' });
  const PLAYER_COINS_BET_NUM = Number(PLAYER_COINS_BET);
  storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', PLAYER_COINS_BET_NUM - 1);

  console.log('모바일 칩빼기 >>>>>>>>>>> ');

  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // if (window.sessionStorage.betState === 'extraBetting') {
  if (encryptVal1 === 'extraBetting') {
    if (window.sessionStorage.coinsPlayerExtBet) {
      if (Number(window.sessionStorage.coinsPlayerExtBet) > 0) {
        storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) - 1);
      }
    }
  }

  PLAYER_BLOCK.classList.remove('over');
  reactiveState.mTargetIdx = 0;
  reactiveState.mtX = 0;
  reactiveState.mtY = 0;
  reactiveState.selectX = 0;
  reactiveState.selectY = 0;
  reactiveState.mmX = 0;
  reactiveState.mmY = 0;

  moveCoins();
  BTN_STATE.CHANGE();
};
