import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import cardNumCodeDecryption from '@/client/js/functions/bcrypt/cardNumCodeDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import makeSeq from '@/client/js/views/game/indianPocker/fns/common/mappingCardNum';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (params) => {
  const { eNum, pNum } = params;

  // seeeion 체크
  const encryptKey1 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
  const encryptKey2 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
  const encryptKey3 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber

  const encryptKey4 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptKey5 = findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]); // ulIndex
  const encryptKey6 = findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]); // liIndex

  const RANDOM_UL = randomNumberMinMax(0, 1);
  const RANDOM_LI = randomNumberMinMax(
    0,
    9,
    encryptKey4 !== '' && encryptKey5 !== '' && encryptKey6 !== ''
      ? (() => {
          // element 체크 + 정리
          const CHOICE_CARD = document.querySelector('.choice-card');
          if (!CHOICE_CARD) throw throwObj('elementLoss', '.choice-card failed.');
          const CHOICE_CARDS = CHOICE_CARD.querySelectorAll('li');
          if (!CHOICE_CARDS || CHOICE_CARDS.length <= 0) throw throwObj('elementLoss', '.choice-card li not found / length 0 error.');

          // 상대가 선택한 카드의 li index를 제외한 랜덤 숫자 선택
          return Array.from(CHOICE_CARDS).findIndex((li) => li.classList.contains('show'));
        })()
      : undefined,
  );

  const uRes = findCharCode(makeSeq(RANDOM_UL)); // makeSeq 는 0 ~ 1 중 하나를 받아서 1 ~ 1 중 +1된 결과를 리턴
  const lRes = findCharCode(makeSeq(RANDOM_LI)); // makeSeq 는 0 ~ 9 중 하나를 받아서 1 ~ 10 중 +1된 결과를 리턴

  const ENEMY_NUMBER = window.sessionStorage.getItem(encryptKey3);
  if (!ENEMY_NUMBER) throw throwObj('sessionStorageLoss', 'enemyFirstNumber in sessionStorage failed.');
  const CARD_WRAP = document.querySelector('.choice-card');
  if (!CARD_WRAP) throw throwObj('elementLoss', '.choice-card failed.');
  const ENEMY_CARD_UL = CARD_WRAP.querySelectorAll('ul')[RANDOM_UL];
  if (!ENEMY_CARD_UL) throw throwObj('elementLoss', 'ul in .choice-card failed.');
  const ENEMY_CARD_LI = ENEMY_CARD_UL.querySelectorAll('li')[RANDOM_LI];
  if (!ENEMY_CARD_LI) throw throwObj('elementLoss', 'li in .choice-card failed.');
  const ENEMY_CARD_IMG = ENEMY_CARD_LI.querySelector('img');
  if (!ENEMY_CARD_IMG) throw throwObj('elementLoss', 'li img in .choice-card failed.');

  // 명령
  storageMethod('s', 'SET_ITEM', encryptKey1, uRes);
  storageMethod('s', 'SET_ITEM', encryptKey2, lRes);
  ENEMY_CARD_LI.classList.add('show');
  const findCardNumb = cardNumCodeDecryption(ENEMY_NUMBER);
  ENEMY_CARD_IMG.setAttribute('src', imgGetCardNum(findCardNumb));
  // 나와 상대가 선택한 카드 비교
  // flipUserCardCheck({ eNum, pNum });
};
