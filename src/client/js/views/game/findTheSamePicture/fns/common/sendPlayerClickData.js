import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/findTheSamePicture/request';
import {
  getActiveList,
  getEnArr,
  getPnArr,
} from '@/client/js/views/game/findTheSamePicture/fns/common/sessionState';

export default (_clickNum, _clickBoardNum, _state) => {
  const encryptKey1 = findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]); // round
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - round failed.");

  const ROUND_NEXT = _state ? Number(encryptVal1) : Number(Number(encryptVal1) + 1);
  storageMethod('s', 'SET_ITEM', encryptKey1, ROUND_NEXT);

  const SEND_PN_ARR = getPnArr();
  const SEND_EN_ARR = getEnArr();
  const ACTIVE_LIST = getActiveList();
  const PLAYER_ACTIVE = Number(ACTIVE_LIST[SEND_EN_ARR[1]]);

  if (!Number.isInteger(PLAYER_ACTIVE)) {
    throw throwObj('dataManipulation', "sendPlayerClickData.js - player active failed.");
  }

  request('clickData', {
    clickBoardNum: _clickBoardNum,
    playerActiveIndex: PLAYER_ACTIVE,
    pn: SEND_PN_ARR,
    clickNum: _clickNum,
    round: Number(ROUND_NEXT),
    state: _state,
  });
};
