import throwObj from '@/client/js/module/errorHandler/throwObj';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import findCharCode from '@/client/js/functions/findCharCode';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import drawMyBetCoin from '@/client/js/views/game/indianPocker/fns/common/drawMyBetCoin';

/**
 * 배팅 후 coins-player의 코인(li) 그리는 단계
 */
export default (_data) => {
  if (Number(_data.coinsPlayer) < 0) return;
  const PLAYER_COIN_UL = document.querySelector('ul.coins-player');
  if (!PLAYER_COIN_UL) return;
  const COINS = PLAYER_COIN_UL.querySelectorAll('li');

  // const GAME_STATE = window.sessionStorage.gameState;
  // if (!GAME_STATE) return errorManagement({ errCase: 'errorComn', message: 'gameState not found' });
  const encryptVal1 = findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]); // basicBet
  const encryptVal2 = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]); // playing
  const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser

  // gameState: sessionStorage.getItem('gameState'),
  const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (decryptVal === null || (decryptVal !== null && decryptVal === '')) throw throwObj('sessionStorageLoss', 'removeMyBetCoin - gameState sessionStorage failed.');
  // const BET_USER = window.sessionStorage.betUser;
  // if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser not found 1' });
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3); // betUser
  // if (!encryptVal3) return errorManagement({ errCase: 'errorComn', message: 'betUser not found 1' });
  if (encryptVal3 === null || (encryptVal3 !== null && encryptVal3 === '')) throw throwObj('sessionStorageLoss', 'removeMyBetCoin - betUser sessionStorage failed.');
  // const BET_STATE = BET_USER === 'true' ? true : false;
  // const BET_STATE = BET_USER === 'true' ? true : false;

  const BET_COIN = window.sessionStorage.betCoin;
  const BET_COIN_ARR = JSON.parse(BET_COIN);

  // player 코인을 지우기 전 시간 deg 저장 array 변수 선언
  let timeDegArr = [];

  for (let i = 0; i < COINS.length; i++) {
    if (i === _data.index) {
    } else {
      timeDegArr.push([getTranslateMH(COINS[i]).m, getTranslateMH(COINS[i]).h]);
    }
    COINS[i].remove();
  }

  const playerCoins = Number(_data.coinsPlayer);

  if (timeDegArr.length !== playerCoins) {
    // coinsPlayer sessionStorage value를 조작했거나,
    // ul.coins-player > li 개수 조작
    throw throwObj('sessionStorageLoss', 'removeMyBetCoin - coins length element or storage value failed.');
  };

  // 배팅존에 코인 넣고 player block 코인 다시 그리기
  console.log('playing 단계에서 기본배팅 타냐 ??? ');
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
  for (let i = 0; i < playerCoins; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    // if (GAME_STATE === 'basicBet') {
    if (decryptVal === encryptVal1) {
      // 기본배팅일 경우 -> gameState : basicBet
      // 기본 배팅이 끝나면 시간이 멈춰야 됨
      if (!timeDegArr[i]) {
        throw throwObj('elementLoss', 'removeMyBetCoin - coins length element failed.');
      };
      minuteEl.style.transform = `translate(-50%, -96%) rotate(${timeDegArr[i][0]}deg)`;
      hourEl.style.transform = `translate(-50%, -86%) rotate(${timeDegArr[i][1]}deg)`;
    }
    // if (GAME_STATE === 'playing') {
    if (decryptVal === encryptVal2) {
      // 추가배팅일 경우 -> gameState : playing
      // if (BET_STATE) {
      if (booleanCheck(encryptVal3) === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) { // true
        // 추가 배팅이고, 내 차례면 animateClock()
        // 시, 분 animate()
        animateClock(hourEl, minuteEl, false);
      } else {
        // 추가 배팅이고, 내 차례 아니면 posClock()
        posClock(hourEl, minuteEl);
      }
    }

    PLAYER_COIN_UL.appendChild(liEl);
  }

  pcDraggableCheck('coins-player', true);
  drawMyBetCoin();
};
