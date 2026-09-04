import errorModal from '@/client/components/popup/modal/errorModal';
import { text } from '@/client/js/functions/language';
import {
  SESSION_END_REASON,
  terminateGameSession,
} from '@/client/js/module/webRTC/connectSignaling';

const GAME_FATAL_CASES = new Set([
  'dataManipulation',
  'sessionStorageLoss',
  'cardNum',
  'errorComn',
  'elementLoss',
  'cookies',
]);

function showGameFatalModal(message, redirectPath = '/selectGame') {
  errorModal(message, redirectPath);
}

function handleGameFatal(errCase, target) {
  if (target === 'peer-notice') {
    terminateGameSession({
      reason: SESSION_END_REASON.INVALID_REMOTE,
      notifyPeer: false,
    });

    showGameFatalModal(text.err);
    return true;
  }

  if (errCase === 'foul') {
    // 상대가 보낸 값이 검증에 실패한 경우:
    // 검증한 Peer는 상대 이탈 팝업을 보고,
    // 잘못된 값을 보낸 Peer에게는 invalid-remote를 전달한다.
    terminateGameSession({
      reason: SESSION_END_REASON.INVALID_REMOTE,
      notifyPeer: true,
    });

    showGameFatalModal(text.leaveRoom);
    return true;
  }

  if (GAME_FATAL_CASES.has(errCase)) {
    // 내 sessionStorage/로컬 상태가 손상된 경우:
    // 나는 잘못된 접근 팝업, 상대는 상대방 이탈 팝업을 본다.
    terminateGameSession({
      reason: SESSION_END_REASON.INVALID_LOCAL,
      notifyPeer: true,
    });

    showGameFatalModal(text.err);
    return true;
  }

  return false;
}

// UI 알림 표시 함수
function showErrorNotification(errCase, component, message, target) {
  if (handleGameFatal(errCase, target)) {
    return;
  }

  if (errCase === 'webRTC') {
    switch (component) {
      case 'signalingServer':
        terminateGameSession({
          reason: SESSION_END_REASON.NETWORK_LOST,
          notifyPeer: false,
        });
        showGameFatalModal(text.serverProblem);
        break;
      case 'peerConnection':
      case 'dataChannel':
      case 'initConnect':
      case 'candidate':
      case 'peerConnectionEvent':
      case 'dataChannelEvent':
      case 'cecandidateEvent':
        terminateGameSession({
          reason: SESSION_END_REASON.LEAVE,
          notifyPeer: false,
        });
        showGameFatalModal(text.leaveRoom);
        break;
      case 'messageHandler':
      default:
        terminateGameSession({
          reason: SESSION_END_REASON.NETWORK_LOST,
          notifyPeer: false,
        });
        showGameFatalModal(text.serverProblem);
        break;
    }
    return;
  }

  if (errCase === 'auth') {
    errorModal(text.serverProblem);
    return;
  }

  if (errCase === 'server') {
    terminateGameSession({
      reason: SESSION_END_REASON.LEAVE,
      notifyPeer: false,
    });

    switch (target) {
      case 'local':
        showGameFatalModal(text.err);
        break;
      case 'remote':
        showGameFatalModal(text.leaveRoom);
        break;
      case 'server':
      default:
        showGameFatalModal(text.serverProblem);
        break;
    }

    console.log('server error : ', target + ' -> ' + message);
    return;
  }

  errorModal(text.error_text);
}

/**
 * error 관리 모듈
 * @param {*} errData
 */
export function errorManagement(errData = {}) {
  const {
    component,
    event,
    message,
    errCase = 'errorComn',
    target,
  } = errData;

  console.warn('ERROR : ', message);

  showErrorNotification(
    errCase,
    component,
    message,
    target,
  );
}
