import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
  const CHOICE_CARD = document.querySelector('.choice-card');
  if (!CHOICE_CARD) return errorManagement({ errCase: 'errorComn', message: '.choice-card 엘리먼트가 없습니다.' });
  const CHOICE_CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CHOICE_CARDS || CHOICE_CARDS.length <= 0) return errorManagement({ errCase: '.choice-card 의 li가 없거나 length가 0보다 작습니다.' });

  // 명령
  setTimeout(() => {
    storageMethod('s', 'REMOVE_ITEM', 'enemyFirstNumber');
    storageMethod('s', 'REMOVE_ITEM', 'playerFirstNumber');
    storageMethod('s', 'REMOVE_ITEM', 'betUser');
    storageMethod('s', 'REMOVE_ITEM', 'liIndex');
    storageMethod('s', 'REMOVE_ITEM', 'ulIndex');
    storageMethod('s', 'REMOVE_ITEM', 'liIndexEnemy');
    storageMethod('s', 'REMOVE_ITEM', 'ulIndexEnemy');
    for (let i = 0; i < CHOICE_CARDS.length; i++) {
      CHOICE_CARDS[i].querySelector('img').setAttribute('src', SVG_BACK);
      CHOICE_CARDS[i].classList.remove('show');
    }
    setTimeout(() => {
      request('choiceDrewCard', true);
      setTimeout(() => {
        if (window.sessionStorage.enemyCardChoiceReady === 'true') {
          LOADING_EVENT.hide();
          setTimeout(choiceCardsClick, timeInterval_1);
        }
      }, timeInterval_1);
    }, timeInterval_1);
  }, timeInterval_1);
};
