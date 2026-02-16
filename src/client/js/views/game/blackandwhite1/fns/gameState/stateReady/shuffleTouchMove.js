// import { activeIndex, posX, posY } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";

export default (e) => {
  const empty = Array.from(document.querySelectorAll(".empty"));
  e.target.style.zIndex = "3000";
  e.target.style.transform = "translate(" + -(reactiveState.posX - e.targetTouches[0].clientX) + "px, " + -(reactiveState.posY - e.targetTouches[0].clientY) + "px)";

  if (document.querySelector("ul.cube").clientHeight > e.target.clientHeight) {
    // 2줄 이상일 경우
    const ulMoveEl = Array.from(e.target.closest("ul").children);
    reactiveState.activeIndex = ulMoveEl.indexOf(e.target);
    let moveIndex = undefined;
    for (let i = 0; i < empty.length; i++) {
      const ot = empty[i].offsetTop;
      const ol = empty[i].offsetLeft;
      const ew = empty[i].clientWidth;
      const ewh = empty[i].clientHeight / 2;
      const eh = e.target.clientHeight;
      const ex = e.targetTouches[0].clientX;
      const ey = e.target.offsetTop + e.targetTouches[0].clientY - reactiveState.posY;

      if (ol <= ex && ol + ew >= ex) {
        if (ot == 0) {
          if (ot + ewh >= ey) {
            empty[i].classList.add("active");
            moveIndex = i;
          } else {
            empty[i].classList.remove("active");
          }
        } else {
          if (ot + ewh < ey + eh) {
            empty[i].classList.add("active");
            moveIndex = i;
          } else {
            empty[i].classList.remove("active");
          }
        }
      } else {
        empty[i].classList.remove("active");
      }
    }

    for (let i = 0; i < empty.length; i++) {
      if (moveIndex >= 0) {
        if (i < reactiveState.activeIndex) {
          if (i >= moveIndex) {
            if (empty[i].classList.contains("cubeEnd")) {
              empty[i].style.transform = "translate(" + -(empty[i].clientWidth * 3 + empty[i].clientWidth / 2) + "px, " + empty[i].clientHeight + "px)";
            } else {
              empty[i].style.transform = "translateX(" + e.target.clientWidth + "px)";
            }
          } else {
            empty[i].style.transform = "translateX(0)";
          }
        } else if (i >= reactiveState.activeIndex) {
          if (i <= moveIndex) {
            if (empty[i].classList.contains("cubeBreak")) {
              empty[i].style.transform = "translate(" + (empty[i].clientWidth * 3 + empty[i].clientWidth / 2) + "px, " + -empty[i].clientHeight + "px)";
            } else {
              empty[i].style.transform = "translateX(" + -e.target.clientWidth + "px)";
            }
          } else {
            empty[i].style.transform = "translateX(0)";
          }
        }
      } else {
        empty[i].style.transform = "translateX(0)";
      }
    }
  } else {
    // 1줄일 경우
    for (let i = 0; i < empty.length; i++) {
      if (empty[i].offsetLeft < e.targetTouches[0].clientX && empty[i].offsetLeft + empty[i].clientWidth > e.targetTouches[0].clientX) {
        empty[i].classList.add("active");
        if (i < reactiveState.activeIndex) {
          empty[i].style.transform = "translateX(" + e.target.clientWidth + "px)";
        } else {
          empty[i].style.transform = "translateX(" + -e.target.clientWidth + "px)";
        }
      } else {
        empty[i].classList.remove("active");
        if (i < reactiveState.activeIndex) {
          if (empty[i].offsetLeft < e.targetTouches[0].clientX) {
            empty[i].style.transform = "translateX(0)";
          }
        } else {
          if (empty[i].offsetLeft > e.targetTouches[0].clientX) {
            empty[i].style.transform = "translateX(0)";
          }
        }
      }
    }
  }
};
