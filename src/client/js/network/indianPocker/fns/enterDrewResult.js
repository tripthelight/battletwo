import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import { timeInterval_100, timeInterval_101, timeInterval_102, timeInterval_1000 } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
// import { RF_END_DREW } from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/refreshDrewInit';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    console.log('_data >>>>>>>> ', _data);

    if (_data) {
      setTimeout(() => {
        // const BET_RESULTING = window.sessionStorage.betResulting;
        // if (BET_RESULTING && BET_RESULTING === 'true') {

        const encryptK1 = findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]); // betResulting
        const encryptV1 = storageMethod("s", "GET_ITEM", encryptK1);
        if (encryptV1 !== null && encryptV1 !== '' && X.dec(encryptV1)) {
          // round end 화면에서 drew일 때 새로고침하면,
          // 상대방에게 여기를 받고 내 화면을, 완벽히 그려야돼
          // RF_END_DREW.main();
          setTimeout(() => {
            const ROUND_END_RELOAD = window.sessionStorage.roundEndReload;
            if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'true') {
              request('enterDrew', true); // *** 서로 새로고침 하면 없어야 됨
            } else if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'false') {
            }
            // storageMethod('s', 'REMOVE_ITEM', 'betResulting');
            storageMethod('s', 'REMOVE_ITEM', encryptK1); // betResulting
            storageMethod('s', 'REMOVE_ITEM', 'roundEndReload');
            // setSocketEnterDrewCheck(true);
            setTimeout(() => {
              /* if (!window.sessionStorage.drewReady || window.sessionStorage.drewReady !== 'true') request('enterDrew', false);
              if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === 'true') {
                // if (window.sessionStorage.betUser === 'true') createBattleCardNum();
                // betUser === 'true'
                const decryptVal = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
                const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
                const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
                if (encryptVal2 === decryptVal) createBattleCardNum(); // betUser === true
              } */
              const encryptKey1 = findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]); // drewReady
              const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
              if (
                (encryptVal1 === null || encryptVal1 === '') ||
                (encryptVal1 !== null && encryptVal1 !== '' && !X.dec(encryptVal1))
              ) request('enterDrew', false);
              if (encryptVal1 !== null && encryptVal1 !== '' && X.dec(encryptVal1)) {
                // if (window.sessionStorage.betUser === 'true') createBattleCardNum();
                // betUser === 'true'
                const encryptKey2 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
                const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
                // if (encryptVal2 === decryptVal_1) // betUser === true
                if (encryptVal2 !== null && encryptVal2 !== "" && X.dec(encryptVal2)) // betUser === true
                  createBattleCardNum();
              };
            }, timeInterval_102);
          }, timeInterval_101);
        } else {
          /* if (!window.sessionStorage.drewReady || window.sessionStorage.drewReady !== 'true') request('enterDrew', false);
          if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === 'true') {
            if (window.sessionStorage.betUser === 'true') createBattleCardNum();
          } */

          const encryptKey2 = findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]); // drewReady
          const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
          if (
            (encryptVal2 === null || encryptVal2 === '') ||
            (encryptVal2 !== null && encryptVal2 !== '' && !X.dec(encryptVal2))
          ) request('enterDrew', false);
          if (encryptVal2 !== null && encryptVal2 !== '' && X.dec(encryptVal2)) {
            // if (window.sessionStorage.betUser === 'true') createBattleCardNum();
            const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);  // betUser
            const encryptVal3 = storageMethod('s', 'GET_ITEM', encryptKey3);
            if (encryptVal3 !== null && encryptVal3 !== null && X.dec(encryptVal3)) createBattleCardNum();
          }
        }
      }, timeInterval_100);
    } else if (!_data) {
      setTimeout(() => {
        request('enterDrew', true);
      }, timeInterval_1000);
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterPlayingResult() 함수를 못탐 22 ::: ' });
  });
  // 명령
};
