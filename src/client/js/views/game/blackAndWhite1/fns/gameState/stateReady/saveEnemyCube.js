import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (remoteOrder) => {
  try {
    const PVK = KEY?.prk ?? null; // private key
    if (!PVK) throw throwObj('errorComn', 'saveEnemyCube - order decrypt key failed.');

    console.log("remoteOrder >>>>>>>>>>>>>> ", remoteOrder);


    const remoteOrderStr = remoteOrder.join(",");
    const hash = CryptoJS.AES.encrypt(remoteOrderStr, PVK).toString();

    storageMethod("s", "SET_ITEM",
      findCharCode([86, 82, 88, 89, 90, 72, 71, 84, 74, 85]), // emenyCube
      hash
    );
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'saveEnemyCube.js error'
    );
  }
};
