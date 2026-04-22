import { request } from '@/client/js/network/blackAndWhite1/request';
import {
  encodeCubeNumberForRemote,
  encodeMoveIndex
} from '@/client/js/views/game/blackAndWhite1/fns/common/movePayload';
import { saveAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export default (num, index) => {
  saveAfterPlayerNum(num);
  request("afterPlayerNumber", {
    numCode: encodeCubeNumberForRemote(num),
    indexCode: encodeMoveIndex(index),
  });
};
