import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawEnemyBlock from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawEnemyBlock';

export default () => {
  // storageMethod('s', 'REMOVE_ITEM', 'drewState');
  // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  // storageMethod('s', 'REMOVE_ITEM', 'dropState');
  // storageMethod('s', 'SET_ITEM', 'betState', 'extraBetting');

  const encryptKey1 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
  const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (decryptVal1 === null) storageMethod('s', 'SET_ITEM',
    encryptKey1, // extFirstBet
    X.enc(decodeTF(textDE([120, 111, 118, 116, 110]))) // "xovtn" : false
  );

  // 명령
  setTimeout(() => {
    setTimeout(rfDrawEnemyBlock, timeInterval_1);
  }, timeInterval_1);
};
