import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/network/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/network/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/network/indianPocker/fns/enemyChoiceCardReady';
import drewReadyCheckResult from '@/client/js/network/indianPocker/fns/drewReadyCheckResult';
import receiveEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/receiveEnemyCard';
import enterDrewResult from '@/client/js/network/indianPocker/fns/enterDrewResult';
import enterPlayingResult from '@/client/js/network/indianPocker/fns/enterPlayingResult';
import enterBasicBetResult from '@/client/js/network/indianPocker/fns/enterBasicBetResult';
import basicBettingResult from '@/client/js/network/indianPocker/fns/basicBettingResult';
import drewRefreshResult from '@/client/js/network/indianPocker/fns/drewRefreshResult';
import drewRefreshReturnResult from '@/client/js/network/indianPocker/fns/drewRefreshReturnResult';

import { responsetBatting as indianPockerBattingResponse } from '@/client/js/network/indianPocker/batting/responsetBatting';

// import { globalDataChannel } from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorManagement';
import { RESPONSE_HANDLERS } from '@/client/js/network/indianPocker/responseHandlers';

export function response() {
  const onDataChannel = window.rtcChannels.dataChannel;
  /*
  // const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.onmessage = (event) => {
  */
  // if (globalDataChannel && globalDataChannel.readyState === 'open') {
  if (onDataChannel && onDataChannel.readyState === 'open') {
    onDataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const handler = RESPONSE_HANDLERS[message.type];

      if (handler) {
        handler(message);
      } else {
        errorManagement({ errCase: 'errorComn', message: message.type + ' : Undefined message type' });
      }

      /*
      switch (message.type) {
        case 'remoteReload':
          remoteReload(message.value);
          break;
        case 'choiceFirst':
          enemyFirstChoice(message.num);
          break;
        case 'choiceDrewCard':
          enemyChoiceCardReady(message.value);
          break;
        case 'nextStep':
          nextStepResult(message.value);
          break;
        case 'basicBetting':
          const params = {
            state: message.state,
            coinCount: message.coinCount,
          };
          basicBettingResult(params);
          break;
        case 'drewReadyCheck':
          drewReadyCheckResult(message);
          break;
        case 'enterPlaying':
          enterPlayingResult(message.gameState);
          break;
        case 'enemyCardNum':
          receiveEnemyCard(message.cardNum);
          break;
        case 'enterDrew':
          enterDrewResult(message.gameState);
          break;
        case 'enterBasicBet':
          enterBasicBetResult(message.gameState);
          break;
        case 'drewRefresh':
          drewRefreshResult(message.value);
          break;
        case 'drewRefreshReturn':
          drewRefreshReturnResult(message.value);
          break;
        default:
          // Betting 관련 메시지는 분리된 핸들러 함수에서 처리
          indianPockerBattingResponse(message);
          break;
      }
      */
    };
  }
}
