import gameOverRes from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/gameOverRes";
import lastRoundBtn from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundBtn";
import setStorageGameResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/setStorageGameResult";

export default (result) => {
  let res = gameOverRes(result);
  const RESULT_INFO = document.querySelector(".last-round-info");
  if (!RESULT_INFO) {
    let elem = document.createElement("div");
    let tit = document.createElement("span");
    let list = document.createElement("div");
    let listUl;
    let innerList;
    elem.classList.add("last-round-info");
    list.classList.add("list");
    tit.innerHTML = res;

    const RESULT_LIST = window.sessionStorage.getItem("result");
    const RESULT_ARR = JSON.parse(RESULT_LIST);
    for (let i = 0; i < RESULT_ARR.length; i++) {
      listUl = document.createElement("ul");
      innerList = document.createElement("li");
      innerList.innerHTML = RESULT_ARR[i].round;
      listUl.appendChild(innerList);
      innerList = document.createElement("li");
      innerList.innerHTML = RESULT_ARR[i].result == "die" ? "lose" : RESULT_ARR[i].result;
      listUl.appendChild(innerList);
      list.appendChild(listUl);
    }

    elem.appendChild(tit);
    elem.appendChild(list);
    const CONTAINER_EL = document.getElementById("container");
    if (CONTAINER_EL) {
      CONTAINER_EL.appendChild(elem);
      lastRoundBtn(elem);
    }
  }

  // win | lose | drew
  setStorageGameResult("blackandwhite1", result);
};
