import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import make20 from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/make20";

export default async (_state) => {
  try {
    // const PN = window.sessionStorage.pn;
    // if (!PN) throw throwObj("sessionStorageLoss", "pn not found");
    // const ARR20 = await make20(JSON.parse(PN));

    const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
    if (!encryptVal1) throw throwObj('sessionStorageLoss', "playerImageList.js - pn failed.");
    const ARR20 = await make20(JSON.parse(encryptVal1));

    return new Promise((resolve, reject) => {
      resolve(_state === "win" ? [...ARR20].reverse() : ARR20);
    });
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'make 20 error');
  }
};
