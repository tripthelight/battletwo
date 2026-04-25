import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_state) => {
  const BOARD_ACTIVE = document.querySelector(".board");
  if (!BOARD_ACTIVE) throw throwObj('elementLoss', "boardActive.js - .board element failed.");
  BOARD_ACTIVE.classList.remove("select-active");
  if (_state) {
    BOARD_ACTIVE.classList.add("select-active");
  } else {
    BOARD_ACTIVE.classList.remove("select-active");
  }
};
