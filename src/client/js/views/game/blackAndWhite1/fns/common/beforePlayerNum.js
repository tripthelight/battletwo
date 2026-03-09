import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import CryptoJS from "crypto-js";
import { request } from '@/client/js/network/blackAndWhite1/request';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';

export default (num, index) => {
  try {
    // const PVK = KEY?.prk ?? null; // private key
    // if (!PVK) throw throwObj('errorComn', 'beforePlayerNum - order decrypt key failed.');
    // const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    // const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    // const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    // if (decrypted === "") throw throwObj('sessionStorageLoss', 'beforePlayerNum - order decrypt value failed.');
    // const playerNumOrder = [...decrypted].map(Number);
    // console.log("playerNumOrder >>>>>>>> ", playerNumOrder);

    window.sessionStorage.setItem("beforePlayerNum", num);
    request("beforePlayerNumber", { index })
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'beforePlayerNum.js error'
    );
  }
};
