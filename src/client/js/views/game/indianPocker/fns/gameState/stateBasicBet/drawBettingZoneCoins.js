import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { deobfuscateInt32 as d } from '@/client/js/module/crypts/encryptNumber';
import drawPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerBlock';
import posClock from '@/client/js/views/game/indianPocker/fns/common/posClock';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  // element | seeeion 체크
  // const BET_COIN_POS = window.sessionStorage.betCoinPos;
  // if (!BET_COIN_POS) return drawPlayerBlock();

  const BET_COIN_POS_KEY = findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]); // betCoinPos
  const BET_COIN_POS = storageMethod("s", "GET_ITEM", BET_COIN_POS_KEY);

  if (!BET_COIN_POS) return drawPlayerBlock();

  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) throw throwObj('elementLoss', '.betting-zone element not found.');

  // 명령
  const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
  if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return drawPlayerBlock();

  const elem = document.createElement('ul');
  let liEl = new Object();
  let minuteEl = new Object();
  let hourEl = new Object();
  elem.classList.add('bet-coins');

  console.log("BET_COIN_ARR ::::::::::: ", BET_COIN_ARR);


  const K = [
    findCharCode([66, 85, 87, 74, 79, 90, 86, 83, 72, 88]), // betCoinPos : host
    findCharCode([85, 75, 72, 69, 71, 66, 74, 81, 87, 84]), // betCoinPos : translateX
    findCharCode([80, 67, 90, 85, 82, 71, 70, 66, 84, 74]), // betCoinPos : translateY
  ];
  const KS = [
    findCharCode([89, 68, 86, 69, 84, 66, 77, 87, 65, 90]), // betCoinPos : host : enemy
    findCharCode([73, 87, 86, 82, 85, 84, 79, 68, 90, 66]), // betCoinPos : host : pleyer
  ];

  for (let i = 0; i < BET_COIN_ARR.length; i++) {
    liEl = document.createElement('li');
    minuteEl = document.createElement('span');
    hourEl = document.createElement('span');
    minuteEl.classList.add('m');
    hourEl.classList.add('h');
    liEl.appendChild(minuteEl);
    liEl.appendChild(hourEl);
    posClock(hourEl, minuteEl);
    // if (BET_COIN_ARR[i].host === 'enemy') liEl.classList.add('e');
    if (BET_COIN_ARR[i][K[0]] === KS[0]) // host === enemy
      liEl.classList.add('e');
    liEl.style.transform = 'translate(' + d(BET_COIN_ARR[i][K[1]]) + 'px, ' + d(BET_COIN_ARR[i][K[2]]) + 'px)';
    elem.appendChild(liEl);
  }
  BETTING_ZONE.appendChild(elem);

  // 다음 함수 실행
  drawPlayerBlock();
};
