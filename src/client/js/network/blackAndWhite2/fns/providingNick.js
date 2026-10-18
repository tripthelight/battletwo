import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite2/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { getRole } from '@/client/js/module/webRTC/connectSignaling';
import drawFirstPlayer from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/drawFirstPlayer';

// import findNickname from '@/client/js/functions/findNickname';
// import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
// import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      const { nick } = _data;
      storageMethod("s", "SET_ITEM",
        findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]), // enemyNick
        nick
      );

      const firstEnter = getRole(); // true: impolite | false: polite
      if (firstEnter) {
        // 처음 입장해서 상대 Peer의 입장을 대기했던 Peer가 선플레이어를 정함
        const NICK_LIST = [
          storageMethod("l", "GET_ITEM", 'localPlayer'), // local player
          storageMethod("s", "GET_ITEM", findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87])), // remote player
        ];
        const randomPeer = Math.floor(Math.random() * NICK_LIST.length);
        // 첫 게임 진입시 지정되는 첫플레이어: firstPlayer
        // 라운드마다 승리 후 선 플레이어: firstUser
        // 선플레이어: activeUser
        const firstPlayer = NICK_LIST[randomPeer];
        console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer);
        console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer === storageMethod("l", "GET_ITEM", 'localPlayer') ? 'LOCAL' : 'REMOTE');

        // 선택된 First Player를 상대에게 전달
        request('choiceFirstPlayer', {
          firstPlayer: firstPlayer,
        });

        storageMethod(
          "s",
          "SET_ITEM",
          findCharCode([86, 88, 85, 83, 90, 65, 84, 70, 78, 69]), // firstUser
          firstPlayer === storageMethod("l", "GET_ITEM", 'localPlayer') ?
            X.enc(decodeTF(_t([99, 109, 114, 117]))) // "cmru" : true
            :
            X.enc(decodeTF(_t([106, 103, 98, 116, 110]))) // "jgbtn" : false
        );

        drawFirstPlayer();
      }

      /*
      const LOCAL_PEER = findNickname('localPlayer');
      const REMOTE_PEER = fromUnicodePoints(
        parsePayloadToHex(
          storageMethod("s", "GET_ITEM", findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]))  // enemyNick
        )
      );
      console.log("내 닉네임 >>>>>>>>>>>>>>> ", LOCAL_PEER);
      console.log("상대 닉네임 >>>>>>>>>>>>> ", REMOTE_PEER);
      console.log("내 role >>>>>>>>>>>>>>>> ", getRole());

      const firstEnter = getRole(); // true: impolite | false: polite
      if (firstEnter) {
        // 처음 입장해서 상대 Peer의 입장을 대기했던 Peer가 선플레이어를 정함
        const NICK_LIST = [LOCAL_PEER, REMOTE_PEER];
        const randomPeer = Math.floor(Math.random() * NICK_LIST.length);
        const firstPlayer = NICK_LIST[randomPeer];
        console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer);
      }
      */
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
