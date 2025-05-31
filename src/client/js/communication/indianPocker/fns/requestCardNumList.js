import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';

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
    const encryptCardNum = decrypted.split(',');

    // 상대 peer에게 상대 cardNum을 보내
    request('responseCardNumList', {
      step: 'randomNumCard',
      encryptCardNum: encryptCardNum,
      storeageKey: storeageKey,
    });
  }

  // nextStep ----------------------------------------
  if (step === 'nextStep') {
    // AES로 암호화
    const encryptCardNum = CryptoJS.AES.encrypt(list, secretKeyVal).toString();

    // 상대 peer에게 암호화된 cardNum 보내
    request('responseCardNumList', {
      step: 'nextStep',
      encryptCardNum: encryptCardNum,
      storeageKey: storeageKey,
    });
  }
};
