import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import drewCheckInfo from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drewCheckInfo';
import refreshBetUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshBetUserCheck';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: '#gameScene 엘리먼트가 없습니다.' });
  const PLAYER_BLOCK = GAME_SCENE.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;
  const PLAYER_CARD = document.querySelector('.player-card');
  if (PLAYER_CARD) return;

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
    if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === 'true') return drewCheckInfo();
    setTimeout(refreshBetUserCheck, timeInterval_1);
  }, timeInterval_1);
};
