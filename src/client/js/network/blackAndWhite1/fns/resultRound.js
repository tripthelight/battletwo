import errorManager from '@/client/js/module/errorHandler/errorManager';
import nextRoundCheck from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/nextRoundCheck';
import showBattleResult from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult";

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("resultRound DATA ::::::: ", _data);
      const { resultSend } = _data;
      let result = "";
      switch (resultSend) {
        case "win":
          result = "win";
          break;
        case "die":
          result = "die";
          break;
        case "drew":
          result = "drew";
          break;
        default:
          // error
          // return waitEnemy();
          break;
      };

      showBattleResult(result);
      nextRoundCheck();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
