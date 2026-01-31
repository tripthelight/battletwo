import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { GRS } from '@/client/js/module/crypts/generateRandomString';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import storageMethod from '@/client/js/module/storage/storageMethod';






export default (_num) => {
  return new Promise((resolve, reject) => {
    try {
      // coins 관련 sessionStorage
      const encryptKey1 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
      const encryptKey3 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptKey4 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
      const encryptKey5 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet

      // card 관련 sessionStorage
      const encryptKey6 = findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]); // betResulting
      const encryptKey7 = findCharCode([79, 76, 88, 84, 75, 65, 77, 73, 72, 86]); // drewFlipCardMode
      const encryptKey8 = findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]); // drewReady
      const encryptKey9 = findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]); // dropState
      const encryptKey10 = findCharCode([90, 77, 71, 84, 65, 68, 87, 81, 70, 82]); // drewCardReady
      const encryptKey11 = findCharCode([77, 87, 85, 88, 83, 80, 79, 90, 65, 66]); // playCardNum
      const encryptKey12 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
      const encryptKey13 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
      const encryptVal14 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
      const encryptVal15 = findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]); // roundEnd
      const encryptVal16 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
      const encryptKey17 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
      const encryptKey18 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
      const encryptKey19 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
      const encryptKey20 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
      const encryptKey21 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
      const encryptKey22 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
      const encryptKey23 = findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]); // betCoin
      // const encryptKey24 = // betCoinPos
      const encryptKey25 = findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]); // basicBettingState
      const encryptKey26 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
      const encryptVal27 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting


      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
