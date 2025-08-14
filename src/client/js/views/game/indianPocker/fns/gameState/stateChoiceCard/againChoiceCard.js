import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
  const CHOICE_CARD = document.querySelector('.choice-card');
  if (!CHOICE_CARD) throw { errCase: 'elementLoss', message: '.choice-card 엘리먼트가 없습니다.' };
  const CHOICE_CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CHOICE_CARDS || CHOICE_CARDS.length <= 0) throw { errCase: 'elementLoss', message: '.choice-card 의 li가 없거나 length가 0보다 작습니다.' };

  // 명령
  /*
  storageMethod('s', 'REMOVE_ITEM', 'enemyFirstNumber');
  storageMethod('s', 'REMOVE_ITEM', 'playerFirstNumber');
  storageMethod('s', 'REMOVE_ITEM', 'betUser');
  storageMethod('s', 'REMOVE_ITEM', 'liIndex');
  storageMethod('s', 'REMOVE_ITEM', 'ulIndex');
  storageMethod('s', 'REMOVE_ITEM', 'liIndexEnemy');
  storageMethod('s', 'REMOVE_ITEM', 'ulIndexEnemy');
  */

  // 같은 카드였던 상태에서 내가 팝업 x 버튼 누르고 대기 상태 일 경우
  const encryptKey = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
  storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]));

  const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptKey3 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex
  const encryptKey4 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
  const encryptKey5 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
  const encryptKey6 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
  const encryptKey7 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  const encryptKey8 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  const encryptKey9 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

  const bRes = booleanCheck([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  const ORDER_CHECK = bRes === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]);

  if (ORDER_CHECK) {
    console.log('비기고 여기 타냐 1');
    request('choiceDrewCard', false);
    LOADING_EVENT.hide();
    const encryptKey = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
    storageMethod('s', 'SET_ITEM', encryptKey, '');
    choiceCardsClick();
  } else {
    // 먼저 X를 누른 user
    request('choiceDrewCard', true);
  }
  storageMethod('s', 'REMOVE_VALUE', '', '', [encryptKey1, encryptKey2, encryptKey3, encryptKey4, encryptKey5, encryptKey6, encryptKey7, encryptKey8, encryptKey9]);

  for (let i = 0; i < CHOICE_CARDS.length; i++) {
    CHOICE_CARDS[i].querySelector('img').setAttribute('src', SVG_BACK);
    CHOICE_CARDS[i].classList.remove('show');
  }
};
