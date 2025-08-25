import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';
import STATE_CHOICE_CARD from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/init';

export default () => {
  const encryptKey1 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // myNextStepState
  const encryptVal1 = X.enc(decodeTF(textDE([99, 119, 104, 97]))) // "cwha" : true
  storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal1); // myNextStepState, true
  request('nextStep', true);

  // const bRes = booleanCheck([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]);  // nextStepChoiceCard
  // if (bRes === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
  //   return STATE_CHOICE_CARD.nextStep();
  // }

  const encryptKey2 = findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]); // nextStepChoiceCard
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
  if (encryptVal2 !== '' && X.dec(encryptVal2)) { // nextStepChoiceCard === true
    return STATE_CHOICE_CARD.nextStep();
  };
};
