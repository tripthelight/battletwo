import { errorManagement } from '@/client/js/module/errorManagement';
import { timeInterval_1000 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum.js';

export default (_data) => {
  let promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      if (_data === 'playing') {
        if (window.sessionStorage.gameState !== 'playing') request('enterPlaying', 'no');
        if (window.sessionStorage.gameState === 'playing') {
          if (window.sessionStorage.betUser === 'true') createBattleCardNum();
        }
      } else if (_data === 'no') {
        setTimeout(() => {
          request('enterPlaying', 'playing');
        }, timeInterval_1000);
      }
    })
    .catch((error) => {
      errorManagement({ errCase: 'errorComn', message: 'enterPlayingResult() 함수를 못탐 11 ::: ' });
    });
};
