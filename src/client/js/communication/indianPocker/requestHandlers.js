// 일반 메시지
export const REQUEST_HANDLERS = {
  choiceFirst: (v) => ({ type: 'choiceFirst', num: v }),
  choiceDrewCard: (v) => ({ type: 'choiceDrewCard', value: v }),
  basicBetting: (v) => ({ type: 'basicBetting', state: true, coinCount: v }),
  drewReadyCheck: () => ({ type: 'drewReadyCheck', state: true }),
  enterPlaying: (v) => ({ type: 'enterPlaying', gameState: v }),
  cardNum: (v) => ({ type: 'enemyCardNum', cardNum: v }),
  enterDrew: (v) => ({ type: 'enterDrew', gameState: v }),
  enterBasicBet: (v) => ({ type: 'enterBasicBet', gameState: v }),
  nextStep: (v) => ({ type: 'nextStep', value: v }),
  drewRefresh: (v) => ({ type: 'drewRefresh', value: v }),
  drewRefreshReturn: (v) => ({ type: 'drewRefreshReturn', value: v }),
};

// 배팅 메시지
export const REQUEST_BATTING_HANDLERS = {
  firstExtBet: (v) => ({ type: 'firstExtBet', ...v }),
  allInBet: (v) => ({ type: 'allInBet', ...v }),
  call: (v) => ({ type: 'call', ...v }),
  raise: (v) => ({ type: 'raise', ...v }),
  foldSend: (v) => ({ type: 'foldSend', ...v }),
};
