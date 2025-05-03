import { pcActiveEl, selectX, selectY, pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  window.sessionStorage.setItem('dropState', true);
  pcActiveEl = event;
  selectX = event.clientX;
  selectY = event.clientY;
  pcOffsetLeft = event.target.offsetLeft;
  pcOffsetTop = event.target.offsetTop;
  event.dataTransfer.setData('Text', event.target.innerHTML);
};
