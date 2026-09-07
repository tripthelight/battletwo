import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { saveEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';

export default (_idx) => {
  try {
    const enemyBlockList = document.querySelector('.enemy-block-list');
    if (!enemyBlockList) return;

    const privateKey = KEY?.prk ?? null;
    if (!privateKey) {
      throw throwObj('errorComn', 'emenyCubeReset - order decrypt key failed.');
    }

    const enemyCubeKey = findCharCode([
      86, 82, 88, 89, 90, 72, 71, 84, 74, 85,
    ]); // emenyCube

    const encryptedEnemyCube = storageMethod('s', 'GET_ITEM', enemyCubeKey);
    if (!encryptedEnemyCube) return;

    const decrypted = CryptoJS.AES
      .decrypt(encryptedEnemyCube, privateKey)
      .toString(CryptoJS.enc.Utf8);

    if (decrypted === '') {
      throw throwObj('sessionStorageLoss', 'emenyCubeReset - order decrypt value failed.');
    }

    const enemyCubeArr = decrypted.split(',');

    if (
      !Number.isInteger(_idx) ||
      _idx < 0 ||
      _idx >= enemyCubeArr.length
    ) {
      throw throwObj('dataManipulation', 'emenyCubeReset - cube index failed.');
    }

    // 새로고침 시 현재 Round에서 상대가 이미 제출한 Cube의 색을 복원하기 위해 저장한다.
    saveEnemyBeforeCube(enemyCubeArr[_idx]);

    enemyCubeArr.splice(_idx, 1);

    const encryptedNextOrder = CryptoJS.AES
      .encrypt(enemyCubeArr.join(','), privateKey)
      .toString();

    storageMethod('s', 'SET_ITEM', enemyCubeKey, encryptedNextOrder);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'emenyCubeReset.js error'
    );
  }
};
