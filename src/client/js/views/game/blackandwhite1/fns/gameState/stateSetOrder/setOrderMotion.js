import { timeInterval_4200, timeInterval_5200 } from "@/client/js/functions/variable";
import gameState from '@/client/js/gameState/blackAndWhite1';
import motionStyle from "@/client/js/views/game/blackAndWhite1/fns/common/motionStyle";

export default () => {
  if (!document.querySelector(".order-motion")) {
    let aniState = false;
    let elem = document.createElement("div");
    let playerDl = document.createElement("dl");
    let playerDt = document.createElement("dt");
    let playerDd = document.createElement("dd");
    let playerFront = document.createElement("span");
    let playerBack = document.createElement("span");
    let enemyDl = document.createElement("dl");
    let enemyDt = document.createElement("dt");
    let enemyDd = document.createElement("dd");
    let enemyFront = document.createElement("span");
    let enemyBack = document.createElement("span");
    playerFront.classList.add("fornt");
    playerBack.classList.add("back");
    enemyFront.classList.add("fornt");
    enemyBack.classList.add("back");
    elem.classList.add("order-motion");
    if (window.sessionStorage.firstUser == window.localStorage.uid) {
      playerFront.innerText = window.localStorage.nickname;
      enemyFront.innerText = window.localStorage.nickname;
      playerBack.innerText = window.sessionStorage.enemyNick;
      enemyBack.innerText = window.sessionStorage.enemyNick;
    } else {
      playerFront.innerText = window.sessionStorage.enemyNick;
      enemyFront.innerText = window.sessionStorage.enemyNick;
      playerBack.innerText = window.localStorage.nickname;
      enemyBack.innerText = window.localStorage.nickname;
    }
    playerDd.appendChild(playerFront);
    playerDd.appendChild(playerBack);
    playerDl.appendChild(playerDt);
    playerDl.appendChild(playerDd);
    enemyDd.appendChild(enemyFront);
    enemyDd.appendChild(enemyBack);
    enemyDl.appendChild(enemyDt);
    enemyDl.appendChild(enemyDd);
    elem.appendChild(playerDl);
    elem.appendChild(enemyDl);
    const ENOTAINER_EL = document.getElementById("container");
    if (ENOTAINER_EL) {
      ENOTAINER_EL.appendChild(elem);
      aniState = true;
    }
    let aniInterval = setInterval(() => {
      if (aniState === true) {
        clearInterval(aniInterval);
        motionStyle(elem);
      }
    }, 1);
    setTimeout(() => {
      clearInterval(aniInterval);
    }, timeInterval_4200);
    setTimeout(() => {
      elem.classList.remove("active");
      gameState.playing();
    }, timeInterval_4200);
    setTimeout(() => {
      elem.remove();
    }, timeInterval_5200);
  }
};
