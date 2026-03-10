import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';

/**
 * @param {number} _num 내가 선택에서 버린 큐브의 번호
 */
export default (_num) => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) {
      throw throwObj('errorComn', 'changeCubeSession - order decrypt key failed.');
    };

    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    if (decrypted === "") {
      throw throwObj('sessionStorageLoss', 'changeCubeSession - order decrypt value failed.');
    };

    const oldOrder = [...decrypted].map(Number);
    const newOrder = oldOrder.filter((v) => v !== _num);

    console.log("버린 큐브를 제거한 큐브 번호 리스트 ::::::::: ", newOrder);

    const newOrderStr = newOrder.join("");
    const hash = CryptoJS.AES.encrypt(newOrderStr, PVK).toString();

    storageMethod("s", "SET_ITEM",
      findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
      hash // 옮긴 큐브 순서를 AES 암호화한 문자열
    );

    // 새로고침 진입 시
    const BLOCK_SQUARE = document.querySelector(".black-square");
    if (BLOCK_SQUARE) {
      const SPAN_EL = BLOCK_SQUARE.querySelector("span");
      if (!SPAN_EL) {
        // const ACTIVE_NUM = window.sessionStorage.getItem("beforePlayerNum");
        const encryptKey1 = findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]); // beforePlayerNum
        const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
        // if (ACTIVE_NUM) {
        if (encryptVal1 !== null && encryptVal1 !== "") {
          const spanEl = document.createElement("span");
          // spanEl.innerHTML = ACTIVE_NUM;
          const decryptVal1 = cubeToNum(encryptVal1);
          spanEl.innerHTML = decryptVal1;
          BLOCK_SQUARE.appendChild(spanEl);
        }
      }
    };
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'changeCubeSession.js error'
    );
  };
};
