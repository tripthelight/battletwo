import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import randomNumNewCard from "@/client/js/views/game/findTheSamePicture/fns/common/randomNumNewCard";

export default (_state) => {
  // const PN = window.sessionStorage.pn;
  // if (!PN) errorComn("pn not found");
  // const PN_ARR = JSON.parse(PN);
  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "clickAfterSess.js - pn failed.");
  const PN_ARR = JSON.parse(encryptVal1);

  // const EN = window.sessionStorage.en;
  // if (!EN) errorComn("en not found");
  // const EN_ARR = JSON.parse(EN);
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "clickAfterSess.js - en failed.");
  const EN_ARR = JSON.parse(encryptVal2);

  const SESS_NAME = findRandomName(5);
  // const ACTIVE_SESS = window.sessionStorage.getItem(SESS_NAME);
  // if (!ACTIVE_SESS) errorComn("active storage not found");
  const ACTIVE_SESS = storageMethod('s', 'GET_ITEM', SESS_NAME);
  if (!ACTIVE_SESS) throw throwObj('sessionStorageLoss', "clickAfterSess.js - active storage not found");

  const ACTIVE_ARR = JSON.parse(ACTIVE_SESS);
  const playerActiveNum = findIconActive("p");
  const playerChangeNum = _state ? Number(playerActiveNum - 1) : Number(playerActiveNum + 1);
  ACTIVE_ARR[EN_ARR[1]] = playerChangeNum;
  // 섞기
  let randomNum = 0;
  for (let k = 0; k < ACTIVE_ARR.length; k++) {
    randomNum = Math.floor(Math.random() * 20);
    if (k === PN_ARR[1] || k === EN_ARR[1]) randomNum = ACTIVE_ARR[k];
    ACTIVE_ARR[k] = randomNum;
  }

  // window.sessionStorage.setItem(SESS_NAME, JSON.stringify(ACTIVE_ARR));
  storageMethod('s', 'SET_ITEM', SESS_NAME, JSON.stringify(ACTIVE_ARR));

  let card1Num = 0;
  if (!_state) {
    card1Num = randomNumNewCard();
    for (let i = PN_ARR.length - 1; i >= 0; i--) {
      if (i === 0) {
      } else {
        PN_ARR[i] = PN_ARR[i - 1];
        if (i === 1) {
          PN_ARR[i] = card1Num;
        }
      }
    }

    // window.sessionStorage.setItem("pn", JSON.stringify(PN_ARR));
    storageMethod('s', 'SET_ITEM', encryptKey1, JSON.stringify(PN_ARR));
  }

  return { num: playerChangeNum, card1Num: card1Num };
};
