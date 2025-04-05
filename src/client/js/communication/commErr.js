import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export default function commErr() {
  const peerConnection = window.rtcChannels.peerConnection;
  const dataChannel = window.rtcChannels.dataChannel;

  if (!peerConnection || !dataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 순간,
   * 여기를 1번째로 탐
   */
  dataChannel.onerror = (error) => {
    // errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
  };

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 순간,
   * 여기를 2번째로 탐
   */
  dataChannel.onclose = () => {
    // errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onclose', message: 'DataChannel is closed' });
  };

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 약 5초 후
   * 여기를 1번째로 탐
   * 새로고침, 방이탈 모두 'disconnected'
   */
  peerConnection.oniceconnectionstatechange = (event) => {
    if (peerConnection) {
      if (peerConnection.iceConnectionState === 'disconnected') {
        if (window.sessionStorage.getItem('remoteReload')) {
          // 상대방 새고로침 후 재연결함
          // storageMethod('s', 'REMOVE_ITEM', 'remoteReload');
        } else {
          // 상대방이 방을 나감
          errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
        }
      }
    }
  };

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 약 5초 후
   * 여기를 2번째로 탐
   * 새로고침, 방이탈 모두 'disconnected' 후 약 3초 후 'failed'
   */
  peerConnection.onconnectionstatechange = (event) => {
    if (peerConnection) {
      if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
        console.log('peerConnection.connectionState ::::: ', peerConnection.connectionState);

        // 상대방이 방을 나감
        // errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'onconnectionstatechange', message: `Peer connection state is ${peerConnection.connectionState}`, errorDetails: event });
      }
    }
  };
}
