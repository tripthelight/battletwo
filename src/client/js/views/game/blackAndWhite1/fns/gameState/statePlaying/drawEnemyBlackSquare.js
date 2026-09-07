import cubesStyle from '@/client/js/views/game/blackAndWhite1/fns/common/cubesStyle';
import cubeAddColor from '@/client/js/views/game/blackAndWhite1/fns/common/cubeAddColor';
import { loadEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';

export default () => {
  if (document.querySelector('.enemy-black-square')) return;

  const elem = document.createElement('div');
  elem.classList.add('enemy-black-square');

  const { w, h } = cubesStyle();
  elem.style.width = `${w}px`;
  elem.style.height = `${h}px`;
  elem.style.marginLeft = `${0 - w / 2}px`;

  // 상대가 현재 Round에서 이미 첫 Cube를 제출한 상태에서 reload 된 경우
  // 숫자는 공개하지 않고 색(even/odd)만 원래 화면과 동일하게 복원한다.
  const enemyBeforeCube = loadEnemyBeforeCube();
  if (enemyBeforeCube) {
    elem.classList.add(cubeAddColor(enemyBeforeCube));
  }

  const enemyBlock = document.querySelector('#gameScene .enemy-block');
  enemyBlock?.appendChild(elem);
};
