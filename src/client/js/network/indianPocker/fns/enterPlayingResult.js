import throwObj from '@/client/js/module/errorHandler/throwObj';
// import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import X from '@/client/js/module/crypts/bool-obf';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import { timeInterval_1000 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum.js';
import storageMethod from '@/client/js/module/storage/storageMethod';

// _data 배열이 두자리 숫자 8개의 배열인지 아닌지 확인
const isTwoDigitArrayOf8 = (arr) =>
  Array.isArray(arr) &&
  arr.length === 7 &&
  arr.every((n) => Number.isInteger(n) && n >= 10 && n <= 121);

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    if (isTwoDigitArrayOf8(_data)) {
        resolve(_data);
      } else {
        reject(throwObj('dataManipulation', 'enterPlayingResult - _data validate failed.'));
      }
  });
  PROMISE
    .then((_data) => {
      const arr = [
        [112, 108, 97, 121, 105, 110, 103], // playing
        [110, 111]  // no
      ];
      if (JSON.stringify(_data) === JSON.stringify(arr[0])) {
        const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
        const decryptVal1 = window.sessionStorage.getItem(encryptKey);
        const encryptVal1 = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]); // playing
        // gameState !== 'playing'
        if (decryptVal1 !== encryptVal1) {
          request('enterPlaying', arr[1]);
        };
        // gameState === 'playing'
        if (decryptVal1 === encryptVal1) {
          const encryptKey2 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
          const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
          if (encryptVal2 !== null && encryptVal2 !== '') {
            request('requestCardNumList', {
              step: 'nextStep',
            });
            return;
          };

          // const decryptVal3 = booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
          // if (decryptVal3 === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) { // true
          const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
          const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
          if (encryptVal1 !== null && encryptVal1 !== null && X.dec(encryptVal1)) { // true
            createBattleCardNum();
          };
        };
      } else if (JSON.stringify(_data) === JSON.stringify(arr[1])) {
        setTimeout(() => {
          request('enterPlaying', arr[0]);
        }, timeInterval_1000);
      } else {
        throw throwObj('sessionStorageLoss', 'enterPlayingResult - playing key failed.');
      }
    })
    .catch((error) => {
      errorManager(error, false);
    });
};
