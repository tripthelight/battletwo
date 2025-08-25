import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import storageMethod from '@/client/js/module/storage/storageMethod';
import choiceCardsClick from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/choiceCardsClick';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_state) => {
  try {
    if (_state) {
      const encryptKey1 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady

      storageMethod(
        's',
        'SET_ITEM',
        encryptKey1,
        _state ?
          // true
          X.enc(decodeTF(textDE([115, 109, 114, 97]))) : // smra
          // false
          X.enc(decodeTF(textDE([106, 111, 98, 101, 110]))) // joben
      );
    } else {
      LOADING_EVENT.hide();
      const encryptKey2 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
      storageMethod('s', 'SET_ITEM', encryptKey2, '');
      choiceCardsClick();
    };
  } catch (error) {
    console.log('enemyChoiceCardReady() error : ');
    errorManager(error, true);
  };
};
