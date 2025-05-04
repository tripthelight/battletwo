import { timeInterval_201 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import imgGetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/getCards';

export default (_playerNumRes) => {
  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return errorManagement({ errCase: 'errorComn' });
  const PLAYER_CARD = PLAYER_BLOCK.querySelector('img.card');
  if (!PLAYER_CARD) return errorManagement({ errCase: 'errorComn' });
  PLAYER_BLOCK.classList.add('round-end');
  setTimeout(() => {
    // PLAYER_CARD.setAttribute("src", "/images/svg/indian_poker_card/card_" + _playerNumRes + ".svg");
    PLAYER_CARD.setAttribute('src', imgGetCardNum(_playerNumRes));
  }, timeInterval_201);
};
