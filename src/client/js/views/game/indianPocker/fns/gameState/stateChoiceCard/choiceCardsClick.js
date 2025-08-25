import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import pickCardInit from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/pickCardInit';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD = document.querySelector('.choice-card');
  if (!CHOICE_CARD) throw throwObj('elementLoss', '.choice-card element failed');
  const CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CARDS || CARDS.length <= 0) throw throwObj('elementLoss', '.choice-card li undefined / li length failed.');

  const invalidateCardClick = () => {
    for (let i = 0; i < CARDS.length; i++) {
      CARDS[i].onclick = null;
    };
  };

  // 명령
  for (let i = 0; i < CARDS.length; i++) {
    // onclick event handler는 try-catch로 감싸도 나중에 브라우저(이벤트 시스템)가 호출
    // 그래서 최종 부모(indianPocker.js)의 try catch에서 못잡음
    CARDS[i].onclick = async (event) => {
      try {
        await pickCardInit(event);

        invalidateCardClick();

        storageMethod('s', 'SET_ITEM',
          findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]), // enemyCardChoiceReady
          X.enc(decodeTF(textDE([120, 111, 98, 116, 117]))) // "xobtu" : false
        );
      } catch (error) {
        console.log('choiceCardsClick.js onclick error : ');
        errorManager(error, true);
      };
    };
  };
};
