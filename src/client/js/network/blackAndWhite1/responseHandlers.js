// common messate
import opponentFouls from '@/client/js/functions/opponentFouls';

// gameState : ready
import startCheck from '@/client/js/network/blackAndWhite1/fns/startCheck';
import startState from '@/client/js/network/blackAndWhite1/fns/startState';
import gameStateSync from '@/client/js/network/blackAndWhite1/fns/gameStateSync';
import enemyCubeOrder from '@/client/js/network/blackAndWhite1/fns/enemyCubeOrder';
import enemyOrder from '@/client/js/network/blackAndWhite1/fns/enemyOrder';

// gameState : playing
import enterPlayingSend from '@/client/js/network/blackAndWhite1/fns/enterPlayingSend';
import enterPlayingRecv from '@/client/js/network/blackAndWhite1/fns/enterPlayingRecv';
import beforePlayerNumber from '@/client/js/network/blackAndWhite1/fns/beforePlayerNumber';
import afterPlayerNumber from '@/client/js/network/blackAndWhite1/fns/afterPlayerNumber';
import resultRound from '@/client/js/network/blackAndWhite1/fns/resultRound';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // gameState : ready
  startCheck: (msg) => startCheck(msg),
  startState: (msg) => startState(msg),
  gameStateSync: (msg) => gameStateSync(msg),
  enemyCubeOrder: (msg) => enemyCubeOrder(msg),
  enemyOrder: (msg) => enemyOrder(msg),

  // gameState : playing
  enterPlayingSend: (msg) => enterPlayingSend(msg),
  enterPlayingRecv: (msg) => enterPlayingRecv(msg),
  beforePlayerNumber: (msg) => beforePlayerNumber(msg),
  afterPlayerNumber: (msg) => afterPlayerNumber(msg),
  resultRound: (msg) => resultRound(msg),
};
