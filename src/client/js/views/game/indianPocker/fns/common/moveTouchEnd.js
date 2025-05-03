import { timeInterval_1 } from '@/client/js/functions/variable';
import { selectX, selectY } from '@/client/js/views/game/indianPocker/fns/common/variable';
import betCoinEndComn from '@/client/js/views/game/indianPocker/fns/common/betCoinEndComn';

export default (e) => {
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (!BETTING_ZONE) return;
  selectX = 0;
  selectY = 0;
  e.target.style.zIndex = '1';
  if (BETTING_ZONE.classList.contains('over')) {
    BETTING_ZONE.classList.remove('over');
    setTimeout(betCoinEndComn, timeInterval_1, e);
  } else {
    e.target.style.transform = 'translate(' + selectX + 'px, ' + selectY + 'px)';
  }
};
