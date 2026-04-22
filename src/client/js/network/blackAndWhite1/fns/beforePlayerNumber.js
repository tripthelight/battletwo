import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import moveInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveInnerSquare';
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';
import { decodeMoveIndex } from '@/client/js/views/game/blackAndWhite1/fns/common/movePayload';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("beforePlayerNumber DATA ::::::: ", _data);
      const index = decodeMoveIndex(_data, 'beforePlayerNumber');
      moveEnemyCube(index);
      changeActiveUser();
      moveInnerSquare();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
