// import { selectX, selectY, pcMoveX, pcMoveY } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  let moveX = -(reactiveState.selectX - event.clientX);
  let moveY = -(reactiveState.selectY - event.clientY);
  reactiveState.pcMoveX = moveX;
  reactiveState.pcMoveY = moveY;
};
