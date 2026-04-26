import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import { timeInterval_1 } from "@/client/js/functions/variable";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import moveEnemyIcon from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/moveEnemyIcon";

export default (_data) => {
  // const ENEMY_ACTIVE = window.sessionStorage.getItem(findRandomName(5));
  // if (!ENEMY_ACTIVE) errorComn("arr not found");
  const ENEMY_ACTIVE = storageMethod('s', 'GET_ITEM', findRandomName(5));
  if (!ENEMY_ACTIVE) throw throwObj('sessionStorageLoss', "enemySucess.js - arr not found");
  const ENEMY_ACTIVE_ARR = JSON.parse(ENEMY_ACTIVE);

  // const PN = window.sessionStorage.pn;
  // if (!PN) errorComn("pn not found");
  // const PN_ARR = JSON.parse(PN);
  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "enemySucess.js - pn failed.");
  const PN_ARR = JSON.parse(encryptVal1);

  // const EN = window.sessionStorage.en;
  // if (!EN) errorComn("pn not found");
  // const EN_ARR = JSON.parse(EN);
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "enemySucess.js - en failed.");
  const EN_ARR = JSON.parse(encryptVal1);

  const PLAYER_ACTIVE_NUM = ENEMY_ACTIVE_ARR[EN_ARR[1]];

  let randomNum = 0;
  for (let i = 0; i < ENEMY_ACTIVE_ARR.length; i++) {
    randomNum = Math.floor(Math.random() * 16);
    ENEMY_ACTIVE_ARR[i] = randomNum;
    if (i === PN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = _data.enemyActiveIndex;
    }
    if (i === EN_ARR[1]) {
      ENEMY_ACTIVE_ARR[i] = PLAYER_ACTIVE_NUM;
    }
  }

  // window.sessionStorage.setItem(findRandomName(5), JSON.stringify(ENEMY_ACTIVE_ARR));
  storageMethod('s', 'SET_ITEM', findRandomName(5), JSON.stringify(ENEMY_ACTIVE_ARR));

  const AFTER_DATA = {
    enemyActive: Number(ENEMY_ACTIVE_ARR[PN_ARR[1]]),
    clickBoardNum: _data.clickBoardNum,
    clickNum: _data.clickNum,
  };
  setTimeout(moveEnemyIcon, timeInterval_1, AFTER_DATA, true);
};
