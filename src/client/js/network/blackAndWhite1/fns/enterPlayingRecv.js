import errorManager from '@/client/js/module/errorHandler/errorManager';
import enterPlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enterPlaying';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

/** @typedef {{ enter: boolean }} EnterPlayingRecvInterface */
/**
 * 상대 Peer가 "양쪽 모두 playing 상태"임을 확인해 준 응답을 처리한다.
 * true인 경우에만 playing UI를 구성한다.
 *
 * enterPlaying() 자체가 idempotent하므로 양쪽의 동기화 메시지가
 * 거의 동시에 교차하더라도 UI 및 이벤트가 중복 초기화되지 않는다.
 *
 * @param {EnterPlayingRecvInterface} data
 */
export default function handleEnterPlayingRecv(data) {
  try {
    console.log('enterPlayingRecv DATA ::::::: ', data);

    if (data?.enter !== true) return;

    enterPlaying();
    LOADING_EVENT.hide();
  } catch (error) {
    errorManager(error, true);
  }
}
