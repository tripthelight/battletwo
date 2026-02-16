// common messate
import opponentFouls from '@/client/js/functions/opponentFouls';

// gameState : ready
import startCheck from '@/client/js/network/blackAndWhite1/fns/startCheck';
import startState from '@/client/js/network/blackAndWhite1/fns/startState';
import enemyCubeOrder from '@/client/js/network/blackAndWhite1/fns/enemyCubeOrder';
import enemyOrder from '@/client/js/network/blackAndWhite1/fns/enemyOrder';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // gameState : ready
  startCheck: (msg) => startCheck(msg),
  startState: (msg) => startState(msg),
  enemyCubeOrder: (msg) => enemyCubeOrder(msg),
  enemyOrder: (msg) => enemyOrder(msg),
};
