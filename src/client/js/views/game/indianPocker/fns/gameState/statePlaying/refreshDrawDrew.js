import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import LOADING from '../../../common/loading.js';
import { text } from '../../../common/language.js';
import btnCallRaiseEventBefore from './btnCallRaiseEventBefore.js';

export default () => {
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .player-block 엘리먼트가 없습니다 22 22' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('.player-card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .player-card 엘리먼트가 없습니다 22' });
  const CHECH_DREW_INFO = document.querySelector('.check-drew-info');
  if (CHECH_DREW_INFO) return;

  setTimeout(() => {
    let elem = document.createElement('div');
    let inner = document.createElement('span');
    inner.innerHTML = text.indianpocker.touchInfo;
    elem.appendChild(inner);
    elem.classList.add('check-drew-info');
    const GAME_SCENE = document.getElementById('gameScene');
    if (!GAME_SCENE) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 GAME_SCENE 엘리먼트가 없습니다' });
    GAME_SCENE.appendChild(elem);
    setTimeout(() => {
      const CHECH_DREW_INFO_EL = document.querySelector('.check-drew-info');
      if (!CHECH_DREW_INFO_EL) return errorManagement({ errCase: 'errorComn', message: 'drew 상태에서 .check-drew-info 엘리먼트가 없습니다' });
      const H_RES = PLAYER_BLOCK.offsetTop + PLAYER_CARD.offsetTop - CHECH_DREW_INFO_EL.clientHeight;
      CHECH_DREW_INFO_EL.style.top = H_RES + 'px';
      setTimeout(() => {
        LOADING.hide();
        PLAYER_CARD.onclick = () => btnCallRaiseEventBefore();
      }, timeInterval_1);
    }, timeInterval_1);
  }, timeInterval_1);
};
