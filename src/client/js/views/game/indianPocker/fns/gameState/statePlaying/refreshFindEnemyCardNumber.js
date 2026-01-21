import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';
import { timeInterval_1 } from '@/client/js/functions/variable';
import refreshEnemyNumber from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshEnemyNumber';
import refreshDrawEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawEnemyCard';
import playerNum from '@/client/js/views/game/indianPocker/fns/common/playerNum.js';

export default () => {
  // element | seeeion 체크
  /*
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (!BATTLE_CARD_NUM) return;
  const BATTLE_CARD_ARR = JSON.parse(BATTLE_CARD_NUM);
  if (!BATTLE_CARD_ARR || BATTLE_CARD_ARR.length < 1) return;
  */

  // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  // if (!BATTLE_CARD_NUM) return;
  const encryptKey1 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (encryptVal1 === null || (encryptVal1 !== null && encryptVal1 === '')) return;
  const decryptVal1 = dec(encryptVal1);

  // 명령
  /*
  const NUM = refreshEnemyNumber(BATTLE_CARD_ARR);
  */

  // const NUM = playerNum(BATTLE_CARD_NUM);
  const NUM = playerNum(decryptVal1);

  // 다음 함수 실행
  refreshDrawEnemyCard(NUM);
};
