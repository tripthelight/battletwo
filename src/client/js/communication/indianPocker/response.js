import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/communication/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/communication/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/communication/indianPocker/fns/enemyChoiceCardReady';
import drewReadyCheckResult from '@/client/js/communication/indianPocker/fns/drewReadyCheckResult';
import receiveEnemyCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/receiveEnemyCard';
import enterDrewResult from '@/client/js/communication/indianPocker/fns/enterDrewResult';
import enterPlayingResult from '@/client/js/communication/indianPocker/fns/enterPlayingResult';
import enterBasicBetResult from '@/client/js/communication/indianPocker/fns/enterBasicBetResult';

export function response() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel) {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

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
          // basicBettingResult(data);
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
          // drewRefreshResult(data);
          break;
        case 'drewRefreshReturn':
          // drewRefreshReturnResult(data);
          break;
        default:
          break;
      }
    };
  }
}
