import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";

export default (_user) => {
  const encryptKey1 = findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]); // pn
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj("sessionStorageLoss", "findIconActive.js - pn not found");
  const encryptKey2 = findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]); // en
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj("sessionStorageLoss", "findIconActive.js - en not found");

  const EN_ARR = JSON.parse(encryptVal1);
  const PN_ARR = JSON.parse(encryptVal2);

  // console.log("PN_ARR : ", PN_ARR);
  // console.log("EN_ARR : ", EN_ARR);

  // const PN = window.sessionStorage.pn;
  // const EN = window.sessionStorage.en;
  // if (!PN || !EN) throw throwObj("sessionStorageLoss", "pn en not found");
  // const PN_ARR = JSON.parse(PN);
  // const EN_ARR = JSON.parse(EN);

  // const ACTIVE_LIST = window.sessionStorage.getItem(findRandomName(5));
  const ACTIVE_LIST = storageMethod('s', 'GET_ITEM', findRandomName(5));
  if (!ACTIVE_LIST) throw throwObj("sessionStorageLoss", "findIconActive.js - active list not found");

  const ACTIVE_LIST_ARR = JSON.parse(ACTIVE_LIST);

  if (_user === "p") {
    console.log("ACTIVE_LIST ::::::::::::::::::: ", ACTIVE_LIST) // 이게 이상함 ???
    console.log("EN_ARR[1] ::::::::::::::::::::: ", EN_ARR[1])
    console.log("ACTIVE_LIST_ARR[EN_ARR[1]] :::: ", ACTIVE_LIST_ARR[EN_ARR[1]])
  }



  if (_user === "p") return ACTIVE_LIST_ARR[EN_ARR[1]];
  // enemy는 뒤에서 부터 순서를 잡음
  // 뒤에서 부터 시작이므로 카드배열의 총 length인 19에서 enemy 의 아이콘이 위치한 index를 마이너스 시킴
  return Number(19 - ACTIVE_LIST_ARR[PN_ARR[1]]);
};
