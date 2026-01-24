/* import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { RF_END_DREW } from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/refreshDrewInit';
import { request } from '@/client/js/network/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum'; */

export default (data) => {
  /* setTimeout(() => {
    storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    storageMethod('s', 'REMOVE_ITEM', 'roundEndReload');
    RF_END_DREW.main();
    setTimeout(() => {
      request('enterDrew', true);
      setTimeout(() => {
        // console.log('window.sessionStorage.betUser :: ', window.sessionStorage.betUser);
        // if (window.sessionStorage.betUser === 'true') createBattleCardNum();
        // betUser === 'true'
        const decryptVal = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
        const encryptKey = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
        const encryptVal = window.sessionStorage.getItem(encryptKey);
        if (encryptVal === decryptVal) createBattleCardNum(); // betUser === true
      }, 202);
    }, 201);
  }, 200); */
};
