import drawInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare';
import {
  applyInnerSquareTurnView,
  positionInnerSquare,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView';
import { showInnerSquareNotice } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareNotice';

/**
 * 상대 선Player의 첫 Cube를 받은 뒤 내 Turn 안내 UI로 전환한다.
 *
 * 이미 5초 자동 숨김 또는 X 버튼으로 숨겨진 안내도 Turn이 실제로 바뀌면
 * 다시 보여주고 새로운 5초 타이머를 시작한다.
 */
export default () => {
  const innerSquare = document.querySelector('.inner-square');

  if (!innerSquare) {
    drawInnerSquare();
    return;
  }

  applyInnerSquareTurnView(innerSquare);
  if (!innerSquare.isConnected) return;

  positionInnerSquare(innerSquare);
  showInnerSquareNotice(innerSquare);
};
