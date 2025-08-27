import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import X from '@/client/js/module/crypts/bool-obf';
import storageMethod from '@/client/js/module/storage/storageMethod';
import deviceStateStore from '@/client/store/deviceStateStore';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';

export default (event) => {
  event.preventDefault();

  // if (window.sessionStorage.dropState === 'true') return;
  const encryptKey1 = findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]); // dropState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // dropState === true
  if (
    encryptVal1 !== null &&
    encryptVal1 !== '' &&
    X.dec(encryptVal1)
  ) return;

  const POS = window.sessionStorage.betCoinPos;
  if (!POS) return;
  const POS_ARR = JSON.parse(POS);
  if (!POS_ARR || POS_ARR.length <= 0) return;
  POS_ARR.splice(reactiveState.mTargetIdx, 1);
  storageMethod('s', 'SET_ITEM', 'betCoinPos', JSON.stringify(POS_ARR));

  const BET = window.sessionStorage.betCoin;
  const BET_ARR = JSON.parse(BET);
  if (!BET_ARR || BET_ARR.length <= 0) return;
  BET_ARR.splice(reactiveState.mTargetIdx, 1);
  storageMethod('s', 'SET_ITEM', 'betCoin', JSON.stringify(BET_ARR));

  const BET_COINS = document.querySelector('.bet-coins');
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.bet-coins 엘리먼트를 찾을 수 없습니다.' });
  const BET_COINS_LI = BET_COINS.querySelectorAll('li');
  if (!BET_COINS_LI || BET_COINS_LI.length <= 0) return;

  if (!BET_COINS_LI[reactiveState.mTargetIdx]) return;
  BET_COINS_LI[reactiveState.mTargetIdx].remove();
  // LI : betting-zone에 넣었다 player-block으로 뺀 코인
  const LI = document.createElement('li');
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState === 'pc') LI.setAttribute('draggable', true);

  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '.coins-player 엘리먼트를 찾을 수 없습니다.' });

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
  // const PLAYER_COINS_NUM = Number(PLAYER_COINS);
  // storageMethod('s', 'SET_ITEM', 'coinsPlayer', PLAYER_COINS_NUM + 1);
  const encryptKey4 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]);  // coinsPlayer
  const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
  if (encryptVal4 === null) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayer 세션을 찾을 수 없습니다.' });
  storageMethod('s', 'SET_ITEM',
    encryptKey4,
    enc(dec(encryptVal4) + encryptNumOfStr(new TextDecoder().decode(new Uint8Array([101, 101, 119, 114])))) // 'eewr' : 0001
  );

  // const PLAYER_COINS_BET = window.sessionStorage.coinsPlayerBet;
  // if (!PLAYER_COINS_BET) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayerBet 세션을 찾을 수 없습니다.' });
  // const PLAYER_COINS_BET_NUM = Number(PLAYER_COINS_BET);
  // storageMethod('s', 'SET_ITEM', 'coinsPlayerBet', PLAYER_COINS_BET_NUM - 1);
  const encryptKey5 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]);  // coinsPlayerBet
  const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
  if (encryptVal5 === null) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayerBet 세션을 찾을 수 없습니다.' });
  storageMethod('s', 'SET_ITEM',
    encryptKey5,
    enc(dec(encryptVal5) - encryptNumOfStr(new TextDecoder().decode(new Uint8Array([119, 119, 119, 98])))) // 'wwwb' : 0001
  );

  const encryptKey6 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptVal6 = window.sessionStorage.getItem(encryptKey6);

  // if (window.sessionStorage.betState === 'extraBetting') {
  if (encryptVal6 === 'extraBetting') {
    if (window.sessionStorage.coinsPlayerExtBet) {
      if (Number(window.sessionStorage.coinsPlayerExtBet) > 0) {
        storageMethod('s', 'SET_ITEM', 'coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) - 1);
      }
    }
  }

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트를 찾을 수 없습니다.' });

  PLAYER_BLOCK.classList.remove('over');

  moveCoins();
  BTN_STATE.CHANGE();
};
