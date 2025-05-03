import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import resultAnimation from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/resultAnimation';
import drawResultEnemyBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResultEnemyBlock';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 #gameScene 엘리먼트가 없습니다' });
  const COINS_ENEMY = document.querySelector('.coins-enemy');
  if (COINS_ENEMY) COINS_ENEMY.classList.remove('active');
  if (COINS_ENEMY) COINS_ENEMY.classList.add('disabled');
  const COINS_PLAYER = document.querySelector('.coins-player');
  if (COINS_PLAYER) COINS_PLAYER.classList.remove('active');
  if (COINS_PLAYER) COINS_PLAYER.classList.add('disabled');
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  const BETTING_ZONE = document.querySelector('.betting-zone');
  const PLAYER_BLOCK = document.querySelector('.player-block');

  const RESULT = window.sessionStorage.result;
  if (!RESULT) return errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 결과 출력 중 result 세션이 없습니다' });
  const RESULT_RES = RESULT === 'true' ? true : RESULT === 'false' ? false : errorManagement({ errCase: 'errorComn', message: 'game over 상태에서 result 세션이 true나 false가 아닙니다' });
  if (PLAYER_BLOCK && !RESULT_RES) return resultAnimation();
  if (PLAYER_BLOCK && RESULT_RES) {
    const COINS = PLAYER_BLOCK.querySelectorAll('li');
    if (COINS.length > 0) {
      const COINS_PLAYER = PLAYER_BLOCK.querySelector('.coins-player');
      if (COINS_PLAYER) {
        for (let i = 0; i < COINS.length; i++) COINS[i].remove();
        for (let i = 0; i < Number(window.sessionStorage.coinsPlayer); i++) COINS_PLAYER.appendChild(document.createElement('li'));
      }
    }
  }

  if (ENEMY_BLOCK && BETTING_ZONE && PLAYER_BLOCK) return resultAnimation();
  // 다음 함수 실행
  setTimeout(drawResultEnemyBlock, timeInterval_1);
};
