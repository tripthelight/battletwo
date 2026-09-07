import disabledSelectInit from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit';
import hideInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/hideInnerSquare';
import cubeListStyle from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeListStyle';
import sendComn from '@/client/js/views/game/blackAndWhite1/fns/common/sendComn';
import {
  cancelTouchDrag,
  finishTouchDrag,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/touchDragState';

function renderSelectedCube(blackSquare, num) {
  blackSquare.classList.remove('even', 'odd');
  blackSquare.classList.add(num % 2 === 0 ? 'even' : 'odd');

  const numEl = document.createElement('span');
  numEl.innerText = String(num);

  blackSquare.querySelectorAll('span').forEach((span) => span.remove());
  blackSquare.appendChild(numEl);
}

export default (event) => {
  // OS/browser가 gesture를 취소한 경우에는 절대 Cube를 제출하지 않는다.
  if (event?.type === 'touchcancel') {
    cancelTouchDrag(event);
    return;
  }

  const result = finishTouchDrag(event);
  if (!result) return;

  const { card, blackSquare, isInside } = result;

  if (!isInside || !card.isConnected || !blackSquare.isConnected) {
    card.style.transform = '';
    return;
  }

  const cube = card.closest('ul.cube.ready.start');
  if (!cube) {
    card.style.transform = '';
    return;
  }

  const cubeItems = Array.from(cube.children);
  const index = cubeItems.indexOf(card);
  const num = Number(card.textContent);

  if (index < 0 || !Number.isInteger(num) || num < 0 || num > 8) {
    card.style.transform = '';
    return;
  }

  // Turn 검증 및 Peer 전송이 성공한 경우에만 화면/DOM을 commit한다.
  if (!sendComn(num, index)) {
    card.style.transform = '';
    return;
  }

  renderSelectedCube(blackSquare, num);
  hideInnerSquare();

  // 남아 있는 Cube의 입력 이벤트를 먼저 해제한 뒤 선택 Cube를 제거한다.
  disabledSelectInit();
  card.remove();
  cubeListStyle();
};
