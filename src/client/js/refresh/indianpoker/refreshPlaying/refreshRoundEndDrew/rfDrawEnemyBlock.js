import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawEnemyCoins from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawEnemyCoins';

export default () => {
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return;
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (ENEMY_BLOCK) return;

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('enemy-block');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(rfDrawEnemyCoins, timeInterval_1);
  }, timeInterval_1);
};
