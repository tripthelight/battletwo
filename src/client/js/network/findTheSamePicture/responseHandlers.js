// common messate
import opponentFouls from '@/client/js/functions/opponentFouls';

// gameState : choiceFirstPlayer


// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // gameState : choiceFirstPlayer
};
