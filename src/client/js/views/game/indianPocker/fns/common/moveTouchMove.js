import { selectX, selectY } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (e) => {
  let moveX = -(selectX - e.targetTouches[0].clientX);
  let moveY = -(selectY - e.targetTouches[0].clientY);
  e.target.style.zIndex = '3000';
  e.target.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
  const BETTING_ZONE = document.querySelector('.betting-zone');
  const COINS = document.querySelector('.coins-player');
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!BETTING_ZONE || !COINS || !PLAYER_BLOCK) return;
  if (selectY - e.targetTouches[0].clientY - e.target.offsetTop < BETTING_ZONE.clientHeight && selectY - e.targetTouches[0].clientY - e.target.offsetTop > e.target.clientHeight) {
    BETTING_ZONE.classList.add('over');
  } else {
    BETTING_ZONE.classList.remove('over');
  }
};
