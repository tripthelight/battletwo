// common messate
import opponentFouls from '@/client/js/functions/opponentFouls';
import goNextStep from '@/client/js/network/blackAndWhite2/fns/goNextStep';

// gameState : ready
import providingNick from '@/client/js/network/blackAndWhite2/fns/providingNick';
import choiceFirstPlayer from '@/client/js/network/blackAndWhite2/fns/choiceFirstPlayer';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),
  goNextStep: (msg) => goNextStep(msg),

  // gameState : ready
  providingNick: (msg) => providingNick(msg),
  choiceFirstPlayer: (msg) => choiceFirstPlayer(msg),

  // gameState : playing
};
