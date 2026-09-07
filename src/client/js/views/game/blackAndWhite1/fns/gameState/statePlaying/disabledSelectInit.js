import pcCubeDisabled from '@/client/js/views/game/blackAndWhite1/fns/common/pcCubeDisabled';
import addEventsSelectCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/addEventsSelectCube';

export default () => {
  const cube = document.querySelector('ul.cube');
  if (!cube) return;

  cube.classList.add('disabled');

  // PC에서는 실제 draggable 속성도 false로 만들어 브라우저 drag 자체를 차단한다.
  pcCubeDisabled(false);

  cube.querySelectorAll('li').forEach((item) => {
    addEventsSelectCube(item, false);
  });
};
