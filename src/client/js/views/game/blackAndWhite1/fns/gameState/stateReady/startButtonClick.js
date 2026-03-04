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

import findNickname from '@/client/js/functions/findNickname';
import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';

export default (btnStart) => {
  btnStart.onclick = () => {
    // myShuffleState : true
    storageMethod("s", "SET_ITEM",
      findCharCode([80, 72, 73, 74, 89, 86, 83, 66, 69, 87]), // myShuffleState
      X.enc(decodeTF(_t([115, 119, 112, 117]))) // "swpu" : true
    );

    // 나의 shuffle이 끝났다고 상대에게 알림
    request('startCheck', {
      rdy: true,
      nick: storageMethod("l", "GET_ITEM", "localPlayer")
    });

    const encryptKey1 = findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]); // enemyShuffleState
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    // 내가 shuffle 완료 했을 때,
    if (encryptVal1 !== null && encryptVal1 !== "" && X.dec(encryptVal1)) {
      // 상대도 shuffle 완료된 상태임
      // enemyShuffleState === true

      // const LOCAL_PEER = findNickname('localPlayer'); // my nick name
      // const REMOTE_PEER = fromUnicodePoints(
      //     storageMethod("s", "GET_ITEM", findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90])) // enemyNick
      //       .replace(/"/g, '')
      //       .split(',')
      //       .map((s) => s.trim()),
      //   );

      // console.log("LOCAL_PEER_CODE :::::::: ", storageMethod("l", "GET_ITEM", "localPlayer"));
      // console.log("REMOTE_PEER_CODE ::::::: ", storageMethod("s", "GET_ITEM", findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90])));
      // console.log("LOCAL_PEER ::::::::::::: ", LOCAL_PEER);
      // console.log("REMOTE_PEER :::::::::::: ", REMOTE_PEER);

      const NICK_LIST = [
        storageMethod("l", "GET_ITEM", "localPlayer"), // local peer nick name
        storageMethod("s", "GET_ITEM", findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90])) // local peer nick name
      ];
      const TF = [
        X.enc(decodeTF(_t([99, 102, 112, 110]))), // "cfpn" : true
        X.enc(decodeTF(_t([100, 103, 118, 116, 97]))), // "dgvta" : false
      ];

      const FIRST_USER = NICK_LIST[Math.floor(Math.random() * TF.length)]; // true or false

      storageMethod("s", "SET_ITEM",
        findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]), // firstUser
        FIRST_USER
      );

      request("startState", {
        stat: "allReady",
        firstUser: FIRST_USER
      });
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

    cubeReadyEnd();
    saveSessionStorage();
    cubeNumCheck();
  };
};
