import ensurePlayingBlocks from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/ensurePlayingBlocks';
import ensurePlayerCubePosition from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/ensurePlayerCubePosition';
import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeReady';
import cubePlaying from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubePlaying';
import showEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showEnemyCube';
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';
import drawInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare';
import btnStartChange from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/btnStartChange';
import recoverPendingRoundResult from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/recoverPendingRoundResult';

let entered = false;

/**
 * playing UI를 최초 1회만 구성한다.
 *
 * 정상 진입에서는 ready/waitEnemyShuffle 단계에서 만들어진 Cube DOM과
 * cubeReadyEnd()가 기록한 translateY를 그대로 사용한다.
 *
 * setOrder 또는 playing 단계에서 새로고침한 경우에는 document가 새로
 * 만들어져 enemy-block / player-block 및 inline transform이 사라지므로,
 * UI 초기화 전에 sessionStorage를 이용해 기본 Cube DOM을 복원하고
 * 정상 Ready 단계와 동일한 계산식으로 player Cube 위치를 복원한다.
 *
 * enterPlayingSend / enterPlayingRecv가 거의 동시에 도착하거나 Reliable
 * 계층에서 같은 의미의 동기화 흐름이 연속으로 실행돼도 DOM 생성 및
 * 이벤트 바인딩은 최초 1회만 수행한다.
 *
 * 실제 Cube 선택 가능 여부는 drawInnerSquare() 내부의 activeUserCheck()가
 * firstUser / activeUser를 기준으로 결정한다.
 */
export default function enterPlaying() {
  if (entered) return false;

  entered = true;

  try {
    // 새로고침으로 사라진 playing 기본 DOM을 먼저 복원한다.
    // 정상 진입에서는 존재 여부 확인만 하고 즉시 반환한다.
    ensurePlayingBlocks();

    // 위치 계산은 ready.start 상태의 크기를 기준으로 해야 하므로
    // cubePlaying()보다 먼저 실행한다.
    cubeReady();
    ensurePlayerCubePosition();
    cubePlaying();

    showEnemyCube();
    shuffleCubeStop();
    drawInnerSquare();
    btnStartChange();

    // 두 번째 제출 직후 또는 결과 효과 중 reload 된 경우에는
    // afterPlayerNum / pendingRoundResult를 이용해 입력 잠금과 결과 commit을 복구한다.
    recoverPendingRoundResult();

    return true;
  } catch (error) {
    // 초기화 도중 실패한 경우에는 다음 정상 동기화 신호에서 재시도할 수 있다.
    entered = false;
    throw error;
  }
}
