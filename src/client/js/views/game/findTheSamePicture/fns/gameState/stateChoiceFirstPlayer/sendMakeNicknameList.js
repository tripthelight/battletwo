import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/findTheSamePicture/request';
import findNickname from '@/client/js/functions/findNickname';
import pnenCheck from '@/client/js/views/game/findTheSamePicture/fns/common/pnenCheck';
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';
import findFirstEnter from "@/client/js/views/game/findTheSamePicture/fns/common/findFirstEnter";

export default async () => {
  try {
    const encryptKey1 = findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]); // nicknameList
    const encryptKey2 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
    if (
      storageMethod('s', 'GET_ITEM', encryptKey1) ||
      storageMethod('s', 'GET_ITEM', encryptKey2)
    ) {
      return findTheSamePictureGameState.firstUserAni();
    };

    // const T = X.dec(X.enc(decodeTF(_t([107, 119, 104, 110])))) // "kwhn" : true;
    // const F = X.dec(X.enc(decodeTF(_t([100, 113, 98, 116, 97])))) // "dqbta" : false;
    // console.log("true ::::: ", typeof T, T);
    // console.log("false :::: ", typeof F, F);

    if (
      findFirstEnter([107, 119, 104, 110], [100, 113, 98, 116, 97], "sendMakeNicknameList") // "kwhn" : true, "dqbta" : false
    ) {
      //
    } else {
      const ARR = await pnenCheck(); // 내 큐브들

      storageMethod('s', 'SET_ITEM',
        findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]), // pn
        JSON.stringify(ARR)
      );

      request('sendNickname', {
        nickname: findNickname('localPlayer'),
        arr: ARR
      });
    }
  } catch (error) {
    throw throwObj('dataManipulation', 'sendMakeNicknameList.js - make nickname send failed.');
  }
}
