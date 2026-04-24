import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { getInitRole } from '@/client/js/module/webRTC/connectSignaling';
import { request } from '@/client/js/network/findTheSamePicture/request';
import findNickname from '@/client/js/functions/findNickname';
import pnenCheck from '@/client/js/views/game/findTheSamePicture/fns/common/pnenCheck';
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

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

    const ROLE = getInitRole();
    const FIRST_ENTER = ROLE === "impolite" ? true : ROLE === "polite" ? false : null;
    if (FIRST_ENTER === null) throw throwObj('dataManipulation', 'sendMakeNicknameList.js - role failed.');
    if (FIRST_ENTER) {
      //
    } else {
      const ARR = await pnenCheck();
      const encryptKey3 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
      storageMethod('s', 'SET_ITEM', encryptKey3, JSON.stringify(ARR));
      request('sendNickname', { nickname: findNickname('localPlayer'), arr: ARR });
    }
  } catch (error) {
    throw throwObj('dataManipulation', 'sendMakeNicknameList.js - make nickname send failed.');
  }
}
