import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export default function commErr() {
  const peerConnection = window.rtcChannels.peerConnection;
  const dataChannel = window.rtcChannels.dataChannel;

  if (!peerConnection || !peerConnection) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  peerConnection.oniceconnectionstatechange = (event) => {
    if (peerConnection) {
      if (peerConnection.iceConnectionState === 'disconnected') {
        // 상대방이 방을 나감
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
      }
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection) {
      if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
        // 상대방이 방을 나감
        errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'onconnectionstatechange', message: `Peer connection state is ${peerConnection.connectionState}`, errorDetails: event });
      }
    }
  };

  dataChannel.onclose = () => {
    errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onclose', message: 'DataChannel is closed' });
  };

  dataChannel.onerror = (error) => {
    errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
  };
}
