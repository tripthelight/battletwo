import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import booleanReturn from '@/client/js/functions/validation/booleanReturn';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import animateClock from '@/client/js/views/game/indianPocker/fns/common/animateClock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import drawPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerBlock';
import drawPlayerBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerBlockPlaying';

export default () => {
  // element | seeeion 체크
  // const BET_COIN_POS = window.sessionStorage.betCoinPos;

  const BET_COIN_POS_KEY = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
  const BET_COIN_POS = storageMethod("s", "GET_ITEM", BET_COIN_POS_KEY);

  if (!BET_COIN_POS) return drawPlayerBlock();
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'elementLoss', message: '.betting-zone 엘리먼트가 없습니다' });

  // const BET_USER = window.sessionStorage.betUser;
  // if (!BET_USER) return errorManagement({ errCase: 'sessionStorageLoss', message: 'betUser not found' });
  // const BET_RES = BET_USER === 'true' ? true : false;
  const BET_RES = booleanReturn([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser - true or false or error
  if (BET_RES === '')  return errorManagement({ errCase: 'sessionStorageLoss', message: '코인 1 체크 중 betUser 세션이 없습니다.' });

  console.log("BET_RES ------------- 2 : ", BET_RES);

  // 명령
  const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return drawPlayerBlock();
  let elem = document.createElement('ul');
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
  elem.classList.add('bet-coins');
  for (let i = 0; i < BET_COIN_ARR.length; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    if (BET_COIN_ARR[i].host === 'player') {
      BET_RES ? animateClock(hourEl, minuteEl, false) : posClock(hourEl, minuteEl);
    }
    if (BET_COIN_ARR[i].host === 'enemy') {
      liEl.classList.add('e');
      BET_RES ? posClock(hourEl, minuteEl) : animateClock(hourEl, minuteEl, false);
    }
    liEl.style.transform = 'translate(' + BET_COIN_ARR[i].translateX + 'px, ' + BET_COIN_ARR[i].translateY + 'px)';
    elem.appendChild(liEl);
  }
  BETTING_ZONE.appendChild(elem);

  // 다음 함수 실행
  drawPlayerBlockPlaying();
};
