import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
import encryptionStore from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default async () => {
  return new Promise((resolve, reject) => {
    const encryptKey1 = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    const encryptVal1 = findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]); // waitEnemy
    const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
    // secret key를 sessionStorage에 저장
    const encryptKey2 = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
    const decryptVal2 = window.sessionStorage.getItem(encryptKey2);
    // gameState가 waitEnemy 이고 secretKey가 없을 때만 주입
    // TODO: 이 후, secretKey가 없는 경우는 사용자가 삭제한 경우 이므로 error 처리 필요
    if (decryptVal1 === encryptVal1) {
      if (decryptVal1 !== null && decryptVal2 === null) {
        const compair = encryptionStore.getState().encryptionState.compair;
        storageMethod('s', 'SET_ITEM', encryptKey2, compair[encryptKey2]);
      }
    } else {
      // 사용자가 waitEnemy 단계에서 gameState value를 악의적으로 고침
      // errorManagement({ errCase: 'sessionStorageLoss', message: '사용자가 waitEnemy 단계에서 gameState value를 악의적으로 고침' });
      request('opponentFouls', { message: '상대가 waitEnemy 단계에서 gameState value를 악의적으로 고침' });
      reject({ errCase: 'sessionStorageLoss', message: '내가 waitEnemy 단계에서 gameState value를 악의적으로 고침' });
    }

    resolve();
  });
};
