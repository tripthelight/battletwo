import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import drawPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerBlock';
import rfDrawPlayerBlock from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawPlayerBlock';

export default () => {
  // element | seeeion 체크
  const BET_COIN_POS = window.sessionStorage.betCoinPos;
  if (!BET_COIN_POS) return drawPlayerBlock();
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.betting-zone 엘리먼트가 없습니다' });

  // 명령
  setTimeout(() => {
    const BET_COIN_ARR = JSON.parse(BET_COIN_POS);
    if (!BET_COIN_ARR || BET_COIN_ARR.length <= 0) return drawPlayerBlock();
    let elem = document.createElement('ul');
    let li;
    elem.classList.add('bet-coins');
    for (let i = 0; i < BET_COIN_ARR.length; i++) {
      li = document.createElement('li');
      if (BET_COIN_ARR[i].host === 'enemy') li.classList.add('e');
      li.style.transform = 'translate(' + BET_COIN_ARR[i].translateX + 'px, ' + BET_COIN_ARR[i].translateY + 'px)';
      elem.appendChild(li);
    }
    BETTING_ZONE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(rfDrawPlayerBlock, timeInterval_1);
  }, timeInterval_1);
};
