import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import evenOdd from "@/client/js/views/game/blackAndWhite1/fns/common/evenOdd";

/**
 * PC 일 경우
 * 여기서 reactiveState.dragSrcEl : 내가 선택해서 drag 시작한 큐브
 * 여기서 e.target : 내가 선택해서 drag 시작한 큐브의 아래 깔려있는 큐브
 */
export default (e) => {
  // console.log("shuffleDrop : e.target >>>>>>> ", e.target);
  // console.log("shuffleDrop : dragSrcEl >>>>>> ", reactiveState.dragSrcEl);

  const WRAP_UL = e.target.closest("ul.cube");
  const SELC_LI = e.target;
  const LI_IDX = Array.prototype.indexOf.call(WRAP_UL.children, SELC_LI);
  // console.log("선택 후 옮긴 큐브의 index ::::::: ", LI_IDX);
  reactiveState.idxE = LI_IDX;

  if (reactiveState.dragSrcEl != e.target) {
    // 아래있는 큐브의 숫자 변경
    reactiveState.dragSrcEl.innerHTML = e.target.innerHTML;

    // 들었던 큐브의 숫자 변경
    e.target.innerHTML = e.dataTransfer.getData("text");
    // 들었던 큐브의 컬러 변경
    evenOdd(e.target);
  }
  return false;
};
