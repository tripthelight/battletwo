import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import delCookies from '@/client/js/module/cookies/delCookies';
import pickCardInit from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/pickCardInit';
import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD = document.querySelector('.choice-card');
  // if (!CHOICE_CARD) return errorManagement({ errCase: 'elementLoss', message: '.choice-card 엘리먼트가 없습니다.' });
  if (!CHOICE_CARD) throw { errCase: 'elementLoss', message: '.choice-card 엘리먼트가 없습니다.' };
  const CARDS = CHOICE_CARD.querySelectorAll('li');
  // if (!CARDS || CARDS.length <= 0) return errorManagement({ errCase: 'elementLoss', message: '.choice-card 의 li가 없거나 length가 0 입니다.' });
  if (!CARDS || CARDS.length <= 0) throw { errCase: 'elementLoss', message: '.choice-card 의 li가 없거나 length가 0 입니다.' };

  // 명령
  for (let i = 0; i < CARDS.length; i++) {
    // onclick event handler는 try-catch로 감싸도 나중에 브라우저(이벤트 시스템)가 호출
    // 그래서 최종 부모(indianPocker.js)의 try catch에서 못잡음
    /**
     * CARDS[i].onclick = ...은 등록만 해두는 것이고
     * 실제로 onclick 함수는 나중에 브라우저(이벤트 시스템)가 호출합니다.
     * → 그래서 choiceCardsClick()의 호출 컨텍스트와는 완전히 별개입니다.
     * 따라서 choiceCardsClick()을 try-catch로 감싸도,
     * 그 안에서 등록된 이벤트 핸들러의 예외는 절대 못 잡습니다.
     */
    CARDS[i].onclick = (event) => {
      try {
        pickCardInit(event);

        const encryptKey = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
        const encryptVal = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
        storageMethod('s', 'SET_ITEM', encryptKey, encryptVal);

      } catch (error) {
        console.log('choiceCardsClick.js onclick error : ');
        eventHanlerErrorComn(error);
      };
    };
  };
};
