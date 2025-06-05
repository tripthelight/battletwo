import { errorManagement } from '@/client/js/module/errorManagement';
import { timeInterval_1000 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum.js';

export default (_data) => {
  console.log('_data >>>>>>>>>>>>>>>>>>> ', _data);

  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      // playing
      const encryptVal = findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]); // playing
      // if (_data === 'playing') {
      if (_data === encryptVal) {
        // gameState: sessionStorage.getItem('gameState'),
        const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
        const decryptVal = window.sessionStorage.getItem(encryptKey);
        // if (window.sessionStorage.gameState !== 'playing') request('enterPlaying', 'no');
        if (decryptVal !== encryptVal) {
          request('enterPlaying', 'no');
        }
        // if (window.sessionStorage.gameState === 'playing') {
        if (decryptVal === encryptVal) {
          if (window.sessionStorage.betUser === 'true') {
            createBattleCardNum();
          }
        }
      } else if (_data === 'no') {
        setTimeout(() => {
          request('enterPlaying', encryptVal);
        }, timeInterval_1000);
      }
    })
    .catch((error) => {
      errorManagement({ errCase: 'errorComn', message: `enterPlayingResult() 함수를 못탐 11 :::  ${error}` });
    });
};
