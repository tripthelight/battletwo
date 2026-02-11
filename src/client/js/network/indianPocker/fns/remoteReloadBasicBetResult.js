import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
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
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);

      // if (reloadUser && reloadUser === 'true') {
      // reloadUser === true
      if (
        encryptVal1 !== null &&
        encryptVal1 !== '' &&
        X.dec(encryptVal1)
      ) {
        // storageMethod('s', 'REMOVE_ITEM', 'playingReloadUser');
        // storageMethod('s', 'REMOVE_ITEM', encryptKey1); // playingReloadUser
        storageMethod('s', 'REMOVE_VALUE', '', '', [
          encryptKey1, // playingReloadUser
          findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
          findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
          findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]), // betResulting
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
          findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
          X.enc(decodeTF(textDE([120, 111, 98, 105, 117]))) // "xobiu" : false
        );

        sessionInit();
      }
    } else {
      throw throwObj('dataManipulation', 'remoteReloadBasicBetResult - basicBet key failed.');
    }
  }).catch((error) => {
    errorManager(error, true);
  });
};
