import { errorManagement } from '@/client/js/module/errorManagement';
import { mmX, mmY, selectX, selectY, mtX, mtY } from '@/client/js/views/game/indianPocker/fns/common/variable';
import touchCoinState from '@/client/js/views/game/indianPocker/fns/common/touchCoinState';

export default (e) => {
  if (!touchCoinState(e.target)) return;
  mmX = -(selectX - e.targetTouches[0].clientX) + mtX;
  mmY = -(selectY - e.targetTouches[0].clientY) + mtY;
  e.target.style.zIndex = '3000';
  e.target.style.transform = 'translate(' + mmX + 'px, ' + mmY + 'px)';
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: '.betting-zone 엘리먼트를 찾을 수 없습니다.' });
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.player-block 엘리먼트를 찾을 수 없습니다.' });
  if (mmY > BETTING_ZONE.clientHeight) {
    PLAYER_BLOCK.classList.add('over');
  } else {
    PLAYER_BLOCK.classList.remove('over');
  }
};
