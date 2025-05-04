import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import randomArray from '@/client/js/views/game/indianPocker/fns/common/randomArray';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';

export default () => {
  const BATTLE_CARD_NUM = window.sessionStorage.battleCardNum;
  if (BATTLE_CARD_NUM && JSON.parse(BATTLE_CARD_NUM).length === 2) return;
  const CARD_NUMS = JSON.parse(window.sessionStorage.cardNum);
  if (!CARD_NUMS || CARD_NUMS.length <= 0) return errorManagement({ errCase: 'errorComn', message: 'cardNum 세션이 없거나 length가 없습니다.' });

  let randomNum = randomArray(CARD_NUMS);
  for (let i = 0; i < CARD_NUMS.length; i++) {
    if (CARD_NUMS[i] === randomNum) {
      CARD_NUMS.splice(i, 1);
      break;
    }
  }
  window.sessionStorage.setItem('cardNum', JSON.stringify(CARD_NUMS));
  setTimeout(sessionActiveCard, timeInterval_1, 'player', randomNum);
};
