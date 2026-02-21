import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { enc } from '@/client/js/module/crypts/obf8lower';
import textDE from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import gameState from '@/client/js/gameState/blackAndWhite1';
import cubeNumCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeNumCheck";
import cubeReadyEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/cubeReadyEnd";
import saveSessionStorage from "@/client/js/views/game/blackAndWhite1/fns/common/saveSessionStorage";
import startState from '@/client/js/network/blackAndWhite1/fns/startState';

export default (btnStart) => {
  btnStart.onclick = () => {
    // myShuffleState : true
    storageMethod("s", "SET_ITEM",
      findCharCode([80, 72, 73, 74, 89, 86, 83, 66, 69, 87]), // myShuffleState
      X.enc(decodeTF(_t([115, 119, 112, 117]))) // "swpu" : true
    );

    // 나의 shuffle이 끝났다고 상대에게 알림
    request('startCheck', { rdy: true });

    const encryptKey1 = findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]); // enemyShuffleState
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    // 내가 shuffle 완료 했을 때,
    if (encryptVal1 !== null && encryptVal1 !== "" && X.dec(encryptVal1)) {
      // 상대도 shuffle 완료된 상태임
      // enemyShuffleState === true
      request("startState", { stat: "allReady" });
      gameState.setOrder();
    } else {
      // 상대는 shuffle 중
      // enemyShuffleState === false
      gameState.waitEnemyShuffle();
    };

    // round : 1
    storageMethod("s", "SET_ITEM",
      findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]), // round
      enc(encryptNumOfStr(textDE([101, 119, 119, 114]))), // 'ewwr' : 1
    );

    cubeNumCheck();
    cubeReadyEnd();
    saveSessionStorage();
  };
};
