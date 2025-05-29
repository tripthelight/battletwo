import { errorManagement } from '@/client/js/module/errorManagement';
import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/communication/indianPocker/request';

export default (cardList) => {
  // 내 secret key로 받은 카드 리스트 평문을 암호화 해서 응답
  const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);

  if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음' });
  }

  // AES로 암호화
  const hash = CryptoJS.AES.encrypt(cardList, secretKeyVal).toString();
  request('responseMakeCard', { list: hash });
};
