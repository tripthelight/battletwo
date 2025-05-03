import { timeInterval_1 } from '@/client/js/functions/variable';
import pcDraggableCheck from '@/client/js/views/game/indianPocker/fns/common/pcDraggableCheck';
import drawMyBetCoin from '@/client/js/views/game/indianPocker/fns/common/drawMyBetCoin';
import getTranslateMH from '@/client/js/views/game/indianPocker/fns/common/getTranslateMH';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import { errorManagement } from '@/client/js/module/errorManagement';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';

/**
 * 배팅 후 coins-player의 코인(li) 그리는 단계
 */
export default (_data) => {
  if (Number(_data.coinsPlayer) < 0) return;
  const PLAYER_COIN_UL = document.querySelector('ul.coins-player');
  if (!PLAYER_COIN_UL) return;
  const COINS = PLAYER_COIN_UL.querySelectorAll('li');

  const GAME_STATE = window.sessionStorage.gameState;
  if (!GAME_STATE) return errorManagement({ errCase: 'errorComn', message: 'gameState not found' });
  const BET_USER = window.sessionStorage.betUser;
  if (!BET_USER) return errorManagement({ errCase: 'errorComn', message: 'betUser not found' });
  const BET_STATE = BET_USER === 'true' ? true : false;

  const BET_COIN = window.sessionStorage.betCoin;
  const BET_COIN_ARR = JSON.parse(BET_COIN);

  setTimeout(() => {
    // player 코인을 지우기 전 시간 deg 저장 array 변수 선언
    let timeDegArr = [];
    for (let i = 0; i < COINS.length; i++) {
      if (i === _data.index) {
      } else {
        timeDegArr.push([getTranslateMH(COINS[i]).m, getTranslateMH(COINS[i]).h]);
      }
      COINS[i].remove();
    }
    let playerCoins = Number(_data.coinsPlayer);

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
      if (GAME_STATE === 'basicBet') {
        // 기본배팅일 경우 -> gameState : basicBet
        // 기본 배팅이 끝나면 시간이 멈춰야 됨
        minuteEl.style.transform = `translate(-50%, -96%) rotate(${timeDegArr[i][0]}deg)`;
        hourEl.style.transform = `translate(-50%, -86%) rotate(${timeDegArr[i][1]}deg)`;
      }
      if (GAME_STATE === 'playing') {
        // 추가배팅일 경우 -> gameState : playing
        if (BET_STATE) {
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

    setTimeout(() => {
      pcDraggableCheck('coins-player', true);
      setTimeout(drawMyBetCoin, timeInterval_1);
    }, timeInterval_1);
  }, timeInterval_1);
};
