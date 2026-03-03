import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';

export default () => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) {
      throw throwObj('errorComn', 'saveSessionStorage - order decrypt key failed.');
    };

    // 8진수 영문을 받아서 10진수 정수 반환
    const cryptoOrder = (arr) => dec(enc(encryptNumOfStr(_t(arr))));

    let playerNumOrder = [];

    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    const encryptKey2 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
    const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);

    // round value가 "" 이고
    // playerNumOrder value가 "" 이면
    // 최초 진입
    if (
      (!encryptVal1 && !encryptVal2) || // playerNumOrder 도 없고, round도 없다
      (
        !encryptVal1 &&
        (
          encryptVal2 && dec(encryptVal2) === 1
        )
      ) // playerNumOrder 없고, round 있는데, 1 round다.
    ) {
      // 최초 진입
      playerNumOrder = [
        cryptoOrder([101,119,119,119,101,101,101,101]), // "ewwweeee" : 0
        cryptoOrder([101,119,101,119,101,119,119,114]), // "ewewewwr" : 1
        cryptoOrder([119,119,119,119,101,101,101,112]), // "wwwweeep" : 2
        cryptoOrder([119,101,101,119,101,119,101,122]), // "weewewez" : 3
        cryptoOrder([101,119,119,119,119,101,101,111]), // "ewwwweeo" : 4
        cryptoOrder([101,119,119,101,101,119,119,107]), // "ewweewwk" : 5
        cryptoOrder([101,119,101,119,119,101,119,100]), // "ewewwewd" : 6
        cryptoOrder([119,101,101,101,101,101,119,117]), // "weeeeewu" : 7
        cryptoOrder([101,119,119,119,101,119,119,53]), // "ewwweww5" : 8
      ]; // [0,1,2,3,4,5,6,7,8] 의 난독화
    } else {
      // 최초 진입 후 1번 이상 큐브 위치를 변경
      const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
      if (decrypted === "") {
        throw throwObj('sessionStorageLoss', 'saveSessionStorage - order decrypt value failed.');
      };

      playerNumOrder = [...decrypted].map(Number);
    }

    function arrChangeIndex(startIdx, endIdx) {
      if (!Number.isInteger(startIdx) || !Number.isInteger(endIdx)) return;
      if (startIdx === endIdx) return;
      if (startIdx < 0 || endIdx < 0) return;
      if (startIdx >= playerNumOrder.length || endIdx >= playerNumOrder.length) return;

      [playerNumOrder[startIdx], playerNumOrder[endIdx]] = [playerNumOrder[endIdx], playerNumOrder[startIdx]];
    };

    if (reactiveState.idxS !== null && reactiveState.idxE !== null) {
      arrChangeIndex(reactiveState.idxS, reactiveState.idxE);
      reactiveState.idxS = null;
      reactiveState.idxE = null;
    };

    // 옯긴 큐브 순서
    console.log("옯긴 큐브 순서 >>>>>>>> ", playerNumOrder);

    const orderStr = playerNumOrder.join("");
    const hash = CryptoJS.AES.encrypt(orderStr, PVK).toString();

    storageMethod("s", "SET_ITEM",
      findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
      hash // 옮긴 큐브 순서를 AES 암호화한 문자열
    );
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'saveSessionStorage.js error'
    );
  }
};
