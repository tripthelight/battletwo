import storageMethod from '@/client/js/module/storage/storageMethod';
// import { pcActiveEl, selectX, selectY, pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  storageMethod('s', 'SET_ITEM', 'dropState', true);

  reactiveState.pcActiveEl = event;
  reactiveState.selectX = event.clientX;
  reactiveState.selectY = event.clientY;
  reactiveState.pcOffsetLeft = event.target.offsetLeft;
  reactiveState.pcOffsetTop = event.target.offsetTop;
  event.dataTransfer.setData('Text', event.target.innerHTML);
};
