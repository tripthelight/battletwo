import storageMethod from '@/client/js/module/storage/storageMethod';
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/findTheSamePicture/request';

export default (_clickNum, _clickBoardNum, _state) => {
  // const ROUND = window.sessionStorage.round;
  // if (!ROUND) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - round failed.");
  // const ROUND_NEXT = _state ? Number(ROUND) : Number(Number(ROUND) + 1);

  const encryptKey1 = findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]); // round
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - round failed.");

  const ROUND_NEXT = _state ? Number(encryptVal1) : Number(Number(encryptVal1) + 1);
  // window.sessionStorage.setItem("round", ROUND_NEXT);
  storageMethod('s', 'SET_ITEM', encryptKey1, ROUND_NEXT);

  // const SEND_PN = window.sessionStorage.pn;
  // if (!SEND_PN) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - pn failed.");
  // const SEND_PN_ARR = JSON.parse(SEND_PN);

  const encryptKey2 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - pn failed.");
  const SEND_PN_ARR = JSON.parse(encryptVal2);

  // const SEND_EN = window.sessionStorage.en;
  // if (!SEND_EN) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - en failed.");
  // const SEND_EN_ARR = JSON.parse(SEND_EN);

  const encryptKey3 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // pn
  const encryptVal3 = storageMethod('s', 'GET_ITEM', encryptKey3);
  if (!encryptVal3) throw throwObj('sessionStorageLoss', "sendPlayerClickData.js - en failed.");
  const SEND_EN_ARR = JSON.parse(encryptVal3);

  // const RANDOM_NUM = window.sessionStorage.getItem(findRandomName(5));
  const RANDOM_NUM = storageMethod('s', 'GET_ITEM', findRandomName(5));
  const RANDOM_NUM_LIST = JSON.parse(RANDOM_NUM);

  const PLAYER_ACTIVE = RANDOM_NUM_LIST[SEND_EN_ARR[1]];

  const CLICK_NUM = _clickNum;

  const SEND_DATA = {
    clickBoardNum: _clickBoardNum,
    playerActiveIndex: PLAYER_ACTIVE,
    pn: SEND_PN_ARR,
    clickNum: CLICK_NUM,
    round: Number(ROUND_NEXT),
    state: _state,
  };

  request('clickData', SEND_DATA);
};
