export default (event) => {
  event.preventDefault();
  const BLACK_SQUARE = document.querySelector(".black-square");
  if (!BLACK_SQUARE.classList.contains("over")) {
    BLACK_SQUARE.classList.add("over");
  }
};
