import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';

export default (event) => {
  // storageMethod('s', 'SET_ITEM', 'dropState', false);
  storageMethod('s', 'SET_ITEM',
    findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), // dropState
    X.enc(decodeTF(textDE([120, 103, 98, 116, 97]))) // "xgbta" : false
  );
};
