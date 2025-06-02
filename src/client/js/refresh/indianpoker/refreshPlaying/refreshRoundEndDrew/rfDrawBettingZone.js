import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawBettingZoneCoins from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawBettingZoneCoins';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  console.log(' 2-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (!GAME_SCENE) return;
  console.log(' 2-2 : loading show loop test >>>>>>>>>>>>>> ');
  const BETTING_ZONE = document.querySelector('.betting-zone');
  console.log(' 3-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (BETTING_ZONE) return;
  console.log(' 3-2 : loading show loop test >>>>>>>>>>>>>> ');

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('betting-zone');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(rfDrawBettingZoneCoins, timeInterval_1);
  }, timeInterval_1);
};
