import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import make20Enemy from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/make20Enemy";

export default async () => {
  try {
    // const EN = window.sessionStorage.en;
    // if (!EN) throw throwObj('sessionStorageLoss', 'en not found');
    // const ENEMY_LIST = await make20Enemy(JSON.parse(EN));

    const encryptKey1 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
    if (!encryptVal1) throw throwObj('sessionStorageLoss', "enemyImageList.js - en failed.");
    const ENEMY_LIST = await make20Enemy(JSON.parse(encryptVal1));

    return new Promise((resolve, reject) => {
      resolve([...ENEMY_LIST].reverse());
    });
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'make 20 error');
  }
};
