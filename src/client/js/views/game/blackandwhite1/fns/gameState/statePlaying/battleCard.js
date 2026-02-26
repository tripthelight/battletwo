import showBattleResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult";
import { request } from '@/client/js/network/blackAndWhite1/request';

export default (idx) => {
  const MY_CARD = Number(window.sessionStorage.getItem("beforePlayerNum"));
  let result = "";
  let resultSend = "";
  if (MY_CARD > idx) {
    // 내가 이김
    result = "win";
    resultSend = "die";
  } else if (MY_CARD < idx) {
    // 내가 짐
    result = "die";
    resultSend = "win";
  } else if (MY_CARD === idx) {
    // 비김
    result = "drew";
    resultSend = "drew";
  } else {
    // error
    // return waitEnemy(err);
  }
  showBattleResult(result);

  request("resultRound", { resultSend });
};
