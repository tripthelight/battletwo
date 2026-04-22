import errorManager from '@/client/js/module/errorHandler/errorManager';
import enterPlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enterPlaying';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import {
  isGameStateProof,
  isLocalGameState
} from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

/** @typedef {{ stateCode?: string }} EnterPlayingRecvInterface */
/**
 * Enter the playing UI only when both peers have proven the same playing stage.
 * @param {EnterPlayingRecvInterface} _data
 */
export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      const remoteIsPlaying =
        isGameStateProof('playing', data?.stateCode);

      if (!remoteIsPlaying || !isLocalGameState('playing')) return;

      enterPlaying();
      LOADING_EVENT.hide();
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
