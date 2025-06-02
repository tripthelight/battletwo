import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawPlayerCoins from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawPlayerCoins';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  console.log(' 4-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (!GAME_SCENE) return;
  console.log(' 4-2 : loading show loop test >>>>>>>>>>>>>> ');
  const PLAYER_BLOCK = document.querySelector('.player-block');
  console.log(' 5-1 : loading show loop test >>>>>>>>>>>>>> ');
  if (PLAYER_BLOCK) return;
  console.log(' 5-2 : loading show loop test >>>>>>>>>>>>>> ');

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('player-block');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(rfDrawPlayerCoins, timeInterval_1);
  }, timeInterval_1);
};
