// common messate
import opponentFouls from '@/client/js/functions/opponentFouls';

// gameState : choiceFirstPlayer
import sendNicknameRes from '@/client/js/network/findTheSamePicture/fns/sendNicknameRes';
import firstUserDataRes from '@/client/js/network/findTheSamePicture/fns/firstUserDataRes';

// gameState : playing
import clickDataRes from '@/client/js/network/findTheSamePicture/fns/clickDataRes';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // gameState : choiceFirstPlayer
  sendNickname: (msg) => sendNicknameRes(msg),
  firstUserData: (msg) => firstUserDataRes(msg),

  // gameState : playing
  clickData: (msg) => clickDataRes(msg),
};
