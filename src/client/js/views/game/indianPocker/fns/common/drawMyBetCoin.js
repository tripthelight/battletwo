import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import saveBetCoinSession from '@/client/js/views/game/indianPocker/fns/common/saveBetCoinSession';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';

export default () => {
  const PLAYER_COIN_UL = document.querySelector('ul.coins-player');
  if (!PLAYER_COIN_UL) return;
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return;
  const BET_COINS = document.querySelector('.bet-coins');
  const BET_COIN_SESSION = window.sessionStorage.betCoin;
  if (!BET_COIN_SESSION) return;
  const BET_COIN_LIST = JSON.parse(BET_COIN_SESSION);

  // const GAME_STATE = window.sessionStorage.gameState;
  // if (!GAME_STATE) errorManagement({ errCase: 'errorComn', message: 'gameState not found' });
  // gameState: sessionStorage.getItem('gameState'),
  const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (decryptVal === null || (decryptVal !== null && decryptVal === '')) throw throwObj('sessionStorageLoss', 'drawMyBetCoin - gameState sessionStorage failed.');

  // 명령
  // basicBet
  const encryptVal1 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]);
  // playing
  const encryptVal2 = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]);
  let elemLi;
  let x = 0;
  let y = 0;

  let minuteEl = document.createElement('span');
  let hourEl = document.createElement('span');
  minuteEl.classList.add('m');
  hourEl.classList.add('h');

  // if (GAME_STATE === 'basicBet') {
  if (decryptVal === encryptVal1) {
    const COIN_POS = BET_COINS ? BET_COIN_LIST.filter((item) => item.host === 'enemy') : BET_COIN_LIST.filter((item) => item.host === 'player');
    minuteEl.style.transform = `translate(-50%, -96%) rotate(${COIN_POS[0].tm}deg)`;
    hourEl.style.transform = `translate(-50%, -86%) rotate(${COIN_POS[0].th}deg)`;
  }
  // if (GAME_STATE === 'playing') {
  if (decryptVal === encryptVal2) {
    const COIN_POS = BET_COIN_LIST.filter((item) => item.host === 'player');
    const COINS_POS = COIN_POS[COIN_POS.length - 1];
    minuteEl.style.transform = `translate(-50%, -96%) rotate(${COINS_POS.tm}deg)`;
    hourEl.style.transform = `translate(-50%, -86%) rotate(${COINS_POS.th}deg)`;
    animateClock(hourEl, minuteEl, false);
  }

  if (BET_COINS) {
    // console.log("ASDF >>>> ");
    // 추가 배팅 | ENEMY 기본배팅 후 PLAYER 기본배팅 ===============
    const BET_COINS_LIST = BET_COINS.querySelectorAll('li');
    if (BET_COINS_LIST.length === BET_COIN_LIST.length) return;
    for (let i = 0; i < BET_COIN_LIST.length; i++) {
      elemLi = document.createElement('li');
      if (i === BET_COIN_LIST.length - 1 && BET_COIN_LIST[i].host === 'player') {
        elemLi.appendChild(minuteEl);
        elemLi.appendChild(hourEl);
        x = BET_COIN_LIST[i].offsetLeft + BET_COIN_LIST[i].translateX;
        y = BETTING_ZONE.clientHeight - Math.abs(BET_COIN_LIST[i].translateY) + BET_COIN_LIST[i].offsetTop;
        elemLi.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        BET_COINS.appendChild(elemLi);
        saveBetCoinSession('player', x, y);
      }
    }
  } else {
    // PLAYER 기본 배팅 ===========================================
    // player의 기본 배팅이 끝난 후 배팅존에 코인을 여기서 그림
    let elem = document.createElement('ul');
    elem.classList.add('bet-coins');
    for (let i = 0; i < BET_COIN_LIST.length; i++) {
      elemLi = document.createElement('li');
      elemLi.appendChild(minuteEl);
      elemLi.appendChild(hourEl);
      elem.appendChild(elemLi);
      x = BET_COIN_LIST[i].offsetLeft + BET_COIN_LIST[i].translateX;
      y = BETTING_ZONE.clientHeight - Math.abs(BET_COIN_LIST[i].translateY) + BET_COIN_LIST[i].offsetTop;
      elemLi.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
      elem.appendChild(elemLi);
    }
    saveBetCoinSession('player', x, y);
    BETTING_ZONE.appendChild(elem);
  }
};
