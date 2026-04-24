import { getStyle } from "@/client/js/functions/comnExport";

export default () => {
  document.body.classList.remove("landscape");
  document.body.classList.remove("portrait");

  const WW = window.innerWidth;
  const WH = window.innerHeight;
  if (WW >= 600) {
    document.body.classList.add("landscape");
  } else {
    if (WW >= WH) {
      document.body.classList.add("landscape");
    } else if (WW < WH) {
      if (WH - WW <= 246) {
        document.body.classList.add("landscape");
      } else {
        document.body.classList.add("portrait");
      }
    }
  }

  const BOARD = document.querySelector(".board");
  if (!BOARD) return;
  const BOARD_HEIGHT = BOARD.clientWidth + getStyle(BOARD, "border-left-width") + getStyle(BOARD, "border-right-width");
  BOARD.style.height = `${BOARD_HEIGHT}px`;
};
