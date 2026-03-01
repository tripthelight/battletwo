import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import changeActiveBlackSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveBlackSquare";
import changeDisabledCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeDisabledCube";
import USERS from '@/client/js/views/game/blackAndWhite1/fns/common/users';

export default () => {
  const encryptVal1 = storageMethod("l", "GET_ITEM", "localPlayer"); // local peer nick code
  const encryptKey2 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2); // active peer nick code

  const USER_LIST = USERS();
  let changeUser = "";
  if (encryptVal2 && encryptVal1) {
    if (USER_LIST.length > 0) {
      if (encryptVal2 == encryptVal1) {
        for (let i = 0; i < USER_LIST.length; i++) {
          if (USER_LIST[i] !== encryptVal1) {
            changeUser = USER_LIST[i];
            break;
          }
        }
      } else {
        changeUser = encryptVal1;
      }

      storageMethod("s", "SET_ITEM", encryptKey2, changeUser);
      changeActiveBlackSquare(changeUser, encryptVal1);
      changeDisabledCube(changeUser, encryptVal1);
    }
  }
};
