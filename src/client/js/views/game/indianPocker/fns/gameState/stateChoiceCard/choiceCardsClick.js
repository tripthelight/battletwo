import { timeInterval_1 } from '@/client/js/functions/variable.js';
import { errorManagement } from '@/client/js/module/errorManagement';
import pickCardInit from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/pickCardInit';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD = document.querySelector('.choice-card');
  if (!CHOICE_CARD) return errorManagement({ errCase: 'errorComn', message: '.choice-card 엘리먼트가 없습니다.' });
  const CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CARDS || CARDS.length <= 0) return errorManagement({ errCase: 'errorComn', message: '.choice-card 의 li가 없거나 length가 0 입니다.' });

  // 명령
  setTimeout(() => {
    for (let i = 0; i < CARDS.length; i++) {
      CARDS[i].onclick = (event) => {
        pickCardInit(event);
      };
    }
  }, timeInterval_1);
};
