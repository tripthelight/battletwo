import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import cubeNumCheck from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeNumCheck';
import cubeReadyEnd from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeReadyEnd';
import saveSessionStorage from '@/client/js/views/game/blackAndWhite1/fns/common/saveSessionStorage';
import { tryStartSetOrder } from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/startSetOrderSync';
import { publicGameStateProof } from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

export default (btnStart) => {
  btnStart.onclick = () => {
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([80, 72, 73, 74, 89, 86, 83, 66, 69, 87]), // myShuffleState
      X.enc(decodeTF(_t([115, 119, 112, 117]))) // "swpu" : true
    );

    request('startCheck', {
      rdyCode: publicGameStateProof('setOrder'),
      nick: storageMethod('l', 'GET_ITEM', 'localPlayer'),
    });

    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]), // round
      enc(encryptNumOfStr(_t([101, 119, 119, 114]))) // 'ewwr' : 1
    );

    cubeReadyEnd();
    saveSessionStorage();
    cubeNumCheck();
    tryStartSetOrder();
  };
};
