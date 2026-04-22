import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import {
  ensureActiveUser,
  isLocalTurn
} from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState";

export default () => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const activeUser = ensureActiveUser();

  if (!activeUser) {
    disabledSelectInit();
    return;
  }

  if (isLocalTurn()) {
    selectCube();
  } else {
    disabledSelectInit();
  }
  storageMethod("s", "SET_ITEM", encryptKey1, activeUser);
};
