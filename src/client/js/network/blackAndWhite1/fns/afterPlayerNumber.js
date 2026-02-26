import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import battleCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/battleCard';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("afterPlayerNumber DATA ::::::: ", _data);
      const { num, index } = _data;
      moveEnemyCube(index);
      battleCard(num);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
