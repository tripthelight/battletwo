import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import storageMethod from '@/client/js/module/storage/storageMethod';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default async (_state) => {
  try {
    const encryptKey1 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // myNextStepState
    const encryptKey2 = findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]); // nextStepChoiceCard
    storageMethod(
      's',
      'SET_ITEM',
      encryptKey2,
      _state ?
        // true
        X.enc(decodeTF(textDE([107, 102, 114, 110]))) : // "kfrn" : true
        // false
        X.enc(decodeTF(textDE([100, 113, 98, 116, 110]))) // "dqbtn" : false
    );

    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== '' ? X.dec(encryptVal1) : false;
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = X.dec(encryptVal2);
    if (decryptVal1 && decryptVal2) { // myNextStepState === true && nextStepChoiceCard === true
      STATE_CHOICE_CARD.nextStep();
    }
  } catch (error) {
    console.log('error nextStepResult.js : ');
    errorManager(error, true);
  };
};
