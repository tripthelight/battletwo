import errorManager from '@/client/js/module/errorHandler/errorManager';
import blackAndWhite1GameState from '@/client/js/gameState/blackAndWhite1';
import { commitSetOrderRecovery } from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/setOrderRecovery';

/**
 * 양쪽 Peer가 모두 setOrder에서 reload 된 경우의 복구 ack를 처리한다.
 *
 * probe를 보낸 Peer가 ack를 받으면 먼저 playing으로 전환한다.
 * 그 Peer가 보내는 enterPlayingSend 신호를 받은 상대 복구 Peer도
 * 이어서 playing으로 전환하므로 deadlock 없이 동일 상태로 수렴한다.
 *
 * @param {{ ready?: boolean }} data
 */
export default function handleSetOrderResumeAck(data) {
  try {
    if (data?.ready !== true) return;

    commitSetOrderRecovery(() => {
      blackAndWhite1GameState.playing();
    });
  } catch (error) {
    errorManager(error, true);
  }
}
