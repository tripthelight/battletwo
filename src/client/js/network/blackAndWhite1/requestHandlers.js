// 공통 메시지
export const REQUEST_COMMON_HANDLERS = {
  // 상대가 반칙 - ex) 플레이어가 직접 storage를 수정
  opponentFouls: (v) => ({ type: 'opponentFouls', ...v }),
};

// 일반 메시지
export const REQUEST_HANDLERS = {
  // gameState : ready
  startCheck: (v) => ({ type: 'startCheck', ...v }),
  startState: (v) => ({ type: 'startState', ...v }),
  gameStateSync: (v) => ({ type: 'gameStateSync', ...v }),
  enemyCubeOrder: (v) => ({ type: 'enemyCubeOrder', ...v }),
  enemyOrder: (v) => ({ type: 'enemyOrder', ...v }),

  // gameState : playing
  enterPlayingSend: (v) => ({ type: 'enterPlayingSend', ...v }),
  enterPlayingRecv: (v) => ({ type: 'enterPlayingRecv', ...v }),
  beforePlayerNumber: (v) => ({ type: 'beforePlayerNumber', ...v }),
  afterPlayerNumber: (v) => ({ type: 'afterPlayerNumber', ...v }),
  resultRound: (v) => ({ type: 'resultRound', ...v }),
};
