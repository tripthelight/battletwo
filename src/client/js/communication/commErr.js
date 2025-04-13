/**
 * 모든 게임에서 공통으로 상대 PEER의 방나감 상태를 체크하기 위해 commErr.js을 만듬
 * peerConnection은 rtcConn.js에서반 사용됨
 * 새로고침 시 dataChannel이 끊기는 순간 발생하는 dataChannel.onerror와 dataChannel.onclose는 webRTC 재연결 이전에 발생하므로 사용안함
 * 따라서 이 commErr.js 파일은 사용 안함
 */
import storageMethod from '@/client/js/module/storage/storageMethod';
import { errorManagement } from '@/client/js/module/errorManagement';
import { text } from '@/client/js/functions/language';

export default function commErr(peerConnection, dataChannel) {
  // const peerConnection = window.rtcChannels.peerConnection;
  // const dataChannel = window.rtcChannels.dataChannel;

  // const { peerConnection, dataChannel } = window.rtcChannels;

  if (!peerConnection || !dataChannel) {
    errorManagement({ errCase: 'errorComn', message: text.networkLost });
    return;
  }

  dataChannel.onopen = (event) => {
    // errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
  };

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 순간,
   * 여기를 1번째로 탐
   */
  dataChannel.onerror = (event) => {
    // errorManagement({ errCase: 'webRTC', component: 'dataChannel', event: 'onerror', message: 'DataChannel encountered an error', errorDetails: error });
  };

  /**
   * webRTC로 연결된 상태에서,
   * 상대방이 새로고침 or 방이탈 순간,
   * 여기를 2번째로 탐
   */
  dataChannel.onclose = (event) => {
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
      console.log('2-1 : ', peerConnection.iceConnectionState);
      // console.log('oniceconnectionstatechange ::::: ', peerConnection);
      if (peerConnection.iceConnectionState === 'disconnected') {
        if (window.sessionStorage.getItem('remoteReload')) {
          // 상대방 새고로침 후 재연결함
          // storageMethod('s', 'REMOVE_ITEM', 'remoteReload');
        } else {
          // 상대방이 방을 나감
          // errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'oniceconnectionstatechange', message: 'ICE connection state is disconnected', errorDetails: event });
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
      console.log('2-2 : ', peerConnection.connectionState);
      // console.log('onconnectionstatechange ::::: ', peerConnection);

      if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
        // console.log('peerConnection.connectionState ::::: ', peerConnection.connectionState);
      }

      if (peerConnection.connectionState === 'failed') {
        // console.log('peerConnection.connectionState ::::: ', peerConnection.connectionState);
        // 상대방이 방을 나감
        // errorManagement({ errCase: 'webRTC', component: 'peerConnection', event: 'onconnectionstatechange', message: `Peer connection state is ${peerConnection.connectionState}`, errorDetails: event });
      }

      if (peerConnection.connectionState === 'connected') {
        // console.log('peerConnection.connectionState ::::: ', peerConnection.connectionState);
        // console.log("연결 복구됨: peerConnection 상태가 'connected'입니다.");
      }
    }
  };

  peerConnection.onsignalingstatechange = () => {
    console.log('onsignalingstatechange >>>> ', peerConnection.signalingState);
  };

  peerConnection.onclose = () => {
    console.log('연결이 종료되었습니다.');
  };

  peerConnection.onremovetrack = (event) => {
    console.log('트랙 제거됨:', event);
  };
}
