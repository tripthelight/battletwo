import errorManager from '@/client/js/module/errorHandler/errorManager';
import enterPlaying from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enterPlaying";
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

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
      console.log("enterPlayingRecv DATA ::::::: ", _data);
      const { enter } = _data;
      if (enter) {
        // 나도, 상대도 gameState playing 임
        enterPlaying();
        LOADING_EVENT.hide();
      }
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
