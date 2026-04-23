import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';
import battleCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/battleCard';
import { afterPlayerNumKey } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';
import {
  getCurrentRound,
  loadRoundResults
} from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

const beforePlayerNumKey = () => (
  findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]) // beforePlayerNum
);

export default () => {
  const round = getCurrentRound();
  if (round >= 10) return;

  const hasSavedResult = loadRoundResults().some((item) => item.round === round);
  if (hasSavedResult) return;

  const beforePlayerNum = storageMethod('s', 'GET_ITEM', beforePlayerNumKey());
  const afterPlayerNum = storageMethod('s', 'GET_ITEM', afterPlayerNumKey());
  if (!beforePlayerNum || !afterPlayerNum) return;

  battleCard(cubeToNum(afterPlayerNum));
};

