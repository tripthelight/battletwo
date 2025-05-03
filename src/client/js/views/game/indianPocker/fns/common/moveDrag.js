import { selectX, selectY, pcMoveX, pcMoveY } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  let moveX = -(selectX - event.clientX);
  let moveY = -(selectY - event.clientY);
  pcMoveX = moveX;
  pcMoveY = moveY;
};
