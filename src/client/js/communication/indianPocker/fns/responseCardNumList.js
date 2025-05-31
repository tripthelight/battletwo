import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

/**
 * 상대 peer의 secret key로 복호화한 내 cardNum 리스트를 받아서 이후 단계 진행
 * @param {Array<string>} encryptCardNum 상대 peer의 secret key로 복호화한 내 cardNum 배열
 * @param {string} storeageKey cardNum 배열을 주입할 sessionStorage key
 * @return null
 */
export default (data) => {
  const { step, encryptCardNum, storeageKey } = data;

  const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);

  if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음' });
  }

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    storageMethod('s', 'SET_ITEM', storeageKey.local, encryptCardNum.local);

    const bytes = CryptoJS.AES.decrypt(encryptCardNum.remote, secretKeyVal);
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

    request('requestCardNumList', {
      step: 'nextStep',
      list: encryptRemoveCardNum,
      storeageKey: storeageKey.remote,
    });
  }

  // nextStep ----------------------------------------
  if (step === 'nextStep') {
    // 다음 함수 실행
    drawPlayerCard();
  }
};
