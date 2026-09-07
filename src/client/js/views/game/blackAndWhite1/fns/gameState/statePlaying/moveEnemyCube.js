import { timeInterval_1, timeInterval_202 } from '@/client/js/functions/variable';
import emenyCubeReset from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/emenyCubeReset';

export default (idx) => {
  const enemyCubes = document.querySelectorAll('.enemy-block ul li');
  const enemyBlack = document.querySelector('.enemy-black-square');

  if (enemyCubes.length <= 0 || !enemyBlack) return;
  if (!Number.isInteger(idx) || !enemyCubes[idx]) return;

  const selectedCube = enemyCubes[idx];

  // animation 완료 전에 reload 되어도 현재 Round 진행 상태가 남아 있어야 하므로
  // DOM animation보다 먼저 sessionStorage를 갱신한다.
  emenyCubeReset(idx);

  const left = enemyBlack.offsetLeft - selectedCube.offsetLeft;
  const top = enemyBlack.offsetTop - selectedCube.offsetTop;

  selectedCube.style.zIndex = 1000;
  selectedCube.style.transform = `translate(${left}px, ${top}px)`;

  setTimeout(() => {
    if (!selectedCube.isConnected) return;

    const bwClass = selectedCube.classList.contains('even') ? 'even' : 'odd';
    enemyBlack.classList.remove('even', 'odd');
    enemyBlack.classList.add(bwClass);
  }, timeInterval_1);

  setTimeout(() => {
    selectedCube.remove();
  }, timeInterval_202);
};
