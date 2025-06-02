import opponentFouls from '@/client/js/functions/opponentFouls';
import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/communication/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/communication/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/communication/indianPocker/fns/enemyChoiceCardReady';
import drewReadyCheckResult from '@/client/js/communication/indianPocker/fns/drewReadyCheckResult';
import receiveEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/receiveEnemyCard';
import enterDrewResult from '@/client/js/communication/indianPocker/fns/enterDrewResult';
import enterPlayingResult from '@/client/js/communication/indianPocker/fns/enterPlayingResult';
import remoteReloadBasicBetResult from '@/client/js/communication/indianPocker/fns/remoteReloadBasicBetResult';
import enterBasicBetResult from '@/client/js/communication/indianPocker/fns/enterBasicBetResult';
import basicBettingResult from '@/client/js/communication/indianPocker/fns/basicBettingResult';
import drewRefreshResult from '@/client/js/communication/indianPocker/fns/drewRefreshResult';
import drewRefreshReturnResult from '@/client/js/communication/indianPocker/fns/drewRefreshReturnResult';
import requestPlayerCardNum from '@/client/js/communication/indianPocker/fns/requestPlayerCardNum';
import responsePlayerCardNum from '@/client/js/communication/indianPocker/fns/responsePlayerCardNum';
import requestMakeCard from '@/client/js/communication/indianPocker/fns/requestMakeCard';
import responseMakeCard from '@/client/js/communication/indianPocker/fns/responseMakeCard';
import requestCardNumList from '@/client/js/communication/indianPocker/fns/requestCardNumList';
import responseCardNumList from '@/client/js/communication/indianPocker/fns/responseCardNumList';
import requestRemoveEnemyCardNum from '@/client/js/communication/indianPocker/fns/requestRemoveEnemyCardNum';
import responseRemoveEnemyCardNum from '@/client/js/communication/indianPocker/fns/responseRemoveEnemyCardNum';

import SOCKET_EVENT from '@/client/js/communication/indianPocker/batting/battingEvent';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // default message
  remoteReload: (msg) => remoteReload(msg.value),
  choiceFirst: (msg) => enemyFirstChoice(msg.num),
  choiceDrewCard: (msg) => enemyChoiceCardReady(msg.value),
  nextStep: (msg) => nextStepResult(msg.value),
  basicBetting: (msg) => basicBettingResult({ state: msg.state, coinCount: msg.coinCount }),
  drewReadyCheck: (msg) => drewReadyCheckResult(msg),
  enterPlaying: (msg) => enterPlayingResult(msg.gameState),
  enemyCardNum: (msg) => receiveEnemyCard(msg.cardNum),
  enterDrew: (msg) => enterDrewResult(msg.gameState),
  remoteReloadBasicBet: (msg) => remoteReloadBasicBetResult(msg.gameState),
  enterBasicBet: (msg) => enterBasicBetResult(msg.gameState),
  drewRefresh: (msg) => drewRefreshResult(msg.value),
  drewRefreshReturn: (msg) => drewRefreshReturnResult(msg.value),
  requestPlayerCardNum: (msg) => requestPlayerCardNum(msg),
  responsePlayerCardNum: (msg) => responsePlayerCardNum(msg),

  // make card
  requestMakeCard: (msg) => requestMakeCard(msg.list),
  responseMakeCard: (msg) => responseMakeCard(msg.list),

  // validate
  // 카드 리스트 검증
  requestCardNumList: (msg) => requestCardNumList(msg),
  responseCardNumList: (msg) => responseCardNumList(msg),
  // 카드리스트에서 상대 카드 번호 제거
  requestRemoveEnemyCardNum: (msg) => requestRemoveEnemyCardNum(msg),
  responseRemoveEnemyCardNum: (msg) => responseRemoveEnemyCardNum(msg),

  // Betting 관련
  firstExtBet: (msg) => SOCKET_EVENT.GET.FIRST_EXT_BET_RESULT(msg),
  allInBet: (msg) => SOCKET_EVENT.GET.ALL_IN_BET_RESULT(msg),
  call: (msg) => SOCKET_EVENT.GET.CALL_RESULT(msg),
  raise: (msg) => SOCKET_EVENT.GET.RAISE_RESULT(msg),
  foldSend: (msg) => SOCKET_EVENT.GET.FOLD_RESULT(msg),
  enemyFold: (msg) => SOCKET_EVENT.GET.FOLD_ENEMY(msg),
};
