import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { getRL } from '@/client/js/module/webRTC/connectSignaling';
import sessionInit from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/sessionInit';
import reloadBasicBetComn from '@/client/js/network/indianPocker/fns/reloadBasicBetComn';

// _data 배열이 두자리 숫자 8개의 배열인지 아닌지 확인
const isTwoDigitArrayOf8 = (arr) =>
  Array.isArray(arr) &&
  arr.length === 8 &&
  arr.every((n) => Number.isInteger(n) && n >= 10 && n <= 116);

/**
 * playing 결과 animation 중 새로고침 한 peer > 상대도 역시 새로고침
 * 여기를 왔다는 건, 내가 새로고침 했는데, 상대도 새로고침 해서 상대 역시 대기중임
 * 마지막 새로고침 당한 PEER가 받아서, 다음 단계로 진행시킴
 * @param {Array<number>} _data basicBet storage key
 * @returns null
 */
export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    if (isTwoDigitArrayOf8(_data)) {
      resolve(_data);
    } else {
      reject(throwObj('dataManipulation', 'responseDoubleReload - _data validate failed.'));
    }
  });
  PROMISE.then((_data) => {
    // basicBet
    if (JSON.stringify(_data) === JSON.stringify([98, 97, 115, 105, 99, 66, 101, 116])) {
      const encryptKey1 = findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]); // playingReloadUser
      const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

      if (
        encryptVal1 !== null
        && encryptVal1 !== ''
        && X.dec(encryptVal1)
        // && getRL(true) // ** 필수코드 : 새로고침을 false로 해놔야 CHOICE_CARD_DATA_HANDLER.handleReload로 안감
      ) {
        reloadBasicBetComn();
        sessionInit(true);
      }
    } else {
      throw throwObj('dataManipulation', 'responseDoubleReload - basicBet key failed.');
    };
  }).catch((error) => {
    errorManager(error, true);
  });
};
