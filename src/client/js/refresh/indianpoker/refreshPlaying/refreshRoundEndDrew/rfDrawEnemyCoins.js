import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import rfDrawBettingZone from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawBettingZone';

export default () => {
  // element | seeeion 체크
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (COINS_ENEMY) return;
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다' });

  // 명령
  setTimeout(() => {
    let elem = document.createElement('ul');
    let li;
    elem.classList.add('coins');
    elem.classList.add('coins-enemy');
    let coinCount = Number(window.sessionStorage.coinsEnemy);
    for (let i = 0; i < coinCount; i++) {
      li = document.createElement('li');
      elem.appendChild(li);
    }
    ENEMY_BLOCK.appendChild(elem);

    // 다음 함수 실행
    setTimeout(rfDrawBettingZone, timeInterval_1);
  }, timeInterval_1);
};
