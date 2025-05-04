import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import P1 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P1';
import P2 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P2';
import P3 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P3';

export default (_enum) => {
  // element | seeeion 체크
  const CARD_NUM = window.sessionStorage.cardNum;
  if (!CARD_NUM) return;
  const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
  if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return;

  setTimeout(() => {
    P1(_enum)
      .then((_numRes) => {
        return P2(_numRes.join());
      })
      .then((_index) => {
        const NUM = JSON.parse(JSON.stringify(_index));
        return P3(NUM);
      })
      .then((_cardNumList) => {
        window.sessionStorage.setItem('cardNum', JSON.stringify(_cardNumList));
      })
      .catch((error) => {
        errorManagement({ errCase: 'errorComn', message: 'P1함수 error :: ' });
      });
  }, timeInterval_1);
};
