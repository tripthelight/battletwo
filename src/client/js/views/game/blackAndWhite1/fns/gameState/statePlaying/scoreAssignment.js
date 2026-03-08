import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import CryptoJS from 'crypto-js';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import passScore from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/passScore";

export default (result) => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) throw throwObj('errorComn', 'scoreAssignment - order decrypt key failed.');

    const encryptKey1 = findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]); // round
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    const encryptKey2 = findCharCode([71, 73, 69, 77, 83, 78, 89, 88, 82, 66]); // result
    const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);

    let resArr = [];

    if (encryptVal2 !== null && encryptVal2 !== "") {
      const bytes = CryptoJS.AES.decrypt(encryptVal2, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
      if (decrypted === "") {
        throw throwObj('sessionStorageLoss', 'scoreAssignment - order decrypt value failed.');
      };
      // 1. 객체 키를 큰따옴표로 감싸기
      let jsonStr = decrypted.replace(/(\w+)\s*:/g, '"$1":');
      // 2. 문자열 값도 작은따옴표 → 큰따옴표
      jsonStr = jsonStr.replace(/'([^']*)'/g, '"$1"');
      resArr = JSON.parse(jsonStr);
    };

    let newObj = {
      round: dec(encryptVal1),
      result: result,
    };

    resArr.push(newObj);
    const orderStr = JSON.stringify(resArr).replace(/"([^"]+)":/g, '$1:').replace(/"/g, "'");
    const hash = CryptoJS.AES.encrypt(orderStr, PVK).toString();

    storageMethod("s", "SET_ITEM", encryptKey2, hash);
    passScore(resArr);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'scoreAssignment.js error'
    );
  }

  /*
  let resArr = [];
  if (window.sessionStorage.getItem("result")) {
    resArr = JSON.parse(window.sessionStorage.getItem("result"));
  }
  let newObj = {
    round: window.sessionStorage.getItem("round"),
    result: result,
  };

  resArr.push(newObj);
  window.sessionStorage.setItem("result", JSON.stringify(resArr));
  passScore(resArr);
  */
};
