import throwObj from '@/client/js/module/errorHandler/throwObj';
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";

export default (_user) => {
  const PN = window.sessionStorage.pn;
  const EN = window.sessionStorage.en;
  if (!PN || !EN) throw throwObj("sessionStorageLoss", "pn en not found");
  const PN_ARR = JSON.parse(PN);
  const EN_ARR = JSON.parse(EN);

  const ACTIVE_LIST = window.sessionStorage.getItem(findRandomName(5));
  if (!ACTIVE_LIST) throw throwObj("sessionStorageLoss", "active list not found");
  const ACTIVE_LIST_ARR = JSON.parse(ACTIVE_LIST);

  if (_user === "p") return ACTIVE_LIST_ARR[EN_ARR[1]];
  // enemy는 뒤에서 부터 순서를 잡음
  // 뒤에서 부터 시작이므로 카드배열의 총 length인 19에서 enemy 의 아이콘이 위치한 index를 마이너스 시킴
  return Number(19 - ACTIVE_LIST_ARR[PN_ARR[1]]);
};
