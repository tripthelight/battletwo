import remoteReload from '@/client/js/functions/remoteReload';
import enemyFirstChoice from '@/client/js/communication/indianPocker/fns/enemyFirstChoice';
import nextStepResult from '@/client/js/communication/indianPocker/fns/nextStepResult';
import enemyChoiceCardReady from '@/client/js/communication/indianPocker/fns/enemyChoiceCardReady';

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
          // drewReadyCheckResult(data);
          break;
        case 'enterPlaying':
          // enterPlayingResult(data.enterPlaying);
          break;
        case 'enemyCardNum':
          // receiveEnemyCard(data.enemyCardNum);
          break;
        case 'enterDrew':
          // enterDrewResult(data.enterDrew);
          break;
        case 'enterBasicBet':
          // enterBasicBetResult(data.enterBasicBet);
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
