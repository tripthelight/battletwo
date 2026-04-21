import { timeInterval_1000 } from "@/client/js/functions/variable";
import { dec } from '@/client/js/module/crypts/obf8lower';
import returnResult from '@/client/js/views/game/blackAndWhite1/fns/common/returnResult';
import scoreAssignment from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/scoreAssignment";
import countRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/countRound";
import resetCard from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/resetCard";
import nextRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/nextRoundCheck";
import setGameOrderRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRound";

/**
 * @param {string} res 난독화된 라운드 결과 "win" | "die" | "drew"
 */
export default (res) => {
  const elem = document.createElement("div");
  elem.classList.add("show-battle-result");
  elem.classList.add(returnResult(dec(res)));
  const CONTAINER_EL = document.getElementById("container");
  if (CONTAINER_EL) {
    CONTAINER_EL.appendChild(elem);
    setTimeout(() => {
      elem.remove();
      scoreAssignment(res);
      countRound();
      resetCard();
      nextRoundCheck();
      setGameOrderRound(res);
    }, timeInterval_1000);
  }
};
