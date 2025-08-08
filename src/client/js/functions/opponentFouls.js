// import { peerConnection, signalingSocket } from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import delCookies from '@/client/js/module/cookies/delCookies';
import storageMethod from '@/client/js/module/storage/storageMethod';
import eventHanlerErrorComn from '@/client/js/module/eventHanlerErrorComn';

// 파울은 상대 peer에게 받기만 하는 로직
export default function opponentFouls(data) {
  // errorManagement({ errCase: 'foul', message: '상대방의 반칙패 : ' + data.message });

  /*
  const { subject, message } = data;

  if (subject === 'remote') {
    console.log('반칙 한 애가 탐');

    if (peerConnection) {
      peerConnection.close();
    }
    if (signalingSocket) {
      signalingSocket.close();
    }

    errorManagement({ errCase: 'errorComn', message: '반칙패 : ' + message });
  } else if (subject === 'local') {
    console.log('반칙 안한 애가 탐');
    request('opponentFouls', { subject: 'remote', message: message });
    errorManagement({ errCase: 'foul', message: '상대의 반칙패 : ' + message });
  }
    */

  /* // delCookies('gc_at');
  storageMethod('s', 'REMOVE_ALL');
  if (window['rtcChannels']) {
    if (
      window.rtcChannels.dataChannel &&
      window.rtcChannels.dataChannel.readyState === 'open'
    ) {
      window.rtcChannels.dataChannel.close();
    };
    if (
      window.rtcChannels.peerConnection &&
      window.rtcChannels.peerConnection.connectionState === 'connected'
    ) {
      window.rtcChannels.peerConnection.close();
    };
  };
  errorManagement({ errCase: 'foul', message: data.message }); */
  eventHanlerErrorComn({ errCase: 'foul', message: data.message });

  /* if (peerConnection) {
    peerConnection.close();
  }
  if (signalingSocket) {
    signalingSocket.close();
  } */
}
