import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import { request } from '@/client/js/network/blackAndWhite1/request';

/** @typedef {{ enter: boolean }} EnterPlayingSendInterface */
/**
 * 내가 waitEnemyShuffle 단게에서 새로고침했으면, playing 진입 못하고 있는 상태일 수 있음
 * 상대 peer가 gameState Playing으로 진입하면, 나에게 진입했다고 보냄
 * 상대 peer가 gameState Playing으로 진입하는 순간 동시에 나도 gameState Playing으로 진입해야 됨
 * @param {EnterPlayingSendInterface} _data true
 */
export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      console.log("enterPlayingSend DATA ::::::: ", _data);
      request("enterPlayingRecv", {
        enter: // gameState === playing
          storageMethod("s", "GET_ITEM",
            findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]) // gameState
          ) ===
          findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78]) // playing
      });
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
