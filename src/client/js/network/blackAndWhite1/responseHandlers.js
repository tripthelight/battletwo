import opponentFouls from '@/client/js/functions/opponentFouls';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),
};
