import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export default function commErr() {
  const peerConnection = window.rtcChannels.peerConnection;
  const dataChannel = window.rtcChannels.dataChannel;

  if (!peerConnection || !dataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  dataChannel.onerror = (error) => {
    console.log('remoteReload >>> ', window.sessionStorage.getItem('remoteReload'));

    // 상대방이 새로고침하면 나는 여기를 1번째로 탐
    errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
  };

  dataChannel.onclose = () => {
    // 상대방이 새로고침하면 나는 여기를 2번째로 탐
    errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onclose', message: 'DataChannel is closed' });
  };

  peerConnection.oniceconnectionstatechange = (event) => {
    // 상대방이 새로고침하면 나는 여기를 3번째로 탐
    if (peerConnection) {
      if (peerConnection.iceConnectionState === 'disconnected') {
        // 상대방이 방을 나감
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
      }
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    // 상대방이 새로고침하면 나는 여기를 4번째로 탐
    if (peerConnection) {
      if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
        // 상대방이 방을 나감
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'onconnectionstatechange', message: `Peer connection state is ${peerConnection.connectionState}`, errorDetails: event });
      }
    }
  };
}
