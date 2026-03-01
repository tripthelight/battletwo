import gameState from '@/client/js/gameState/blackAndWhite1';
// import waitEnemy from "../common/waitEnemy.js";

export default () => {
  const ROUND = window.sessionStorage.getItem("round");
  if (ROUND < 10) {
    // 1 ~ 8 ROUND
    // console.log('ROUND :::::::: ', ROUND);
  } else if (ROUND == 10) {
    // LAST ROUND
    // console.log('ROUND : LAST :', ROUND);
    gameState.gameOver();
    // TODO :: last event
  } else {
    // error
    // waitEnemy("error");
  }
};
