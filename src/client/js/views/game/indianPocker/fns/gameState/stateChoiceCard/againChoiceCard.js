import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import SVG_BACK from '@/client/assets/images/svg/indian_poker/indian_poker_card/back.svg';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  // element | seeeion 체크
  const CHOICE_CARD_INFO = document.querySelector('.choice-card-info');
  if (CHOICE_CARD_INFO) CHOICE_CARD_INFO.remove();
  const CHOICE_CARD = document.querySelector('.choice-card');
  if (!CHOICE_CARD) throw throwObj('elementLoss', '.choice-card failed.');
  const CHOICE_CARDS = CHOICE_CARD.querySelectorAll('li');
  if (!CHOICE_CARDS || CHOICE_CARDS.length <= 0) throw throwObj('elementLoss', '.choice-card li undefined / li length failed.');

  for (let i = 0; i < CHOICE_CARDS.length; i++) {
    CHOICE_CARDS[i].querySelector('img').setAttribute('src', SVG_BACK);
    CHOICE_CARDS[i].classList.remove('show');
  };

  // 같은 카드였던 상태에서 내가 팝업 x 버튼 누르고 대기 상태 일 경우
  // const encryptKey1 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
  // const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  // storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1);
  const encryptKey1 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
  const encryptVal1 = X.enc(decodeTF(textDE([107, 109, 112, 110]))); // "kmpn" : true
  storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal1);

  storageMethod('s', 'REMOVE_VALUE', '', '', [
    findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]), // enemyFirstNumber
    findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]), // playerFirstNumber
    findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]), // liIndex
    findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]), // ulIndex
    findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]), // liIndexEnemy
    findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]), // ulIndexEnemy
    findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
    findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
  ]);

  const bKey = [68, 71, 87, 77, 85, 66, 65, 84, 88, 69]; // enemyCardChoiceReady
  const encryptKey2 = findCharCode(bKey);
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  const decryptVal2 = X.dec(encryptVal2);

  if (decryptVal2) {
    storageMethod('s', 'REMOVE_VALUE', '', '', [encryptKey2]);
    request('choiceDrewCard', false);
    LOADING_EVENT.hide();
    storageMethod('s', 'SET_ITEM', encryptKey1, '');
    choiceCardsClick();
  } else {
    storageMethod('s', 'REMOVE_VALUE', '', '', [encryptKey2]);
    // 먼저 X를 누른 user
    request('choiceDrewCard', true);
  };
};
