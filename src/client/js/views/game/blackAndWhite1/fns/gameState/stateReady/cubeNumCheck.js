import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { request } from '@/client/js/network/blackAndWhite1/request';
import cubeColorCode from '@/client/js/views/game/blackAndWhite1/fns/common/cubeColorCode';

export default () => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) throw throwObj('errorComn', 'cubeNumCheck - order decrypt key failed.');

    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    if (decrypted === "") throw throwObj('sessionStorageLoss', 'cubeNumCheck - order decrypt value failed.');

    const playerNumOrder = [...decrypted].map(Number);

    const cubeColors = [];

    for (let i = 0; i < playerNumOrder.length; i++) {
      cubeColors.push(cubeColorCode(playerNumOrder[i] % 2 === 0, i));
    };

    const orderStr = cubeColors.join("");
    const hash = CryptoJS.AES.encrypt(orderStr, PVK).toString();

    storageMethod("s", "SET_ITEM",
      findCharCode([79, 77, 69, 88, 68, 89, 65, 70, 67, 78]), // numArr
      hash
    );

    request('enemyCubeOrder', { order: cubeColors });
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'cubeNumCheck.js error'
    );
  }

  /*
  const numArr = [];
  const CUBE_LIST = document.querySelectorAll("ul.cube li");
  if (CUBE_LIST) {
    for (let i = 0; i < CUBE_LIST.length; i++) {
      numArr.push(Number(CUBE_LIST[i].innerHTML) % 2 === 0 ? "even" : "odd");
    };
    storageMethod("s", "SET_ITEM",
      findCharCode([79, 77, 69, 88, 68, 89, 65, 70, 67, 78]), // numArr
      JSON.stringify(numArr)
    );
  };

  request('enemyCubeOrder', { order: numArr });
  */
};
