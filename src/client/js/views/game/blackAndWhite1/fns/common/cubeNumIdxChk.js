import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import CryptoJS from "crypto-js";
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";

/**
 * 사용자가 악의적으로 html의 큐브 숫자를 변경할 수 있음
 * playerNumOrder과 cube의 숫자들이 맞는지 체크
 */
export default () => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) {
      throw throwObj('errorComn', 'cubeNumIdxChk - order decrypt key failed.');
    };

    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    if (decrypted === "") {
      throw throwObj('sessionStorageLoss', 'cubeNumIdxChk - order decrypt value failed.');
    };
    const playerNumOrder = [...decrypted].map(Number);

    const shuffleCube = document.querySelectorAll("ul.cube li");
    [].forEach.call(shuffleCube, (cubeEl, index) => {
      const cubeNum = parseInt(cubeEl.innerHTML);
      const orderIdx = playerNumOrder[index];
      if (cubeNum !== orderIdx) {
        // 사용자가 악의로 큐브 li 의 숫자를 바꿨다면,
        // playerNumOrder 배열 내부 숫자대로 재정의
        cubeEl.innerHTML = orderIdx;
        evenOdd(cubeEl);
      }
    });
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'cubeNumIdxChk.js error'
    );
  }
}
