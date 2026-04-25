import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findTouchActive from "@/client/js/views/game/findTheSamePicture/fns/common/findTouchActive";
import findCharCode from '@/client/js/functions/findCharCode';
import { CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";

export default (_touchNum, _makeUserCard) => {
  // const PN = window.sessionStorage.pn;
  // if (!PN) throw throwObj('sessionStorageLoss', "sameCardCheck.js - pn not found");

  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "sameCardCheck.js - pn not found");

  const PLAYER_ACTIVE = findTouchActive("p");
  if (CARD_LIST[_touchNum] === _makeUserCard[PLAYER_ACTIVE]) return true;
  return false;
};
