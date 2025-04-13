import errorModal from '@/client/components/popup/modal/errorModal';
import { text } from '@/client/js/functions/language';

// UI 알림 표시 함수
function showErrorNotification(errCase, component, message) {
  // CASE : webRTC error
  if (errCase === 'webRTC') {
    switch (component) {
      case 'signalingSocket':
        // socket error
        errorModal(text.networkLost);
        break;
      case 'peerConnection':
        // 상대방이 새로고침하면 나는 여기를 두번째로 탐
        // rtc remote peer left
        errorModal(text.leaveRoom);
        break;
      case 'dataChannel':
        // 상대방이 새로고침하면 나는 여기를 첫번째로 탐
        // channel error
        errorModal(text.leaveRoom);
        break;
      case 'initConnect':
        // peerConnection / dataChannel error
        errorModal(text.leaveRoom);
        break;
      case 'messageHandler':
        // socket message error - offer/answer/candidate
        errorModal(text.networkLost);
        break;
      default:
        break;
    }
  } else if (errCase === 'errorComn') {
    errorModal(message ? message : text.err);
  }
}

// 오류 복구 로직
function handleRecovery(component, event) {
  if (component === 'peerConnection' && event.includes('connectionstatechange')) {
    console.log('재연결 시도 가능');
    // 필요 시 재연결 로직 추가
    errorModal(text.leaveRoom);
  } else if (component === 'signalingSocket' && event === 'onclose') {
    console.log('Signaling 서버 재접속 로직 가능');
    errorModal(text.networkLost);
    // 재접속 시도 가능
  }
}

// 서버로 오류 로그 전송
function sendErrorLogToServer(errorData) {
  fetch('/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(errorData),
  }).catch((err) => console.error('오류 로그 전송 실패:', err));
}

/**
 * error 관리 모듈
 * @param {*} errData
 */
export function errorManagement(errData) {
  const { component, event, message, errorDetails = null, errCase } = errData;
  const errorMessage = `[Error] ${component} - ${event}: ${message}`;

  // 1. 콘솔에 오류 출력
  // console.error(errorMessage);
  // if (errorDetails) console.error('Error Details:', errorDetails);

  // 2. 사용자에게 오류 알림 (UI 메시지)
  showErrorNotification(errCase, component, message);

  // 3. 특정 오류 대응 (자동 복구, 재연결)
  // handleRecovery(component, event);

  // 4. 서버에 오류 로그 전송 (선택 사항)
  //  * 25.03.14 - 개인프로젝트에서 서버 과부하 이슈로 닫음
  // sendErrorLogToServer({ component, event, message, errorDetails });
}
