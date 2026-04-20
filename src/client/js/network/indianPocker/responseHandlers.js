import opponentFouls from '@/client/js/functions/opponentFouls';
import requestEnterChoiceCard from '@/client/js/network/indianPocker/fns/requestEnterChoiceCard';
import responseEnterChoiceCard from '@/client/js/network/indianPocker/fns/responseEnterChoiceCard';
import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/network/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/network/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/network/indianPocker/fns/enemyChoiceCardReady';
import drewReadyCheckResult from '@/client/js/network/indianPocker/fns/drewReadyCheckResult';
import receiveEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/receiveEnemyCard';
import enterDrewResult from '@/client/js/network/indianPocker/fns/enterDrewResult';
import enterPlayingResult from '@/client/js/network/indianPocker/fns/enterPlayingResult';
import remoteReloadBasicBetResult from '@/client/js/network/indianPocker/fns/remoteReloadBasicBetResult';
import requestDoubleReload from '@/client/js/network/indianPocker/fns/requestDoubleReload';
import responseDoubleReload from '@/client/js/network/indianPocker/fns/responseDoubleReload';
import enterBasicBetResult from '@/client/js/network/indianPocker/fns/enterBasicBetResult';
import basicBettingResult from '@/client/js/network/indianPocker/fns/basicBettingResult';
import basicBettingCompleted from '@/client/js/network/indianPocker/fns/basicBettingCompleted';
import drewRefreshResult from '@/client/js/network/indianPocker/fns/drewRefreshResult';
import drewRefreshReturnResult from '@/client/js/network/indianPocker/fns/drewRefreshReturnResult';
import requestPlayerCardNum from '@/client/js/network/indianPocker/fns/requestPlayerCardNum';
import responsePlayerCardNum from '@/client/js/network/indianPocker/fns/responsePlayerCardNum';
import requestMakeCard from '@/client/js/network/indianPocker/fns/requestMakeCard';
import responseMakeCard from '@/client/js/network/indianPocker/fns/responseMakeCard';
import requestCardNumList from '@/client/js/network/indianPocker/fns/requestCardNumList';
import responseCardNumList from '@/client/js/network/indianPocker/fns/responseCardNumList';
import requestRemoveEnemyCardNum from '@/client/js/network/indianPocker/fns/requestRemoveEnemyCardNum';
import responseRemoveEnemyCardNum from '@/client/js/network/indianPocker/fns/responseRemoveEnemyCardNum';

import requestCompairChoiceCard from '@/client/js/network/indianPocker/fns/requestCompairChoiceCard';
import responseCompairChoiceCard from '@/client/js/network/indianPocker/fns/responseCompairChoiceCard';
import requestCompairResultBetting from '@/client/js/network/indianPocker/fns/requestCompairResultBetting';
import responseCompairResultBetting from '@/client/js/network/indianPocker/fns/responseCompairResultBetting';

import requestCompairBasicBet from '@/client/js/network/indianPocker/fns/requestCompairBasicBet';
import responseCompairBasicBet from '@/client/js/network/indianPocker/fns/responseCompairBasicBet';
import {
  handleRoundResultReloadRequest,
  handleRoundResultReloadResponse,
  handleRoundResultStepAck,
  handleRoundResultStepReady,
} from '@/client/js/network/indianPocker/fns/roundResultReloadSync';

import SOCKET_EVENT from '@/client/js/network/indianPocker/batting/battingEvent';

// 핸들러 객체 매핑
export const RESPONSE_HANDLERS = {
  // common messate
  opponentFouls: (msg) => opponentFouls(msg),

  // 각 gameState 입장 시 상대 peer에게 sessionStorage data 검증
  requestEnterChoiceCard: () => requestEnterChoiceCard(),
  responseEnterChoiceCard: (msg) => responseEnterChoiceCard(msg.keys),

  // default message
  remoteReload: (msg) => remoteReload(msg.value),
  choiceFirst: (msg) => enemyFirstChoice(msg),
  choiceDrewCard: (msg) => enemyChoiceCardReady(msg.value),
  nextStep: (msg) => nextStepResult(msg.value),
  basicBetting: (msg) => basicBettingResult(msg),
  basicBettingCompleted: (msg) => basicBettingCompleted(),
  drewReadyCheck: (msg) => drewReadyCheckResult(msg),
  enterPlaying: (msg) => enterPlayingResult(msg.gameState),
  enemyCardNum: (msg) => receiveEnemyCard(msg.cardNum),
  enterDrew: (msg) => enterDrewResult(msg.gameState),
  remoteReloadBasicBet: (msg) => remoteReloadBasicBetResult(msg.gameState),
  requestDoubleReload: (msg) => requestDoubleReload(msg.gameState),
  responseDoubleReload: (msg) => responseDoubleReload(msg.gameState),
  requestRoundResultReloadSync: (msg) => handleRoundResultReloadRequest(msg),
  responseRoundResultReloadSync: (msg) => handleRoundResultReloadResponse(msg),
  roundResultStepReady: (msg) => handleRoundResultStepReady(msg),
  roundResultStepAck: (msg) => handleRoundResultStepAck(msg),
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

  // sstorage 비교
  requestCompairChoiceCard: (msg) => requestCompairChoiceCard(msg),
  responseCompairChoiceCard: (msg) => responseCompairChoiceCard(msg),
  requestCompairBasicBet: (msg) => requestCompairBasicBet(msg),
  responseCompairBasicBet: (msg) => responseCompairBasicBet(msg),
  requestCompairResultBetting: (msg) => requestCompairResultBetting(msg),
  responseCompairResultBetting: (msg) => responseCompairResultBetting(msg),
};
