import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import betUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/betUserCheck';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default (_idx) => {
  // element | seeeion 체크
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'errorComn', message: '.enemy-block 엘리먼트가 없습니다.' });
  const ENEMY_CARD = document.querySelector('.enemy-card');

  // 명령
  setTimeout(() => {
    if (!ENEMY_CARD) {
      let elem = document.createElement('div');
      let imgEl = document.createElement('img');
      // imgEl.setAttribute("src", "/images/svg/indian_poker_card/card_" + _idx + ".svg");
      imgEl.setAttribute('src', imgGetCardNum(_idx));
      imgEl.setAttribute('alt', 'card back');
      elem.appendChild(imgEl);
      elem.classList.add('enemy-card');
      ENEMY_BLOCK.appendChild(elem);
      setTimeout(betUserCheck, timeInterval_1);
    } else {
      setTimeout(betUserCheck, timeInterval_1);
    }
  }, timeInterval_1);
};
