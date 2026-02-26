import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import moveInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveInnerSquare';
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("beforePlayerNumber DATA ::::::: ", _data);
      const { index } = _data;
      moveEnemyCube(index);
      moveInnerSquare();
      changeActiveUser();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
