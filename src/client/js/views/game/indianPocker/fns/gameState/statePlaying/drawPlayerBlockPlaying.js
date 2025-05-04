import { timeInterval_1 } from '@/client/js/functions/variable';
import drawPlayerCoinsPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCoinsPlaying';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (PLAYER_BLOCK) return;

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('player-block');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawPlayerCoinsPlaying, timeInterval_1);
  }, timeInterval_1);
};
