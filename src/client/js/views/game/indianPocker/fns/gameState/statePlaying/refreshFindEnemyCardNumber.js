import { timeInterval_1 } from '@/client/js/functions/variable';
import refreshEnemyNumber from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshEnemyNumber';
import refreshDrawEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawEnemyCard';

export default () => {
  // element | seeeion 체크
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (!BATTLE_CARD_NUM) return;
  const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
  if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length < 1) return;
  // 명령
  setTimeout(() => {
    const NUM = refreshEnemyNumber(BATTLE_CARD_ARR);
    // 다음 함수 실행
    setTimeout(refreshDrawEnemyCard, timeInterval_1, NUM);
  }, timeInterval_1);
};
