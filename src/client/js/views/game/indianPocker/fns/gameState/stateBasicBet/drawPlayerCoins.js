import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import deviceStateStore from '@/client/store/deviceStateStore';
import gameResultCheck from '@/client/js/views/game/indianPocker/fns/common/gameResultCheck';
import gameEnd from '@/client/js/views/game/indianPocker/fns/common/gameEnd';
import bettingCoin from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/bettingCoin';
import drawBetInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawBetInfo';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import REFRESH_STATE_BASIC_BET from '@/client/js/refresh/indianpoker/refreshBasicBet/refreshInit';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import removeUserCoins from '@/client/js/views/game/indianPocker/fns/common/removeUserCoins';

export default () => {
  // 기본 배팅 후 여기를 탐
  if (gameResultCheck()) return gameEnd();
  // element | seeeion 체크
  const COINS_PLAYER = document.querySelector('.coins-player');
  // if (COINS_PLAYER) return bettingCoin();
  // player 코인 모두 제거
  if (COINS_PLAYER) removeUserCoins(COINS_PLAYER);
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;

  // const BASIC_BETTING_STATE = window.sessionStorage.basicBettingState;
  // if (!BASIC_BETTING_STATE) return errorManagement({ errCase: 'errorComn', message: 'basicBettingState not found' });
  // const BASIC_BETTING_RES = BASIC_BETTING_STATE === 'true' ? true : false;
  const encryptKey1 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) return errorManagement({ errCase: 'errorComn', message: 'basicBettingState not found' });

  // 명령
  const elem = COINS_PLAYER ? COINS_PLAYER : document.createElement('ul');
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
  elem.classList.add('coins');
  elem.classList.add('coins-player');
  // const coinCount = dec(window.sessionStorage.getItem('coinsPlayer'));

  const encryptKey2 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const decryptVal2 = dec(encryptVal2); // coinsPlayer value number

  console.log('coinCount PLAYER ============ > ', decryptVal2);

  // for (let i = 0; i < coinCount; i++) {
  for (let i = 0; i < Number(decryptVal2); i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
    if (deviceState === 'pc') liEl.setAttribute('draggable', true);
    elem.appendChild(liEl);
    // 시, 분 animate()
    // animateClock(hourEl, minuteEl);
    // BASIC_BETTING_RES ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
    X.dec(encryptVal1) ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
  }
  PLAYER_BLOCK.appendChild(elem);

  // 다음 함수 실행
  // 둘 중의 한명의 칩 개수가 0개면 game over
  if (gameResultCheck()) return gameEnd();
  drawBetInfo();
  REFRESH_STATE_BASIC_BET.main();
  bettingCoin();
};
