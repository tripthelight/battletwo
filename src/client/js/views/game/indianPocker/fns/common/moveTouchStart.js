// import { selectX, selectY, pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (e) => {
  reactiveState.selectX = e.targetTouches[0].clientX;
  reactiveState.selectY = e.targetTouches[0].clientY;
  reactiveState.pcOffsetLeft = e.target.offsetLeft;
  reactiveState.pcOffsetTop = e.target.offsetTop;
};
