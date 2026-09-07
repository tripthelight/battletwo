import { getStyle } from '@/client/js/functions/comnExport';
import throwObj from '@/client/js/module/errorHandler/throwObj';

function measureBottomReservation() {
  const currentButton = document.querySelector('.btn-start');
  if (currentButton) {
    return currentButton.clientHeight + getStyle(currentButton, 'bottom');
  }

  const container = document.getElementById('container');
  if (!container) {
    throw throwObj('elementLoss', 'ensurePlayerCubePosition - container failed.');
  }

  // setOrder reload 복구 화면에는 .btn-start가 존재하지 않는다.
  // 정상 경로와 동일한 CSS box를 잠깐 생성해 실제 높이와 safe-area가
  // 반영된 bottom 값을 측정한 뒤 같은 tick에서 즉시 제거한다.
  const probe = document.createElement('button');
  const probeInner = document.createElement('span');

  probeInner.innerText = 'Wait';
  probe.classList.add('btn-start');
  probe.disabled = true;
  probe.setAttribute('aria-hidden', 'true');
  probe.setAttribute('tabindex', '-1');
  probe.style.visibility = 'hidden';
  probe.style.pointerEvents = 'none';
  probe.style.transition = 'none';
  probe.appendChild(probeInner);

  container.appendChild(probe);

  try {
    return probe.clientHeight + getStyle(probe, 'bottom');
  } finally {
    probe.remove();
  }
}

/**
 * 새로고침으로 유실된 player Cube의 translateY 위치를 복원한다.
 *
 * 정상 진입에서는 cubeReadyEnd()가 이미 inline transform을 기록하므로
 * 아무 연산 없이 즉시 반환한다. setOrder reload 복구처럼 새 document에
 * Cube DOM만 재생성된 경우에만 정상 경로와 같은 식으로 위치를 계산한다.
 *
 * 반드시 cubeReady() 이후, cubePlaying() 이전에 호출한다.
 * 그래야 정상 Ready 단계와 같은 Cube 크기를 기준으로 위치를 계산한다.
 *
 * @returns {boolean} transform을 새로 복원했으면 true
 */
export default function ensurePlayerCubePosition() {
  const cube = document.querySelector('ul.cube.ready.start');
  if (!cube) {
    throw throwObj('elementLoss', 'ensurePlayerCubePosition - cube failed.');
  }

  // 정상 진입 또는 이미 복구된 상태는 그대로 유지한다.
  if (cube.style.transform.trim() !== '') return false;

  const playerBlock = document.querySelector('.player-block');
  if (!playerBlock) {
    throw throwObj('elementLoss', 'ensurePlayerCubePosition - playerBlock failed.');
  }

  const cubeHeight = cube.clientHeight;
  const bottomReservation = measureBottomReservation();
  const translateY = (
    playerBlock.clientHeight - cubeHeight - bottomReservation
  ) / 2;

  if (!Number.isFinite(translateY)) {
    throw throwObj('errorComn', 'ensurePlayerCubePosition - translateY failed.');
  }

  cube.style.transform = `translateY(${translateY}px)`;
  return true;
}
