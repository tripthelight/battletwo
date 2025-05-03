import deviceStateStore from '@/client/store/deviceStateStore';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { mTargetIdx } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import moveCoins from '@/client/js/views/game/indianPocker/fns/common/moveCoins';
import { BTN_STATE } from '@/client/js/views/game/indianPocker/fns/rule/btnState';

export default (event) => {
  event.preventDefault();
  if (window.sessionStorage.dropState === 'true') return;
  const POS = window.sessionStorage.betCoinPos;
  if (!POS) return;
  const POS_ARR = JSON.parse(POS);
  if (!POS_ARR || POS_ARR.length <= 0) return;
  POS_ARR.splice(mTargetIdx, 1);
  window.sessionStorage.setItem('betCoinPos', JSON.stringify(POS_ARR));

  const BET = window.sessionStorage.betCoin;
  const BET_ARR = JSON.parse(BET);
  if (!BET_ARR || BET_ARR.length <= 0) return;
  BET_ARR.splice(mTargetIdx, 1);
  window.sessionStorage.setItem('betCoin', JSON.stringify(BET_ARR));

  const BET_COINS = document.querySelector('.bet-coins');
  if (!BET_COINS) return errorManagement({ errCase: 'errorComn', message: '.bet-coins 엘리먼트를 찾을 수 없습니다.' });
  const BET_COINS_LI = BET_COINS.querySelectorAll('li');
  if (!BET_COINS_LI || BET_COINS_LI.length <= 0) return;

  if (!BET_COINS_LI[mTargetIdx]) return;
  BET_COINS_LI[mTargetIdx].remove();
  const LI = document.createElement('li');
  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;
  if (deviceState == 'pc') LI.setAttribute('draggable', true);

  const COINS_PLAYER = document.querySelector('.coins-player');
  if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: '.coins-player 엘리먼트를 찾을 수 없습니다.' });
  COINS_PLAYER.appendChild(LI);
  LI.style.animationDelay = COINS_PLAYER.length * 0.1 + 's';

  // 칩 빼기
  const PLAYER_COINS = window.sessionStorage.coinsPlayer;
  if (!PLAYER_COINS) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayer 세션을 찾을 수 없습니다.' });
  const PLAYER_COINS_NUM = Number(PLAYER_COINS);
  window.sessionStorage.setItem('coinsPlayer', PLAYER_COINS_NUM + 1);
  const PLAYER_COINS_BET = window.sessionStorage.coinsPlayerBet;
  if (!PLAYER_COINS_BET) return errorManagement({ errCase: 'errorComn', message: 'coinsPlayerBet 세션을 찾을 수 없습니다.' });
  const PLAYER_COINS_BET_NUM = Number(PLAYER_COINS_BET);
  window.sessionStorage.setItem('coinsPlayerBet', PLAYER_COINS_BET_NUM - 1);

  if (window.sessionStorage.betState === 'extraBetting') {
    if (window.sessionStorage.coinsPlayerExtBet) {
      if (Number(window.sessionStorage.coinsPlayerExtBet) > 0) window.sessionStorage.setItem('coinsPlayerExtBet', Number(window.sessionStorage.coinsPlayerExtBet) - 1);
    }
  }

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트를 찾을 수 없습니다.' });

  PLAYER_BLOCK.classList.remove('over');

  setTimeout(moveCoins, timeInterval_1);
  setTimeout(BTN_STATE.CHANGE, timeInterval_1);
};
