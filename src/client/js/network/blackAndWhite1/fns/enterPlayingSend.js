import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import { request } from '@/client/js/network/blackAndWhite1/request';
import blackAndWhite1GameState from '@/client/js/gameState/blackAndWhite1';
import enterPlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enterPlaying';
import { commitSetOrderRecovery } from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateSetOrder/setOrderRecovery';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

/** @typedef {{ enter: boolean }} EnterPlayingSendInterface */
/**
 * 상대 Peer가 playing 상태에 도착했음을 알리는 메시지를 처리한다.
 *
 * 일반 진입에서는 양쪽 모두 gameState=playing인 것을 확인한 뒤 UI를 연다.
 * setOrder에서 reload 된 Peer는 자체 애니메이션 타이머가 사라진 상태이므로,
 * 상대가 playing에 도착했다는 신호를 받으면 즉시 자신의 gameState도
 * playing으로 승격하여 복구 handshake를 계속한다.
 *
 * findCharCode()는 connectSignaling의 KEY.prk가 준비된 뒤에만 사용할 수 있다.
 * 따라서 암호화된 storage key/value는 모듈 import 시점이 아니라
 * 실제 메시지를 처리하는 시점에 계산한다.
 *
 * @param {EnterPlayingSendInterface} data
 */
export default function handleEnterPlayingSend(data) {
  try {
    console.log('enterPlayingSend DATA ::::::: ', data);

    const remotePlaying = data?.enter === true;

    if (remotePlaying) {
      const recovered = commitSetOrderRecovery(() => {
        blackAndWhite1GameState.playing();
      });

      // gameState.playing() 내부에서 enterPlayingSend를 새로 보내므로
      // 현재 메시지에는 중복 응답하지 않고 새 handshake에 맡긴다.
      if (recovered) return;
    }

    const gameStateKey = findCharCode([
      89, 79, 69, 71, 82, 83, 87, 75, 86, 85,
    ]); // gameState

    const playingState = findCharCode([
      75, 68, 67, 71, 82, 87, 74, 73, 66, 78,
    ]); // playing

    const localPlaying =
      storageMethod('s', 'GET_ITEM', gameStateKey) === playingState;

    const bothPlaying = localPlaying && remotePlaying;

    if (bothPlaying) {
      enterPlaying();
      LOADING_EVENT.hide();
    }

    request('enterPlayingRecv', { enter: bothPlaying });
  } catch (error) {
    errorManager(error, true);
  }
}
