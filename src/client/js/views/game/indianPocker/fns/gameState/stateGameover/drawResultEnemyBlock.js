import { timeInterval_1 } from '@/client/js/functions/variable';
import drewElementComn from '@/client/js/views/game/indianPocker/fns/common/drewElementComn';
import drawResultBettingZone from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResultBettingZone';

export default () => {
  // element | seeeion 체크
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (ENEMY_BLOCK) return drawResultBettingZone();
  // 명령
  setTimeout(() => {
    drewElementComn('div', 'enemy-block');
    // 다음 함수 실행
    setTimeout(drawResultBettingZone, timeInterval_1);
  }, timeInterval_1);
};
