import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
// import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawEnemyBlockPlaying';

export default () => {

  // storageMethod('s', 'REMOVE_ITEM', 'drewState');
  storageMethod('s', 'REMOVE_ITEM', findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77])); // drewState
  // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  storageMethod('s', 'REMOVE_ITEM', findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78])); // drewReady
  // storageMethod('s', 'REMOVE_ITEM', 'dropState');
  storageMethod('s', 'REMOVE_ITEM', findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89])); // dropState

  // storageMethod('s', 'SET_ITEM', 'betState', 'extraBetting');
  storageMethod('s', 'SET_ITEM',
    findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
    findCharCode([77, 86, 83, 87, 69, 73, 72, 88, 80, 89]) // extraBetting
  );

  const encryptKey5 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
  const decryptVal5 = window.sessionStorage.getItem(encryptKey5);
  if (decryptVal5 === null) storageMethod('s', 'SET_ITEM',
      encryptKey5, // extFirstBet
      X.enc(decodeTF(textDE([100, 103, 108, 116, 117]))) // "dgltu" : false
    );

  // 명령
  drawEnemyBlockPlaying();
};
