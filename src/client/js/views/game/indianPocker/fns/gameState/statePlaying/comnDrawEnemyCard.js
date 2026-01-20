import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import betUserCheck from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/betUserCheck';
import mergePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/mergePayload';
import createPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/createPayload';
import selectedCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/selectedCard';
import flipSelectCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/flipSelectCard';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default (_idx) => {
  // element | seeeion 체크
  const ENEMY_BLOCK = document.querySelector('.enemy-block');
  if (!ENEMY_BLOCK) return errorManagement({ errCase: 'elementLoss', message: '.enemy-block 엘리먼트가 없습니다.' });
  const ENEMY_CARD = document.querySelector('.enemy-card');

  // 명령
  if (!ENEMY_CARD) {
    /* let elem = document.createElement('div');
    let imgEl = document.createElement('img');
    // imgEl.setAttribute("src", "/images/svg/indian_poker_card/card_" + _idx + ".svg");
    imgEl.setAttribute('src', imgGetCardNum(_idx));
    imgEl.setAttribute('alt', 'card back');
    elem.appendChild(imgEl);
    elem.classList.add('enemy-card');
    ENEMY_BLOCK.appendChild(elem); */

    const svgWrap = document.createElement('div');
    svgWrap.classList.add('enemy-card');

    selectedCard(_idx, createPayload(_idx))
      .then((svg) => {
        flipSelectCard({ svg, svgWrap, wrap: ENEMY_BLOCK })
        betUserCheck();
      });

  } else {
    betUserCheck();
  }
};
