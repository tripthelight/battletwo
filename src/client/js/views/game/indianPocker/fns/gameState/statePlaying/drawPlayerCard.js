import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import drawEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawEnemyCard';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

export default () => {
  // element | seeeion 체크
  const PLAYER_CARD = document.querySelector('.player-card');
  if (PLAYER_CARD) return;
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: '#gameScene 엘리먼트가 없습니다.' });
  const PLAYER_BLOCK = GAME_SCENE.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트가 없습니다. 111' });
  const IMG_EL = PLAYER_BLOCK.querySelector('img.card');
  if (IMG_EL) return;

  // 명령
  setTimeout(() => {
    let playerBlock = document.createElement('div');
    let imgEl = document.createElement('img');
    imgEl.setAttribute('src', SVG_BACK);
    imgEl.setAttribute('alt', 'card back');
    imgEl.classList.add('card');
    playerBlock.classList.add('player-card');
    playerBlock.appendChild(imgEl);
    PLAYER_BLOCK.appendChild(playerBlock);
    // 다음 함수 실행
    setTimeout(drawEnemyCard, timeInterval_1);
  }, timeInterval_1);
};
