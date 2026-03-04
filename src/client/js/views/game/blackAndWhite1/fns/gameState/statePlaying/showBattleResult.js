import { timeInterval_1000 } from "@/client/js/functions/variable";
import scoreAssignment from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/scoreAssignment";
import countRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/countRound";
import resetCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/resetCard";
import setGameOrderRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRound";

export default (res) => {
  const elem = document.createElement("div");
  elem.classList.add("show-battle-result");
  elem.classList.add(res);
  const CONTAINER_EL = document.getElementById("container");
  if (CONTAINER_EL) {
    CONTAINER_EL.appendChild(elem);
    setTimeout(() => {
      elem.remove();
      scoreAssignment(res);
      countRound();
      resetCard();
      setGameOrderRound(res);
    }, timeInterval_1000);
  }
};
