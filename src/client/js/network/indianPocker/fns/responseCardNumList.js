import findCharCode from '@/client/js/functions/findCharCode';
import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/network/indianPocker/request';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import CryptoJS from 'crypto-js';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';

/**
 * 상대 peer의 secret key로 복호화한 내 cardNum 리스트를 받아서 이후 단계 진행
 * @param {Array<string>} encryptCardNum 상대 peer의 secret key로 복호화한 내 cardNum 배열
 * @param {string} storeageKey cardNum 배열을 주입할 sessionStorage key
 * @return null
 */
export default async (data) => {
  // const { step, encryptCardNum, storeageKey } = data;
  const { step, battleCard } = data;

  // const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  // const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);
  // if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
  //   return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음 4' });
  // }

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    // const arrNumbs = selectCompairNumbers();
    // if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
    //   throw { message: 'battle cardNum length failed.' };
    // }
    // const battleCardNum = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];

    // request('requestCardNumList', {
    //   step: 'nextStep',
    //   battleCardNum,
    // });

    // drawPlayerCard();

    /* storageMethod('s', 'SET_ITEM', storeageKey.local, encryptCardNum.local);

    const bytes = CryptoJS.AES.decrypt(encryptCardNum.remote, secretKeyVal);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8); */
    /**
     * 복호화 실패할 경우 결과는 빈 string
      - 상대가 storage value를 바꿨다거나..
     */
    /* if (decrypted === '') {
      request('opponentFouls', { subject: 'remote', message: '상대 cardNum이 없음' });
      return errorManagement({ errCase: 'foul', message: 'res : cardNum 복호화시 필요한 secret key 세션 없음' });
    }

    let remoteCardNum = decrypted.split(',');

    const remoteRandomNum = randomArray(remoteCardNum);
    // 상대 peer 카드번호 저장
    // validateStore.dispatch(updateRandomNum({ randomNum: remoteRandomNum }));
    // storageMethod('s', 'SET_ITEM', 'battleCardNum', remoteRandomNum);
    storageMethod('s', 'SET_ITEM',
      findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
      remoteRandomNum
    );

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

    request('requestCardNumList', {
      step: 'nextStep',
      list: encryptRemoveCardNum,
      storeageKey: storeageKey.remote,
    }); */
  }

  // nextStep ----------------------------------------
  if (step === 'nextStep') {
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
      battleCard,
    );

    // 다음 함수 실행
    drawPlayerCard();
  }
};
