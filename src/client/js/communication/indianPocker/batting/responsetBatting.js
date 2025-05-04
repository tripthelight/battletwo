import SOCKET_EVENT from '@/client/js/communication/indianPocker/batting/battingEvent';

export function responsetBatting() {
  const dataChannel = window.rtcChannels.dataChannel;

  if (dataChannel) {
    dataChannel.onmessage = (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'firstExtBet':
          SOCKET_EVENT.GET.FIRST_EXT_BET_RESULT(message);
          break;
        case 'allInBet':
          SOCKET_EVENT.GET.ALL_IN_BET_RESULT(message);
          break;
        case 'call':
          SOCKET_EVENT.GET.CALL_RESULT(message);
          break;
        case 'raise':
          SOCKET_EVENT.GET.RAISE_RESULT(message);
          break;
        case 'foldSend':
          SOCKET_EVENT.GET.FOLD_RESULT(message);
          break;

        default:
          break;
      }
    };
  }
}
