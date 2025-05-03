import { timeInterval_1 } from '@/client/js/functions/variable';
import drewElementComn from '@/client/js/views/game/indianPocker/fns/common/drewElementComn';
import drawResultPlayerBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateGameover/drawResultPlayerBlock';

export default () => {
  // element | seeeion 체크
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (BETTING_ZONE) return drawResultPlayerBlock();
  // 명령
  setTimeout(() => {
    drewElementComn('div', 'betting-zone');
    // 다음 함수 실행
    setTimeout(drawResultPlayerBlock, timeInterval_1);
  }, timeInterval_1);
};
