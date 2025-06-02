import { peerConnection, signalingSocket } from '@/client/js/webRTC/rtcConn';
import { errorManagement } from '@/client/js/module/errorManagement';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

export default function opponentFouls(data) {
  // errorManagement({ errCase: 'foul', message: '상대방의 반칙패 : ' + data.message });

  if (peerConnection) {
    peerConnection.close();
  }
  if (signalingSocket) {
    signalingSocket.close();
  }
  errorManagement({ errCase: 'errorComn', message: '반칙패 : ' + data.message });
}
