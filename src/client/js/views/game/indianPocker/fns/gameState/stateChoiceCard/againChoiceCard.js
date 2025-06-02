import findCharCode from '@/client/js/functions/findCharCode';
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
  if (!CHOICE_CARD) return errorManagement({ errCase: 'elementLoss', message: '.choice-card 엘리먼트가 없습니다.' });
  const CHOICE_CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CHOICE_CARDS || CHOICE_CARDS.length <= 0) return errorManagement({ errCase: 'elementLoss', message: '.choice-card 의 li가 없거나 length가 0보다 작습니다.' });

  // 명령
  setTimeout(() => {
    /*
    storageMethod('s', 'REMOVE_ITEM', 'enemyFirstNumber');
    storageMethod('s', 'REMOVE_ITEM', 'playerFirstNumber');
    storageMethod('s', 'REMOVE_ITEM', 'betUser');
    storageMethod('s', 'REMOVE_ITEM', 'liIndex');
    storageMethod('s', 'REMOVE_ITEM', 'ulIndex');
    storageMethod('s', 'REMOVE_ITEM', 'liIndexEnemy');
    storageMethod('s', 'REMOVE_ITEM', 'ulIndexEnemy');
    */

    const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey3 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex
    const encryptKey4 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
    const encryptKey5 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
    const encryptKey6 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
    const encryptKey7 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady

    storageMethod('s', 'REMOVE_ITEM', encryptKey1); // enemyFirstNumber
    storageMethod('s', 'REMOVE_ITEM', encryptKey2); // playerFirstNumber
    storageMethod('s', 'REMOVE_ITEM', 'betUser');
    storageMethod('s', 'REMOVE_ITEM', encryptKey3); // liIndex
    storageMethod('s', 'REMOVE_ITEM', encryptKey4); // ulIndex
    storageMethod('s', 'REMOVE_ITEM', encryptKey5); // liIndexEnemy
    storageMethod('s', 'REMOVE_ITEM', encryptKey6); // ulIndexEnemy
    for (let i = 0; i < CHOICE_CARDS.length; i++) {
      CHOICE_CARDS[i].querySelector('img').setAttribute('src', SVG_BACK);
      CHOICE_CARDS[i].classList.remove('show');
    }
    setTimeout(() => {
      request('choiceDrewCard', true);
      setTimeout(() => {
        // if (window.sessionStorage.enemyCardChoiceReady === 'true') {
        if (window.sessionStorage.getItem(encryptKey7) === 'true') {
          LOADING_EVENT.hide();
          setTimeout(choiceCardsClick, timeInterval_1);
        }
      }, timeInterval_1);
    }, timeInterval_1);
  }, timeInterval_1);
};
