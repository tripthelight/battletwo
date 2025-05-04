import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import refreshDrawPlayerCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/refreshDrawPlayerCard';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default (_enemyNum) => {
  // element | seeeion 체크
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다.' });
  const ENEMY_CARD = document.querySelector('.enemy-card');
  if (ENEMY_CARD) return;

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    let imgEl = document.createElement('img');
    // imgEl.setAttribute("src", "/images/svg/indian_poker_card/card_" + _enemyNum + ".svg");
    imgEl.setAttribute('src', imgGetCardNum(_enemyNum));
    imgEl.setAttribute('alt', 'card back');
    elem.appendChild(imgEl);
    elem.classList.add('enemy-card');
    ENEMY_BLOCK.appendChild(elem);
    // 다음 함수 실행
    setTimeout(refreshDrawPlayerCard, timeInterval_1);
  }, timeInterval_1);
};
