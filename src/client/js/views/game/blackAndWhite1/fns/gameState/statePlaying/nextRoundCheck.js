import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import turnReminderBlinkNull from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull";
import { clearEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';
import { clearAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export default () => {
  // window.sessionStorage.removeItem("beforePlayerNum");
  storageMethod("s", "EMPTY_VALUE",
    findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]) // beforePlayerNum
  );
  clearEnemyBeforeCube();
  clearAfterPlayerNum();
  turnReminderBlinkNull();
};
