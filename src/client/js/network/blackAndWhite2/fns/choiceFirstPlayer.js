import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import drawFirstPlayer from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/drawFirstPlayer';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      const { firstPlayer } = _data;
      storageMethod(
        "s",
        "SET_ITEM",
        findCharCode([86, 88, 85, 83, 90, 65, 84, 70, 78, 69]), // firstUser
        firstPlayer === storageMethod("l", "GET_ITEM", 'localPlayer') ?
          X.enc(decodeTF(_t([107, 102, 114, 97]))) // "kfra" : true
          :
          X.enc(decodeTF(_t([120, 111, 108, 105, 110]))) // "xolin" : false
      );

      console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer);
      console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer === storageMethod("l", "GET_ITEM", 'localPlayer') ? 'LOCAL' : 'REMOTE');

      drawFirstPlayer();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
