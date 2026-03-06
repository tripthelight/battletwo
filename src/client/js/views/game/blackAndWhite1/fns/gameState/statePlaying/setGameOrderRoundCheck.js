import gameState from '@/client/js/gameState/blackAndWhite1';
// import waitEnemy from "../common/waitEnemy.js";

export default () => {
  const ROUND = window.sessionStorage.getItem("round");

  console.log("ROUND >>>>>>>>>>> ", ROUND);

  if (ROUND < 10) {
    console.log("ROUND >>>>>>>>>>>>>>>> 10 미만");
    // 1 ~ 8 ROUND
    // console.log('ROUND :::::::: ', ROUND);
  } else if (ROUND == 10) {
    console.log("ROUND >>>>>>>>>>>>>>>> 10 ");
    // LAST ROUND
    // console.log('ROUND : LAST :', ROUND);
    gameState.gameOver();
    // TODO :: last event
  } else {
    console.log("ROUND >>>>>>>>>>>>>>>> ERROR ");
    // error
    // waitEnemy("error");
  }
};
