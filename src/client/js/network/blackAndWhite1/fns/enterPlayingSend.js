import errorManager from '@/client/js/module/errorHandler/errorManager';
import { request } from '@/client/js/network/blackAndWhite1/request';
import {
  isGameStateProof,
  isLocalGameState,
  publicGameStateProof
} from '@/client/js/views/game/blackAndWhite1/fns/common/gameStateSync';

/** @typedef {{ stateCode?: string }} EnterPlayingSendInterface */
/**
 * Reply only after this peer has proven that its local gameState is playing.
 * The proof token is public-key based, because private-key storage values differ by peer.
 * @param {EnterPlayingSendInterface} _data
 */
export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      const remoteRequestsPlaying =
        isGameStateProof('playing', data?.stateCode);

      if (!remoteRequestsPlaying || !isLocalGameState('playing')) return;

      request('enterPlayingRecv', {
        stateCode: publicGameStateProof('playing'),
      });
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
