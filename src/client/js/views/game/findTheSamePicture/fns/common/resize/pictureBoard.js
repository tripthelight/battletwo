export default () => {
  const PICTURE_BOARD = document.querySelector(".picture-board");
  if (!PICTURE_BOARD) return;
  const BOARD = PICTURE_BOARD.querySelector(".board");
  if (!BOARD) return;
  const CARD = BOARD.querySelectorAll(".card");
  if (CARD.length <= 0) return;
  for (let i = 0; i < CARD.length; i++) {
    let btnEl = CARD[i].querySelector(".btn");
    if (!btnEl) return;
    let frontEl = btnEl.querySelector("span.front");
    if (!frontEl) return;
    frontEl.style.fontSize = `${btnEl.clientWidth / 2}px`;
  }
};
