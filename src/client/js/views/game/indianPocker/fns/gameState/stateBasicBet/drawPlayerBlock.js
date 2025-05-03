import { timeInterval_1 } from '@/client/js/functions/variable';
import drawPlayerCoins from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawPlayerCoins';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return;
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (PLAYER_BLOCK) return drawPlayerCoins();

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('player-block');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawPlayerCoins, timeInterval_1);
  }, timeInterval_1);
};
