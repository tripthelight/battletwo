import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
// import { pcActiveEl, selectX, selectY, pcOffsetLeft, pcOffsetTop } from '@/client/js/views/game/indianPocker/fns/common/variable';
import { reactiveState } from '@/client/js/views/game/indianPocker/fns/common/variable';

export default (event) => {
  // storageMethod('s', 'SET_ITEM', 'dropState', true);
  storageMethod('s', 'SET_ITEM',
    findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), // dropState
    X.enc(decodeTF(textDE([99, 119, 112, 117]))) // "cwpu" : true
  );

  reactiveState.pcActiveEl = event;
  reactiveState.selectX = event.clientX;
  reactiveState.selectY = event.clientY;
  reactiveState.pcOffsetLeft = event.target.offsetLeft;
  reactiveState.pcOffsetTop = event.target.offsetTop;
  event.dataTransfer.setData('Text', event.target.innerHTML);
};
