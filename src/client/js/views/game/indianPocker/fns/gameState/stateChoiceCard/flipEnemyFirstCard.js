import { timeInterval_1, timeInterval_201 } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default () => {
  // element | seeeion 체크
  const RANDOM_UL = randomNumberMinMax(0, 1);
  const RANDOM_LI = randomNumberMinMax(0, 9);
  const ENEMY_NUMBER = window.sessionStorage.enemyFirstNumber;
  if (!ENEMY_NUMBER) return errorComn('sessionStorage의 enemyFirstNumber 가 없습니다.');
  const CARD_WRAP = document.querySelector('.choice-card');
  if (!CARD_WRAP) return errorComn('.choice-card 엘리먼트가 없습니다');
  const ENEMY_CARD_UL = CARD_WRAP.querySelectorAll('ul')[RANDOM_UL];
  if (!ENEMY_CARD_UL) return errorComn('.choice-card 엘리먼트의 ul 이 없습니다');
  const ENEMY_CARD_LI = ENEMY_CARD_UL.querySelectorAll('li')[RANDOM_LI];
  if (!ENEMY_CARD_LI) return errorComn('.choice-card 엘리먼트의 li 가 없습니다');
  const ENEMY_CARD_IMG = ENEMY_CARD_LI.querySelector('img');
  if (!ENEMY_CARD_IMG) return errorComn('.choice-card 엘리먼트 li의 img가 없습니다');

  // 명령
  setTimeout(() => {
    storageMethod('s', 'SET_ITEM', 'ulIndexEnemy', RANDOM_UL);
    storageMethod('s', 'SET_ITEM', 'liIndexEnemy', RANDOM_LI);
    ENEMY_CARD_LI.classList.add('show');
    setTimeout(() => {
      ENEMY_CARD_IMG.setAttribute('src', imgGetCardNum(ENEMY_NUMBER));
      setTimeout(flipUserCardCheck, timeInterval_1);
    }, timeInterval_201);
  }, timeInterval_1);
};
