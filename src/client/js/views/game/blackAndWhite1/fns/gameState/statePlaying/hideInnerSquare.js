import { timeInterval_201 } from '@/client/js/functions/variable';
import { clearInnerSquareNotice } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareNotice';

export default () => {
  const innerSquare = document.querySelector('.inner-square');
  if (!innerSquare) return;

  // Cube 제출로 이 Round의 안내가 끝나는 경우에는 자동 숨김 timer를 제거하고
  // 기존 animation 후 DOM 자체를 삭제한다.
  clearInnerSquareNotice(innerSquare);
  innerSquare.classList.add('hide');

  setTimeout(() => {
    innerSquare.remove();
  }, timeInterval_201);
};
