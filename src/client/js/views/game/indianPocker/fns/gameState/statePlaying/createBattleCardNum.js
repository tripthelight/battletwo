import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (BATTLE_CARD_NUM && JSON.parse(BATTLE_CARD_NUM).length === 2) return;

  // const CARD_NUMS = JSON.parse(window.sessionStorage.cardNum);
  // if (!CARD_NUMS || CARD_NUMS.length <= 0) return errorManagement({ errCase: 'errorComn', message: 'cardNum 세션이 없거나 length가 없습니다.' });
  // sessionStorage cardNum key 찾기
  const encryptKey2 = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
  const decryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const CARD_NUMS = JSON.parse(decryptVal2);
  if (!CARD_NUMS || CARD_NUMS.length <= 0) return errorManagement({ errCase: 'errorComn', message: 'cardNum 세션이 없거나 length가 없습니다.' });

  const randomNum = randomArray(CARD_NUMS);
  for (let i = 0; i < CARD_NUMS.length; i++) {
    if (CARD_NUMS[i] === randomNum) {
      CARD_NUMS.splice(i, 1);
      break;
    }
  }
  // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(CARD_NUMS));
  storageMethod('s', 'SET_ITEM', encryptKey2, JSON.stringify(CARD_NUMS));
  setTimeout(sessionActiveCard, timeInterval_1, 'player', randomNum);
};
