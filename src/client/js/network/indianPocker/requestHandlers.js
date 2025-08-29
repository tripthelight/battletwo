// 공통 메시지
export const REQUEST_COMMON_HANDLERS = {
  // 상대가 반칙 - ex) 플레이어가 직접 storage를 수정
  opponentFouls: (v) => ({ type: 'opponentFouls', ...v }),
};

// 각 gameState 입장 시 상대 peer에게 sessionStorage data 검증
export const REQUEST_ENTER_STATE_HANDLERS = {
  // choiceCard
  requestEnterChoiceCard: () => ({ type: 'requestEnterChoiceCard' }),
  responseEnterChoiceCard: (v) => ({ type: 'responseEnterChoiceCard', ...v }),
};

// 일반 메시지
export const REQUEST_HANDLERS = {
  choiceFirst: (v) => ({ type: 'choiceFirst', ...v }),
  choiceDrewCard: (v) => ({ type: 'choiceDrewCard', value: v }),
  basicBetting: (v) => ({ type: 'basicBetting', state: true, ...v }),
  basicBettingCompleted: (v) => ({ type: 'basicBettingCompleted' }),
  drewReadyCheck: () => ({ type: 'drewReadyCheck', state: true }),
  enterPlaying: (v) => ({ type: 'enterPlaying', gameState: v }),
  cardNum: (v) => ({ type: 'enemyCardNum', cardNum: v }),
  enterDrew: (v) => ({ type: 'enterDrew', gameState: v }),
  remoteReloadBasicBet: (v) => ({ type: 'remoteReloadBasicBet', gameState: v }),
  enterBasicBet: (v) => ({ type: 'enterBasicBet', gameState: v }),
  nextStep: (v) => ({ type: 'nextStep', value: v }),
  drewRefresh: (v) => ({ type: 'drewRefresh', value: v }),
  drewRefreshReturn: (v) => ({ type: 'drewRefreshReturn', value: v }),
  requestPlayerCardNum: (v) => ({ type: 'requestPlayerCardNum', ...v }),
  responsePlayerCardNum: (v) => ({ type: 'responsePlayerCardNum', ...v }),
};

// make card
export const REQUEST_MAKE_CARD_HANDLERS = {
  requestMakeCard: (v) => ({ type: 'requestMakeCard', ...v }),
  responseMakeCard: (v) => ({ type: 'responseMakeCard', ...v }),
};

// 검증 요청
export const REQUEST_VALIDATE_HANDLERS = {
  // 카드 리스트 검증
  requestCardNumList: (v) => ({ type: 'requestCardNumList', ...v }),
  responseCardNumList: (v) => ({ type: 'responseCardNumList', ...v }),
  // 카드리스트에서 상대 카드 번호 제거
  requestRemoveEnemyCardNum: (v) => ({ type: 'requestRemoveEnemyCardNum', ...v }),
  responseRemoveEnemyCardNum: (v) => ({ type: 'responseRemoveEnemyCardNum', ...v }),
  // betUser, betUserFirst를 상대 peer와 검증
  requestCompairResultBetting: (v) => ({ type: 'requestCompairResultBetting', ...v }),
  responseCompairResultBetting: (v) => ({ type: 'responseCompairResultBetting', ...v }),
};

// 배팅 메시지
export const REQUEST_BATTING_HANDLERS = {
  firstExtBet: (v) => ({ type: 'firstExtBet', ...v }),
  allInBet: (v) => ({ type: 'allInBet', ...v }),
  call: (v) => ({ type: 'call', ...v }),
  raise: (v) => ({ type: 'raise', ...v }),
  foldSend: (v) => ({ type: 'foldSend', ...v }),
  enemyFold: (v) => ({ type: 'enemyFold', ...v }),
};

// sstorage 비교
export const REQUEST_COMPAIR_HANDLERS = {
  // choiceCard
  requestCompairChoiceCard: (v) => ({ type: 'requestCompairChoiceCard', ...v }),
  responseCompairChoiceCard: (v) => ({ type: 'responseCompairChoiceCard', ...v }),
  requestCompairBasicBet: (v) => ({ type: 'requestCompairBasicBet', ...v }),
  responseCompairBasicBet: (v) => ({ type: 'responseCompairBasicBet', ...v }),
};
