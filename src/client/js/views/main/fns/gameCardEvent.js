import GAME_LIST from '@/client/js/webpack/JSON/gameList.json';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'gameCardEvent.js - container element failed.');
    const cardWrap = container.querySelector(".game-cards");
    if (!cardWrap) throw throwObj('elementLoss', 'gameCardEvent.js - .game-cards element failed.');

    const gameList = GAME_LIST.gameList;
    const cardsSVG = cardWrap.querySelectorAll(".card");
    if (cardsSVG.length !== gameList.length) throw throwObj('elementLoss', 'gameCardEvent.js - cards SVG length failed.');

    // ======================================================
    // ======================================================
    // ======================================================

    // PC - Mouse Over
    cardWrap.addEventListener("pointerover", (event) => {
      const path = event.target.closest(".shape-path");
      if (!path) return;
      const index = Number(path.dataset.index);
      const shape = path.dataset.shape;
      console.log("mouse over:", index, shape);
      path.classList.add("is-hovered");
    });

    // PC - Mouse Out
    cardWrap.addEventListener("pointerout", (event) => {
      const path = event.target.closest(".shape-path");
      if (!path) return;
      path.classList.remove("is-hovered");
    });

    // PC, Mobile - Click
    cardWrap.addEventListener("click", (event) => {
      const path = event.target.closest(".shape-path");
      if (!path) return;
      const index = Number(path.dataset.index);
      const shape = path.dataset.shape;
      console.log("click:", index, shape);
      handleShapeClick(index, shape, path);
    });

    function handleShapeClick(index, shape, path) {
      console.log(`${index}번 도형 클릭`, shape);
    }

    // ======================================================
    // ======================================================
    // ======================================================

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'gameCardEvent.js error'
    );
  }
}
