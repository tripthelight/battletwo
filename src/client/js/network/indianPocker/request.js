import { REQUEST_COMMON_HANDLERS, REQUEST_ENTER_STATE_HANDLERS, REQUEST_HANDLERS, REQUEST_MAKE_CARD_HANDLERS, REQUEST_VALIDATE_HANDLERS, REQUEST_BATTING_HANDLERS, REQUEST_COMPAIR_HANDLERS } from '@/client/js/network/indianPocker/requestHandlers';
import { errorManagement } from '@/client/js/module/errorManagement';
// import { globalDataChannel } from '@/client/js/webRTC/rtcConn';

export function request(k, v) {
  const onDataChannel = window.rtcChannels.dataChannel;
  // if (!onDataChannel || onDataChannel.readyState !== 'open') return;

  /*
  const dataChannel = window.rtcChannels.dataChannel;
  if (!dataChannel || (dataChannel && dataChannel.readyState !== 'open')) return;
  */
  // if (!globalDataChannel || (globalDataChannel && globalDataChannel.readyState !== 'open')) return;
  if (!onDataChannel || (onDataChannel && onDataChannel.readyState !== 'open')) return;

  const ALL_TEMPLATES = {
    ...REQUEST_COMMON_HANDLERS,
    ...REQUEST_ENTER_STATE_HANDLERS,
    ...REQUEST_HANDLERS,
    ...REQUEST_MAKE_CARD_HANDLERS,
    ...REQUEST_VALIDATE_HANDLERS,
    ...REQUEST_BATTING_HANDLERS,
    ...REQUEST_COMPAIR_HANDLERS,
  };

  const templateFn = ALL_TEMPLATES[k];

  if (templateFn) {
    const message = templateFn(v);
    // dataChannel.send(JSON.stringify(message));
    // globalDataChannel.send(JSON.stringify(message));
    onDataChannel.send(JSON.stringify(message));
  } else {
    errorManagement({ errCase: 'errorComn', message: k + ' : Undefined message type' });
  }

  /*
  if (onDataChannel && onDataChannel.readyState === 'open') {
    switch (k) {
      case 'choiceFirst':
        onDataChannel.send(
          JSON.stringify({
            type: 'choiceFirst',
            num: v,
          }),
        );
        break;
      case 'choiceDrewCard':
        onDataChannel.send(
          JSON.stringify({
            type: 'choiceDrewCard',
            value: v, // true | false
          }),
        );
        break;
      case 'basicBetting':
        onDataChannel.send(
          JSON.stringify({
            type: 'basicBetting',
            state: true,
            coinCount: v, // Number(window.sessionStorage.coinsPlayer)
          }),
        );
        break;
      case 'drewReadyCheck':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewReadyCheck',
            state: true,
          }),
        );
        break;
      case 'enterPlaying':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterPlaying',
            gameState: v,
          }),
        );
        break;
      case 'cardNum':
        onDataChannel.send(
          JSON.stringify({
            type: 'enemyCardNum',
            cardNum: v,
          }),
        );
        break;
      case 'enterDrew':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterDrew',
            gameState: v,
          }),
        );
        break;
      case 'enterBasicBet':
        onDataChannel.send(
          JSON.stringify({
            type: 'enterBasicBet',
            gameState: v,
          }),
        );
        break;
      case 'nextStep':
        onDataChannel.send(
          JSON.stringify({
            type: 'nextStep',
            value: v, // true | false
          }),
        );
        break;
      case 'drewRefresh':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewRefresh',
            value: v, // true | false
          }),
        );
        break;
      case 'drewRefreshReturn':
        onDataChannel.send(
          JSON.stringify({
            type: 'drewRefreshReturn',
            value: v, // true | false
          }),
        );
        break;

      default:
        break;
    }
  }
  */
}
