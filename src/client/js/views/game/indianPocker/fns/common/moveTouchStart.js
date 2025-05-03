import { selectX, selectY, pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (e) => {
  selectX = e.targetTouches[0].clientX;
  selectY = e.targetTouches[0].clientY;
  pcOffsetLeft = e.target.offsetLeft;
  pcOffsetTop = e.target.offsetTop;
};
