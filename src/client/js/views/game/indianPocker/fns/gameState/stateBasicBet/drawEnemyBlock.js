import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyCoins from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawEnemyCoins';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return;
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (ENEMY_BLOCK) return drawEnemyCoins();

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('enemy-block');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawEnemyCoins, timeInterval_1);
  }, timeInterval_1);
};
