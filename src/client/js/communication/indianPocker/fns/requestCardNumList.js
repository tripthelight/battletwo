import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { request } from '@/client/js/communication/indianPocker/request';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

export default (data) => {
  const { step, list, storeageKey } = data;

  const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);

  if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음' });
  }

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    const bytes = CryptoJS.AES.decrypt(list, secretKeyVal);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const remoteCardNum = decrypted.split(',');

    const remoteRandomNum = randomArray(remoteCardNum);
    // 상대 peer 카드번호 저장
    // validateStore.dispatch(updateRandomNum({ randomNum: remoteRandomNum }));
    storageMethod('s', 'SET_ITEM', 'battleCardNum', remoteRandomNum);
    for (let i = 0; i < remoteCardNum.length; i++) {
      if (remoteCardNum[i] === remoteRandomNum) {
        remoteCardNum.splice(i, 1);
        break;
      }
    }

    // AES로 암호화
    const encryptRemoveCardNum = CryptoJS.AES.encrypt(remoteCardNum.join(), secretKeyVal).toString();

    const encryptLocalKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
    const decryptLocalVal = window.sessionStorage.getItem(encryptLocalKey);
    if (decryptLocalVal === null || (decryptLocalVal !== null && decryptLocalVal === '')) {
      return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 세션이 없거나 length가 없습니다.' });
    }

    request('responseCardNumList', {
      step: 'randomNumCard',
      encryptCardNum: {
        local: encryptRemoveCardNum,
        remote: decryptLocalVal,
      },
      storeageKey: {
        local: storeageKey,
        remote: encryptLocalKey,
      },
    });
  }

  // nextStep ----------------------------------------
  if (step === 'nextStep') {
    storageMethod('s', 'SET_ITEM', storeageKey, list);

    request('responseCardNumList', {
      step: 'nextStep',
    });

    // 다음 함수 실행
    drawPlayerCard();
  }
};
