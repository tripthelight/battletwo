import passScore from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/passScore";

export default (result) => {
  let resArr = [];
  if (window.sessionStorage.getItem("result")) {
    resArr = JSON.parse(window.sessionStorage.getItem("result"));
  }
  let newObj = {
    round: window.sessionStorage.getItem("round"),
    result: result,
  };
  resArr.push(newObj);
  window.sessionStorage.setItem("result", JSON.stringify(resArr));
  passScore(resArr);
};
