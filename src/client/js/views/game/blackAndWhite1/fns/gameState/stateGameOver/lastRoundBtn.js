import removeGameScene from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/removeGameScene";

export default (el) => {
  const btn = document.createElement("a");
  btn.setAttribute("href", "/");
  btn.setAttribute("title", "move page");
  btn.innerHTML = "GO HOME";
  el.appendChild(btn);
  removeGameScene();
};
