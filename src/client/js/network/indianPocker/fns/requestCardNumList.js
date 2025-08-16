import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { request } from '@/client/js/network/indianPocker/request';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from 'crypto-js';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

export default async (data) => {
  const { step, list, storeageKey } = data;

  const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);

  if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
    return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음 1' });
  }

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    const bytes = CryptoJS.AES.decrypt(list, secretKeyVal);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    /**
     * 복호화 실패할 경우 결과는 빈 string
      - 상대가 storage value를 바꿨다거나..
     */

    if (decrypted === '') {
      request('opponentFouls', { subject: 'remote', message: '상대 cardNum이 없음' });
      return errorManagement({ errCase: 'foul', message: 'req : cardNum 복호화시 필요한 secret key 세션 없음' });
    }

    let remoteCardNum = decrypted.split(',');

    const remoteRandomNum = randomArray(remoteCardNum);
    // 상대 peer 카드번호 저장
    // validateStore.dispatch(updateRandomNum({ randomNum: remoteRandomNum }));
    storageMethod('s', 'SET_ITEM', 'battleCardNum', remoteRandomNum);

    console.log('1 card del : remoteCardNum.length : ', remoteCardNum.length);

    for (let i = 0; i < remoteCardNum.length; i++) {
      if (remoteCardNum[i] === remoteRandomNum) {
        remoteCardNum.splice(i, 1);
        break;
      }
    }

    console.log('2 card del : remoteCardNum : ', remoteCardNum);

    // 20장 모두 소진 시 - 새 카드 set 생성
    if (!remoteCardNum.length) {
      console.log('카드 0개 >>>>>>>>>>>>>>>>>>> ', remoteCardNum);
      remoteCardNum = await encryptCardNumber();
      console.log('카드 추가 >>>>>>>>>>>>>>>>>>> ', remoteCardNum);
    }

    console.log('3 card del : remoteCardNum.length : ', remoteCardNum.length);

    // AES로 암호화
    const encryptRemoveCardNum = CryptoJS.AES.encrypt(remoteCardNum.join(), secretKeyVal).toString();

    console.log('4 card del : encryptRemoveCardNum : ', encryptRemoveCardNum);

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
