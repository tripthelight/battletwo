import { timeInterval_202 } from '@/client/js/functions/variable';
import BlackSquareInit from '@/client/js/views/game/blackAndWhite1/fns/common/BlackSquareInit';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import { positionInnerSquare } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView';
import { loadAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export default () => {
  if (document.querySelector('.black-square')) return;

  const elem = document.createElement('div');
  elem.classList.add('black-square');

  const { w, h } = BlackSquareInit();
  elem.style.width = `${w}px`;
  elem.style.height = `${h}px`;
  elem.style.marginLeft = `${0 - w / 2}px`;

  // 내가 이번 Round의 선Player로 이미 Cube를 제출한 뒤 reload 된 경우
  // 제출한 내 Cube는 beforePlayerNum에 저장되어 있으므로 그대로 복원한다.
  const beforePlayerNumKey = findCharCode([
    65, 69, 68, 79, 82, 85, 78, 80, 90, 75,
  ]); // beforePlayerNum

  const beforePlayerNum = storageMethod('s', 'GET_ITEM', beforePlayerNumKey);

  let submittedNum = null;

  if (beforePlayerNum) {
    // 내가 선Player였던 경우.
    submittedNum = cubeToNum(beforePlayerNum);
  } else {
    const firstUserKey = findCharCode([
      73, 81, 90, 83, 68, 86, 69, 89, 78, 70,
    ]); // firstUser

    const firstUser = storageMethod('s', 'GET_ITEM', firstUserKey);
    const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');

    // 내가 후Player로 두 번째 Cube를 제출한 직후 reload 된 경우에도
    // 결과 대기 화면에 내가 제출했던 Cube 숫자를 그대로 복원한다.
    if (firstUser && localPlayer && firstUser !== localPlayer) {
      submittedNum = loadAfterPlayerNum();
    }
  }

  if (submittedNum !== null) {
    const numEl = document.createElement('span');

    numEl.innerText = String(submittedNum);
    elem.classList.add(submittedNum % 2 === 0 ? 'even' : 'odd');
    elem.appendChild(numEl);
  }

  const playerBlock = document.querySelector('.player-block');
  if (!playerBlock) return;

  playerBlock.appendChild(elem);

  setTimeout(() => {
    if (!elem.isConnected) return;

    const infoBoard = document.querySelector('.inner-square');
    if (infoBoard) {
      positionInnerSquare(infoBoard);
    }
  }, timeInterval_202);
};
