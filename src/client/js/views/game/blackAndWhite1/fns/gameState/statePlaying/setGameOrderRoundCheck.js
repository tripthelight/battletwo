import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameState from '@/client/js/gameState/blackAndWhite1';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import throwObj from '@/client/js/module/errorHandler/throwObj';
// import waitEnemy from "../common/waitEnemy.js";

export default () => {
  try {
    const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    if (!encryptVal1) throw throwObj('sessionStorageLoss', 'round value failed.');
    const decryptVal1 = dec(encryptVal1);

    if (
      decryptVal1 <
      dec(enc(encryptNumOfStr(_t([119, 101, 101, 119, 119, 101, 119, 120])))) // "weewwewx" : 10
    ) {
      console.log("ROUND >>>>>>>>>>>>>>>> 10 미만");
      // 1 ~ 8 ROUND
      // console.log('ROUND :::::::: ', ROUND);
    } else if (
      decryptVal1 ===
      dec(enc(encryptNumOfStr(_t([101, 119, 119, 119, 101, 119, 101, 110])))) // "ewwwewen" : 10
    ) {
      console.log("ROUND >>>>>>>>>>>>>>>> 10 ");
      // LAST ROUND
      // console.log('ROUND : LAST :', ROUND);
      gameState.gameOver();
      // TODO :: last event
    } else {
      throw throwObj('sessionStorageLoss', 'round value not found.');
    };
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'setGameOrderRoundCheck.js error');
  };


  /*
  const ROUND = window.sessionStorage.getItem("round");

  console.log("ROUND >>>>>>>>>>> ", ROUND);

  if (ROUND < 10) {
    console.log("ROUND >>>>>>>>>>>>>>>> 10 미만");
    // 1 ~ 8 ROUND
    // console.log('ROUND :::::::: ', ROUND);
  } else if (ROUND == 10) {
    console.log("ROUND >>>>>>>>>>>>>>>> 10 ");
    // LAST ROUND
    // console.log('ROUND : LAST :', ROUND);
    gameState.gameOver();
    // TODO :: last event
  } else {
    console.log("ROUND >>>>>>>>>>>>>>>> ERROR ");
    // error
    // waitEnemy("error");
  }
    */
};
