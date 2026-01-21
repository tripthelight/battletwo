import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { timeInterval_1000 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum.js';

export default (_data) => {
  console.log('_data >>>>>>>>>>>>>>>>>>> ', _data);

  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      const arr = [
        [112, 108, 97, 121, 105, 110, 103], // playing
        [110, 111]  // no
      ];
      if (JSON.stringify(_data) === JSON.stringify(arr[0])) {
        const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
        const decryptVal = window.sessionStorage.getItem(encryptKey);
        const encryptVal = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]); // playing
        // gameState !== 'playing'
        if (decryptVal !== encryptVal) {
          request('enterPlaying', arr[1]);
        }
        // gameState === 'playing'
        if (decryptVal === encryptVal) {

          const decryptVal2 = booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
          if (decryptVal2 === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) { // true
            createBattleCardNum();
          }
        }
      } else if (JSON.stringify(_data) === JSON.stringify(arr[1])) {
        setTimeout(() => {
          request('enterPlaying', arr[0]);
        }, timeInterval_1000);
      }
    })
    .catch((error) => {
      console.log('error : ', error);
      errorManagement({ errCase: 'errorComn', message: `enterPlayingResult() 함수를 못탐` });
    });
};
