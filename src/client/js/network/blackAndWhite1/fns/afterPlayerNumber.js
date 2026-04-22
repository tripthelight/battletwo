import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import battleCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/battleCard';
import {
  decodeCubeNumberFromRemote,
  decodeMoveIndex
} from '@/client/js/views/game/blackAndWhite1/fns/common/movePayload';
import { saveAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("afterPlayerNumber DATA ::::::: ", _data);
      const index = decodeMoveIndex(_data, 'afterPlayerNumber');
      const num = decodeCubeNumberFromRemote(_data, 'afterPlayerNumber');
      saveAfterPlayerNum(num);
      moveEnemyCube(index);
      battleCard(num);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
