import errorManager from '@/client/js/module/errorHandler/errorManager';
import { request } from '@/client/js/network/blackAndWhite1/request';
import {
  isLocalPlayingState,
  isSetOrderRecoveryActive,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/setOrderRecovery';

/**
 * 상대 Peer가 setOrder reload 복구 중임을 알리는 probe를 처리한다.
 *
 * 다음 두 경우에만 ready ack를 보낸다.
 * 1) 나 역시 setOrder reload 복구 중인 경우
 * 2) 나는 이미 playing까지 진행한 경우
 *
 * 일반 setOrder 애니메이션을 진행 중인 Peer는 응답하지 않는다.
 * 따라서 한쪽만 reload 했을 때는 기존 애니메이션 흐름을 방해하지 않고,
 * 양쪽 reload 또는 재연결 전에 상대 타이머가 먼저 끝난 경우만 복구한다.
 *
 * @param {{ recovering?: boolean }} data
 */
export default function handleSetOrderResumeProbe(data) {
  try {
    if (data?.recovering !== true) return;

    const canReleaseRemote =
      isSetOrderRecoveryActive() || isLocalPlayingState();

    if (!canReleaseRemote) return;

    request('setOrderResumeAck', { ready: true });
  } catch (error) {
    errorManager(error, true);
  }
}
