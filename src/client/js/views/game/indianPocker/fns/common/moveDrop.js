// import { pcActiveEl, pcMoveX, pcMoveY } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { timeInterval_1 } from '@/client/js/functions/variable';
import betCoinEndComn from '@/client/js/views/game/indianPocker/fns/common/betCoinEndComn';

export default (event) => {
  event.preventDefault();
  if (window.sessionStorage.dropState === 'false') return;
  const BATTING_ZONE = document.querySelector('.betting-zone');

  // 명령
  setTimeout(() => {
    if (BATTING_ZONE.classList.contains('over')) {
      BATTING_ZONE.classList.remove('over');
    }
    reactiveState.pcActiveEl.target.style.transform = 'translate(' + reactiveState.pcMoveX + 'px, ' + reactiveState.pcMoveY + 'px)';
    setTimeout(betCoinEndComn, timeInterval_1, reactiveState.pcActiveEl);
  }, timeInterval_1);
};
