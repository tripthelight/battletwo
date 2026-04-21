import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { saveEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';

export default (_idx) => {
  try {
    const ENEMY_BLOCK_LIST = document.querySelector('.enemy-block-list');
    if (!ENEMY_BLOCK_LIST) return;

    const PVK = KEY?.prk ?? null;
    if (!PVK) throw throwObj('errorComn', 'emenyCubeReset - order decrypt key failed.');

    const encryptKey1 = findCharCode([86, 82, 88, 89, 90, 72, 71, 84, 74, 85]); // emenyCube
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
    if (!encryptVal1) return;

    const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    if (decrypted === '') throw throwObj('sessionStorageLoss', 'emenyCubeReset - order decrypt value failed.');

    const enemyCubeArr = decrypted.split(',');
    if (!Number.isInteger(_idx) || _idx < 0 || _idx >= enemyCubeArr.length) return;

    saveEnemyBeforeCube(enemyCubeArr[_idx]);
    enemyCubeArr.splice(_idx, 1);

    const hash = CryptoJS.AES.encrypt(enemyCubeArr.join(','), PVK).toString();
    storageMethod('s', 'SET_ITEM', encryptKey1, hash);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'emenyCubeReset.js error'
    );
  }
};
