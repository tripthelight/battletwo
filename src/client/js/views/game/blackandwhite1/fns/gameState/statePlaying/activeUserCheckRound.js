import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import firstCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/firstCheckRound";
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import findActiveUser from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/findActiveUser";

export default () => {
  let activeUser = "";
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser

  if (firstCheckRound()) {
    selectCube();
    activeUser = storageMethod("l", "GET_ITEM", "localPlayer");
  } else {
    disabledSelectInit();
    // find active user
    activeUser = findActiveUser();
  }
  storageMethod("s", "SET_ITEM", encryptKey1, activeUser);
};
