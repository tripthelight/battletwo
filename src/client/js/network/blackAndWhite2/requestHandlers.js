// 공통 메시지
export const REQUEST_COMMON_HANDLERS = {
  // 상대가 반칙 - ex) 플레이어가 직접 storage를 수정
  opponentFouls: (v) => ({ type: 'opponentFouls', ...v }),
  // 다음 STEP으로 진행
  goNextStep: (v) => ({ type: 'goNextStep', ...v }),
};

// 일반 메시지
export const REQUEST_HANDLERS = {
  // gameState : ready
  providingNick: (v) => ({ type: 'providingNick', ...v }),
  choiceFirstPlayer: (v) => ({ type: 'choiceFirstPlayer', ...v }),

  // gameState : playing
};
