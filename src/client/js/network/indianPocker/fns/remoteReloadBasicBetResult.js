import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';


// _data 배열이 두자리 숫자 8개의 배열인지 아닌지 확인
const isTwoDigitArrayOf8 = (arr) =>
  Array.isArray(arr) &&
  arr.length === 8 &&
  arr.every((n) => Number.isInteger(n) && n >= 10 && n <= 116);

/**
 * playing 결과 animation 중 새로고침 한 peer가 받음
 * 상대 peer의 playing 결과 animation 이 끝난 후 받아서, 다음 단계로 진행시킴
 * @param {Array<number>} _data basicBet storage key
 * @returns null
 */
export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    if (isTwoDigitArrayOf8(_data)) {
      resolve(_data);
    } else {
      reject(throwObj('dataManipulation', 'remoteReloadBasicBetResult - _data validate failed.'));
    }
  });
  PROMISE.then((_data) => {
    // basicBet
    if (JSON.stringify(_data) === JSON.stringify([98, 97, 115, 105, 99, 66, 101, 116])) {
      // basicBet
      // const reloadUser = window.sessionStorage.playingReloadUser;
      const encryptKey1 = findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]); // playingReloadUser
      const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

      // if (reloadUser && reloadUser === 'true') {
      // reloadUser === true
      if (
        encryptVal1 !== null &&
        encryptVal1 !== '' &&
        X.dec(encryptVal1) &&
        getRL(true) // ** 필수코드 : 새로고침을 false로 해놔야 CHOICE_CARD_DATA_HANDLER.handleReload로 안감
      ) {
        // storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');
        // storageMethod('s', 'REMOVE_ITEM', encryptKey1); // playingReloadUser
        storageMethod('s', 'REMOVE_VALUE', '', '', [
          encryptKey1, // playingReloadUser
          findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]), // betResulting
          findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
        ]);

        // storageMethod('s', 'SET_ITEM',
        //   findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
        //   X.enc(decodeTF(_t([120, 111, 98, 105, 117]))) // "xobiu" : false
        // );

        const encryptKey2 = findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]); // drewState
        const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
        if (encryptVal2 !== null && encryptVal2 !== '' && X.dec(encryptVal2)) {
          // ** 새로고침 전 같은카드 였음
        } else {
          // ** 새로고침 전 이기거나 졌음
          storageMethod('s', 'REMOVE_VALUE', '', '', [
            findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
            findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
          ]);

          storageMethod('s', 'SET_ITEM',
            findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]), // gameState
            findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]) // basicBet
          );

          storageMethod('s', 'SET_ITEM',
            findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
            findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]) // basicBetting
          );

          storageMethod('s', 'SET_ITEM',
            findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
            X.enc(decodeTF(_t([120, 103, 118, 105, 117]))), // "xgviu" : false
          );

          storageMethod('s', 'SET_ITEM', findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), ''); // drewState
          storageMethod('s', 'SET_ITEM', findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), ''); // drewReady
          storageMethod('s', 'SET_ITEM', findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), ''); // dropState
          storageMethod('s', 'SET_ITEM', findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), ''); // coinsEnemyLocalFold
          storageMethod('s', 'SET_ITEM', findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), ''); // coinsPlayerLocalFold
          storageMethod('s', 'SET_ITEM', findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), ''); // coinsEnemyRemoteFold
          storageMethod('s', 'SET_ITEM', findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), ''); // coinsPlayerRemoteFold
          storageMethod('s', 'SET_ITEM', findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), ''); // foldUser
          storageMethod('s', 'SET_ITEM', findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), ''); // foldState
        };





        function storageCheck() {
          const storageArr = [
            findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
            findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
            findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]), // basicBetReady
            findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
            findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
            findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
            findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]), // coinsPlayer
            findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
            findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
            findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]), // coinsEnemy
            findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet // 10
            findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
            findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
            findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
            findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), // drewState
            findCharCode([79, 85, 77, 74, 71, 78, 80, 67, 81, 72]), // result
            findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), // dropState
            findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), // coinsEnemyLocalFold ---------------------
            findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), // coinsPlayerLocalFold --------------------
            findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), // coinsEnemyRemoteFold --------------------
            findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), // coinsPlayerRemoteFold ------------------- // 20
            findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), // foldUser --------------------------------
            findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), // foldState -------------------------------
            findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
            findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]), // playingReloadUser
            findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
            findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
          ];
          storageArr.forEach((item, index) => {
            const val = storageMethod("s", "GET_ITEM", item);
            if (val === null) console.log('없는 data :::::::: ', index);
          })
        };
        storageCheck();







        sessionInit();
      }
    } else {
      throw throwObj('dataManipulation', 'remoteReloadBasicBetResult - basicBet key failed.');
    }
  }).catch((error) => {
    errorManager(error, true);
  });
};
