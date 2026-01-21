import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import isArrayLikeString from '@/client/js/module/isArrayLikeString';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import { request } from '@/client/js/network/indianPocker/request';

export default () => {
  /*
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (BATTLE_CARD_NUM && JSON.parse(BATTLE_CARD_NUM).length === 2) return;
  const CARD_NUMS = JSON.parse(window.sessionStorage.cardNum);
  if (!CARD_NUMS || CARD_NUMS.length <= 0) return errorManagement({ errCase: 'errorComn', message: 'cardNum 세션이 없거나 length가 없습니다.' });
  */

  // const BATTLE_CARD_NUM = window.sessionStorage.getItem('battleCardNum');
  // if (BATTLE_CARD_NUM !== null && BATTLE_CARD_NUM !== '') return;
  const encryptKey3 = findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]); // battleCardNum
  const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
  if (encryptVal3 !== null && encryptVal3 !== '') return;

  // sessionStorage cardNum key 찾기
  const encryptKey2 = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // cardNum
  const decryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // const CARD_NUMS = JSON.parse(decryptVal);
  // if (!CARD_NUMS || CARD_NUMS.length <= 0) return errorManagement({ errCase: 'errorComn', message: 'cardNum 세션이 없거나 length가 없습니다.' });

  if (decryptVal2 === null || (decryptVal2 !== null && decryptVal2 === '')) {
    // 내 카드 리스트(cardNum) 없음
    return errorManagement({ errCase: 'sessionStorageLoss', message: '내 카드 리스트(cardNum) 없음' });
  }
  if (!isArrayLikeString(decryptVal2)) {
    // 내 카드 리스트(cardNum)가 배열 형식의 문자열이 아님
    return errorManagement({ errCase: 'sessionStorageLoss', message: '내 카드 리스트(cardNum)가 배열 형식의 문자열이 아님' });
  }
  const cardNumArr = JSON.parse(decryptVal2) || [];
  if (cardNumArr.length <= 0) {
    // 내 카드 리스트(cardNum)가 0개임
    return errorManagement({ errCase: 'sessionStorageLoss', message: '내 카드 리스트(cardNum)가 0개임' });
  };

  // 상대 화면에 보여질 내 카드 번호 추출 - 이 카드 번호는 상대 keypair로만 decrypt 가능
  const arrNumbs = selectCompairNumbers();
  if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
    return errorManagement({ errCase: "cardNum", message: 'create battle cardNum length failed.' });
  };
  const battleCard = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];

  // 상대 peer에게 내 cardNum을 보내
  request('requestCardNumList', {
    step: 'randomNumCard',
    remoteLen: cardNumArr.length,
    battleCard,
  });

  /* // 상대 peer에게 내 cardNum을 보내
  request('requestCardNumList', {
    step: 'randomNumCard',
    list: decryptVal2,
    storeageKey: encryptKey2,
  }); */

  /*

  const randomNum = randomArray(CARD_NUMS);
  for (let i = 0; i < CARD_NUMS.length; i++) {
    if (CARD_NUMS[i] === randomNum) {
      CARD_NUMS.splice(i, 1);
      break;
    }
  }
  // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(CARD_NUMS));
  storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(CARD_NUMS));
  setTimeout(sessionActiveCard, timeInterval_1, 'player', randomNum);
  */
};
