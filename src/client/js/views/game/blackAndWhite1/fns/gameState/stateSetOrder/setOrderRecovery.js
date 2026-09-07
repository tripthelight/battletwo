import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

let recoveryActive = false;

function getLocalGameState() {
  const gameStateKey = findCharCode([
    89, 79, 69, 71, 82, 83, 87, 75, 86, 85,
  ]); // gameState

  return storageMethod('s', 'GET_ITEM', gameStateKey);
}

function isLocalSetOrder() {
  const setOrderState = findCharCode([
    65, 71, 81, 72, 85, 75, 78, 74, 86, 73,
  ]); // setOrder

  return getLocalGameState() === setOrderState;
}

/**
 * 상대의 setOrder 복구 probe를 받았을 때 이미 playing까지 진행했는지 확인한다.
 */
export function isLocalPlayingState() {
  const playingState = findCharCode([
    75, 68, 67, 71, 82, 87, 74, 73, 66, 78,
  ]); // playing

  return getLocalGameState() === playingState;
}

/**
 * setOrder 화면에서 reload 복구 중임을 표시한다.
 * 이 값은 현재 document의 메모리에만 존재하므로 일반 setOrder 진입과
 * reload 복구를 구분할 수 있다.
 */
export function startSetOrderRecovery() {
  recoveryActive = true;
}

/**
 * 현재 Peer가 reload 된 setOrder 상태에서 복구를 기다리는지 확인한다.
 */
export function isSetOrderRecoveryActive() {
  return recoveryActive && isLocalSetOrder();
}

/**
 * reload 복구 상태에서 playing 전환을 한 번만 수행한다.
 * commit 중 오류가 발생하면 복구 플래그를 원상복구하여 재시도가 가능하다.
 *
 * @param {Function} commit playing 상태 전환 함수
 * @returns {boolean} 전환을 수행했으면 true
 */
export function commitSetOrderRecovery(commit) {
  if (!isSetOrderRecoveryActive() || typeof commit !== 'function') {
    return false;
  }

  recoveryActive = false;

  try {
    commit();
    return true;
  } catch (error) {
    recoveryActive = true;
    throw error;
  }
}
