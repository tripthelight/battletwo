import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import findNickname from '@/client/js/functions/findNickname';
import alpabetList from "@/client/js/views/game/findTheSamePicture/fns/common/makeAlpabet";
import makeRandomNum from "@/client/js/views/game/findTheSamePicture/fns/common/makeRandomNum";
import pnenCheck from '@/client/js/views/game/findTheSamePicture/fns/common/pnenCheck';
import firstSessionInit from '@/client/js/views/game/findTheSamePicture/fns/common/firstSessionInit';
import { request } from '@/client/js/network/findTheSamePicture/request';
import { getInitRole } from '@/client/js/module/webRTC/connectSignaling';
import findTheSamePictureGameState from '@/client/js/gameState/findTheSamePicture';

export default async (_data) => {
  const encryptKey1 = findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]); // nicknameList
  const encryptKey2 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
  if (
    storageMethod('s', 'GET_ITEM', encryptKey1) ||
    storageMethod('s', 'GET_ITEM', encryptKey2)
  ) {
    return;
  };

  const MY_NICKNAME = findNickname('localPlayer');
  const NICKNAME_LIST = [MY_NICKNAME, _data.nickname];
  const FIRST_USER = parseInt(Math.random() * 2) ? MY_NICKNAME : _data.nickname;
  const FIRST_USER_STATE = FIRST_USER === MY_NICKNAME;

  const ALPABAT_LIST = await alpabetList();
  const CARD_IMGS = await makeRandomNum();
  const RANDOM_NUMS = await makeRandomNum();
  const ARR = await pnenCheck(_data.arr); // 내 큐브들

  storageMethod('s', 'SET_ITEM',
    findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]), // pn
    JSON.stringify(ARR)
  );

  const DATA = {
    nicknameList: NICKNAME_LIST,
    alpabetList: ALPABAT_LIST,
    cardImgs: CARD_IMGS,
    randomNums: RANDOM_NUMS,
  };

  firstSessionInit({
    ...DATA,
    firstUser: FIRST_USER_STATE,
    arr: _data.arr, // 상대 큐브들 - en에 저장
  });

  request('firstUserData', {
    ...DATA,
    firstUser: FIRST_USER_STATE ? false : true,
    arr: ARR, // 내 큐브들
  });

  storageMethod('s', 'SET_ITEM',
    findCharCode([67, 81, 82, 88, 79, 85, 66, 78, 89, 69]), // gameStateNext
    false
  );

  const ROLE = getInitRole();
  const FIRST_ENTER = ROLE === "impolite" ? true : ROLE === "polite" ? false : null;
  if (FIRST_ENTER === null) throw throwObj('dataManipulation', 'receiveMakeNicknameList.js - role failed.');
  if (FIRST_ENTER) findTheSamePictureGameState.firstUserAni();
}
