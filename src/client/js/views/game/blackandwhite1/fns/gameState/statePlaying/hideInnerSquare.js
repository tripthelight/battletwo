import { timeInterval_201 } from "@/client/js/functions/variable";

export default () => {
  const INNER_SQUARE = document.querySelector(".inner-square");
  if (INNER_SQUARE) {
    INNER_SQUARE.classList.add("hide");
    setTimeout(() => {
      INNER_SQUARE.remove();
    }, timeInterval_201);
  }
};
