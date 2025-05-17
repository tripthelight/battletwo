import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/communication/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/communication/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/communication/indianPocker/fns/enemyChoiceCardReady';
import drewReadyCheckResult from '@/client/js/communication/indianPocker/fns/drewReadyCheckResult';
import receiveEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/receiveEnemyCard';
import enterDrewResult from '@/client/js/communication/indianPocker/fns/enterDrewResult';
import enterPlayingResult from '@/client/js/communication/indianPocker/fns/enterPlayingResult';
import enterBasicBetResult from '@/client/js/communication/indianPocker/fns/enterBasicBetResult';
import basicBettingResult from '@/client/js/communication/indianPocker/fns/basicBettingResult';
import drewRefreshResult from '@/client/js/communication/indianPocker/fns/drewRefreshResult';
import drewRefreshReturnResult from '@/client/js/communication/indianPocker/fns/drewRefreshReturnResult';

import { responsetBatting as indianPockerBattingResponse } from '@/client/js/communication/indianPocker/batting/responsetBatting';

import { errorManagement } from '@/client/js/module/errorManagement';
import { RESPONSE_HANDLERS } from '@/client/js/communication/indianPocker/responseHandlers';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel && dataChannel.readyState === 'open') {
    dataChannel.onmessage = (event) => {
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
