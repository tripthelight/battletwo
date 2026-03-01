import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import beforePlayerNum from "@/client/js/views/game/blackAndWhite1/fns/common/beforePlayerNum";
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';
import afterPlayerNum from "@/client/js/views/game/blackAndWhite1/fns/common/afterPlayerNum";
import changeCubeSession from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeCubeSession";

export default (num, index) => {
  const encryptKey1 = findCharCode([74, 65, 88, 72, 66, 84, 83, 67, 69, 85]); // userOrder
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  const encryptVal2 = storageMethod("l", "GET_ITEM", "localPlayer"); // local peer nick code

  // ["42,52,41,56,45",["42","52","41","56","45"]]
  console.log("userOrder >>>>>>>>>> ", encryptVal1);


  const USER_ORDER = JSON.parse(encryptVal1);
  const USER_ORDER_ARR = USER_ORDER.map(s => s.split(","));

  for (let i = 0; i < USER_ORDER_ARR.length; i++) {
    // if (USER_ORDER_ARR[0] == MY_UID) {
    if (USER_ORDER_ARR[0] == encryptVal2) {
      // 내가 선
      beforePlayerNum(num, index);
      changeActiveUser();
      break;
    } else {
      // 내가 후
      afterPlayerNum(num, index);
      break;
    }
  }
  changeCubeSession(num);
};
