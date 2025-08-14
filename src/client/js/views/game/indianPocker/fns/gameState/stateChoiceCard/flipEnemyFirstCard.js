import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import makeSeq from '@/client/js/views/game/indianPocker/fns/common/mappingCardNum';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default (params) => {
  const { eNum, pNum }  = params;

  // element | seeeion 체크
  const encryptKey1 = findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]); // ulIndexEnemy
  const encryptKey2 = findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]); // liIndexEnemy
  const encryptKey3 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber

  const RANDOM_UL = randomNumberMinMax(0, 1);
  const RANDOM_LI = randomNumberMinMax(0, 9);

  const uRes = findCharCode(makeSeq(RANDOM_UL)); // makeSeq 는 0 ~ 1 중 하나를 받아서 1 ~ 1 중 +1된 결과를 리턴
  const lRes = findCharCode(makeSeq(RANDOM_LI)); // makeSeq 는 0 ~ 9 중 하나를 받아서 1 ~ 10 중 +1된 결과를 리턴

  const ENEMY_NUMBER = window.sessionStorage.getItem(encryptKey3);
  if (!ENEMY_NUMBER) throw { errCase: 'sessionStorageLoss', message: 'sessionStorage의 enemyFirstNumber 가 없습니다.' };
  const CARD_WRAP = document.querySelector('.choice-card');
  if (!CARD_WRAP) throw { errCase: 'elementLoss', message: '.choice-card 엘리먼트가 없습니다' };
  const ENEMY_CARD_UL = CARD_WRAP.querySelectorAll('ul')[RANDOM_UL];
  if (!ENEMY_CARD_UL) throw { errCase: 'elementLoss', message: '.choice-card 엘리먼트의 ul 이 없습니다' };
  const ENEMY_CARD_LI = ENEMY_CARD_UL.querySelectorAll('li')[RANDOM_LI];
  if (!ENEMY_CARD_LI) throw { errCase: 'elementLoss', message: '.choice-card 엘리먼트의 li 가 없습니다' };
  const ENEMY_CARD_IMG = ENEMY_CARD_LI.querySelector('img');
  if (!ENEMY_CARD_IMG) throw { errCase: 'elementLoss', message: '..choice-card 엘리먼트 li의 img가 없습니다' };

  // 명령
  storageMethod('s', 'SET_ITEM', encryptKey1, uRes);
  storageMethod('s', 'SET_ITEM', encryptKey2, lRes);
  ENEMY_CARD_LI.classList.add('show');
  const findCardNumb = cardNumDecryption(ENEMY_NUMBER);
  ENEMY_CARD_IMG.setAttribute('src', imgGetCardNum(findCardNumb));
  flipUserCardCheck({ eNum, pNum });
};
