import CryptoJS from 'crypto-js';
import { request } from '@/client/js/communication/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import { timeInterval_1 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';

/**
 * 상대 peer의 secret key로 복호화한 내 cardNum 리스트를 받아서 이후 단계 진행
 * @param
 * @param
 * @return null
 */
export default (data) => {
  const { step, list, storeageKey } = data;

  const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);

  if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음' });
  }

  // encryptCardNum ----------------------------
  if (step === 'encryptCardNum') {
    const bytes = CryptoJS.AES.decrypt(list, secretKeyVal);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    const encryptCardNum = decrypted.split(',');

    // 상대 peer에게 복호화된 상대 cardNum을 보내
    request('responseRemoveEnemyCardNum', {
      step: 'decryptCardNum',
      list: encryptCardNum,
      storeageKey: storeageKey,
    });
  }

  // decrypeList ----------------------------
  if (step === 'decrypeList') {
    // AES로 암호화
    const encryptCardNum = CryptoJS.AES.encrypt(list, secretKeyVal).toString();

    // 상대 peer에게 암호화된 cardNum 보내
    request('responseRemoveEnemyCardNum', {
      step: 'nextStep',
      list: encryptCardNum,
      storeageKey: storeageKey,
    });
  }
};
