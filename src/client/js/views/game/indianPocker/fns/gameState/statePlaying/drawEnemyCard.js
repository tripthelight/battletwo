import findCharCode from '@/client/js/functions/findCharCode';
// import { dec } from '@/client/js/module/crypts/obf8lower';
// import bcrypt from 'bcryptjs';
// import { selectCompairNumbers } from '@/client/store/encryptionStore';
// import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
// import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import comnDrawEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/comnDrawEnemyCard';

export default () => {
  // element | seeeion 체크
  const ENEMY_CARD = document.querySelector('.enemy-card');
  console.log("ENEMY_CARD :::::::: ", ENEMY_CARD);

  if (ENEMY_CARD) return;
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return errorManagement({ errCase: 'elementLoss', message: '#gameScene 엘리먼트가 없습니다.' });
  const ENEMY_BLOCK = GAME_SCENE.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block 엘리먼트가 없습니다.' });

  // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  const encryptKey1 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
  const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
  // const decryptVal1 = dec(encryptVal1);

  // const arrNumbs = selectCompairNumbers();
  // if (!arrNumbs.length) return errorManagement({ errCase: 'cardNum', message: 'cardNum length 0 - 3' });

  // const num = findCardNum(encryptVal1);
  // console.log('상대가 보낸 내 화면에서 보이는 상대 카드 : ', num);
  // comnDrawEnemyCard(num);
  console.log("battleCardNum ------------> ", encryptVal1);

  comnDrawEnemyCard(encryptVal1);

  // const NUM_RES = arrNumbs.filter((nums) => bcrypt.compareSync(nums, BATTLE_CARD_NUM));
  // const NUM_RES = arrNumbs.filter((nums) => bcrypt.compareSync(nums, decryptVal1));
  // if (!NUM_RES.length) return errorManagement({ errCase: 'cardNum', message: 'num result length 0' });
  // TEST: 중복 카드 테스트용 변수 - 실제 게임에서는 중복 될 수 없으므로 NUM_STR 변수를 적용해야함
  // const NUM_DUPLICATION_STR = (NUM_RES.length > 1 ? NUM_RES.slice(0, 1) : NUM_RES).join();

  // comnDrawEnemyCard(findCardNum(NUM_DUPLICATION_STR));
};
