import findCharCode from '@/client/js/functions/findCharCode';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
// import validateStore, { updateRandomNum } from '@/client/store/validateStore';
import { request } from '@/client/js/network/indianPocker/request';
// import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
// import CryptoJS from 'crypto-js';
// import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import drawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawPlayerCard';
import isArrayLikeString from '@/client/js/module/isArrayLikeString';
// import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';

export default async (data) => {
  // const { step, list, storeageKey } = data;
  const { step, remoteLen, battleCard } = data;

  // const secretKeyKey = findCharCode([83, 88, 73, 69, 85, 68, 66, 76, 80, 78]); // SECRET_KEY
  // const secretKeyVal = window.sessionStorage.getItem(secretKeyKey);
  // if (secretKeyVal === null || (secretKeyVal !== null && secretKeyVal === '')) {
  //   return errorManagement({ errCase: 'sessionStorageLoss', message: 'cardNum 복호화시 필요한 secret key 세션 없음 1' });
  // }

  const encryptKey1 = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // cardNum
  const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (decryptVal1 === null) {
    // 상대 카드 받았는데, 내 카드리스트(cardNum) 없음 - 내 반칙
    return errorManagement({ errCase: 'sessionStorageLoss', message: '상대 카드 받았는데, 내 카드리스트(cardNum) 없음' });
  }
  if (!isArrayLikeString(decryptVal1)) {
    // 상대 카드 받았는데, 내 카드리스트(cardNum)가 문자열 배열이 아님 - 내 반칙
    return errorManagement({ errCase: 'sessionStorageLoss', message: '상대 카드 받았는데, 내 카드리스트(cardNum)가 문자열 배열이 아님' });
  }
  /* if (!isArrayLikeString(list)) {
    // 상대 카드 받았는데, 상대 카드리스트가 문자열 배열이 아님 - 상대 반칙
    request('opponentFouls', { subject: 'remote', message: '내 카드리스트가 문자열 배열이 아님' });
    return errorManagement({ errCase: 'foul', message: '상대 카드 받았는데, 상대 카드리스트가 문자열 배열이 아님' });
  } */
  const cardNumArr = JSON.parse(decryptVal1) || [];
  if (cardNumArr.length <= 0) {
    // 내 카드 리스트(cardNum)가 0개임
    return errorManagement({ errCase: 'sessionStorageLoss', message: '내 카드 리스트(cardNum)가 0개임' });
  };

  if (remoteLen !== cardNumArr.length) {
    // 내 카드 리스트(cardNum) 개수와 상대 카드 리스트 개수 다름
    return errorManagement({ errCase: 'sessionStorageLoss', message: '내 카드 리스트(cardNum) 개수와 상대 카드 리스트 개수 다름' });
  }

  storageMethod(
    's',
    'SET_ITEM',
    findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
    battleCard,
  );

  // randomNumCard ----------------------------------------
  if (step === 'randomNumCard') {
    // console.log('상대의 기본배팅을 받고 ------------------ ');
    // console.log('step :::::::::: ', step);
    // console.log('list :::::::::: ', list);
    // console.log('storeageKey ::: ', storeageKey);

    // STEP 1 : 상대의 카드 리스트(list) 개수와 내 카드 개수가 같은지 비교
    /* if (JSON.parse(decryptVal1).length !== JSON.parse(list).length) {
      // 상대 카드 받았는데, 내 카드리스트와 상대 카드리스트 개수 다름
      return errorManagement({ errCase: 'sessionStorageLoss', message: '상대 카드 받았는데, 내 카드리스트와 상대 카드리스트 개수 다름' });
    } */

    // STEP 2 : battleCardNum 생성
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      return errorManagement({ errCase: "cardNum", message: 'requestCardNumList battle cardNum length failed.' });
    }
    const battleCard = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];

    // STEP 3 : 상대에게 보냄
    request('responseCardNumList', {
      step: 'nextStep',
      battleCard,
    });

    // STEP 4 : 다음 함수 실행
    drawPlayerCard();

    /* const bytes = CryptoJS.AES.decrypt(list, secretKeyVal);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8); */

    /**
     * 복호화 실패할 경우 결과는 빈 string
      - 상대가 storage value를 바꿨다거나..
     */

    /* if (decrypted === '') {
      request('opponentFouls', { subject: 'remote', message: '상대 cardNum이 없음' });
      return errorManagement({ errCase: 'foul', message: 'req : cardNum 복호화시 필요한 secret key 세션 없음' });
    }

    let remoteCardNum = decrypted.split(',');

    const remoteRandomNum = randomArray(remoteCardNum);
    // 상대 peer 카드번호 저장
    // validateStore.dispatch(updateRandomNum({ randomNum: remoteRandomNum }));

    const encryptKey1 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
    // storageMethod('s', 'SET_ITEM', 'battleCardNum', remoteRandomNum);
    storageMethod('s', 'SET_ITEM', encryptKey1, remoteRandomNum);

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

    const encryptLocalKey = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]);
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
    }); */
  }

  // nextStep ----------------------------------------
  // if (step === 'nextStep') {
  //   // storageMethod('s', 'SET_ITEM', storeageKey, list);
  //   // request('responseCardNumList', {
  //   //   step: 'nextStep',
  //   // });

  //   storageMethod(
  //     's',
  //     'SET_ITEM',
  //     findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
  //     battleCardNum,
  //   );

  //   // 다음 함수 실행
  //   drawPlayerCard();
  // }
};
