import { SVG_NS } from '@/client/js/functions/variable';

/**
 * 직각사다리꼴과 직각삼각형을 SVG path로 직접 생성합니다.
 *
 * 기존 createTrapezoidCoordinates()처럼 중간 좌표 배열을 만들지 않습니다.
 * 색상/도형 순서와 겹쳐 그리는 방식은 기존 실행 코드와 동일합니다.
 *
 * @param {number} topWidth 첫 도형의 윗면 길이 (0 이상)
 * @param {number} bottomWidth 첫 도형의 아랫면 길이 (0 이상)
 * @param {number} height 왼쪽면의 원래 높이 (0 초과)
 * @param {string[]} fillColors 도형 순서대로 적용할 색상 배열; 배열 길이가 도형 개수
 * @returns {SVGSVGElement} 아직 DOM에 연결되지 않은 SVG
 */
export default (topWidth, bottomWidth, height, fillColors) => {
  if (
    !Number.isFinite(topWidth) ||
    !Number.isFinite(bottomWidth) ||
    !Number.isFinite(height) ||
    topWidth < 0 ||
    bottomWidth < 0 ||
    height <= 0 ||
    topWidth === bottomWidth ||
    !fillColors ||
    !Number.isSafeInteger(fillColors.length) ||
    fillColors.length < 1
  ) {
    throw new RangeError('윗면/아랫면/높이/색상 배열을 확인해 주세요. 오른쪽 면은 대각선이어야 합니다.');
  }

  const count = fillColors.length;
  const step = Math.max(topWidth, bottomWidth) / count;
  const diagonalOffset = bottomWidth - topWidth;
  const epsilon = Number.EPSILON * 16 * Math.max(topWidth, bottomWidth, 1);
  const svgWidth = topWidth + bottomWidth;

  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('width', svgWidth);
  svg.setAttribute('height', height);
  svg.setAttribute('viewBox', `0 0 ${svgWidth} ${height}`);
  svg.classList.add('wrapper');

  for (let i = 0; i < count; i++) {
    const reduction = step * i;
    let top = topWidth - reduction;
    let bottom = bottomWidth - reduction;

    // 실수 계산에서 0에 매우 가까운 값은 0으로 처리합니다.
    if (Math.abs(top) <= epsilon) top = 0;
    if (Math.abs(bottom) <= epsilon) bottom = 0;

    let d;

    if (top > 0 && bottom > 0) {
      // 직각사다리꼴: 왼쪽 위 -> 오른쪽 위 -> 오른쪽 아래 -> 왼쪽 아래
      d = `M0 0H${top}L${bottom} ${height}H0Z`;
    } else if (top <= 0 && bottom > 0) {
      // 윗면이 사라지면 아래쪽 직각삼각형만 남깁니다.
      const intersectionY = (-top * height) / diagonalOffset;
      d = `M0 ${intersectionY}L${bottom} ${height}H0Z`;
    } else if (bottom <= 0 && top > 0) {
      // 아랫면이 사라지면 위쪽 직각삼각형만 남깁니다.
      const intersectionY = (top * height) / -diagonalOffset;
      d = `M0 0H${top}L0 ${intersectionY}Z`;
    } else {
      // 정상적인 입력에서는 도달하지 않는 방어 코드입니다.
      throw new RangeError('유효하지 않은 도형 좌표가 생성되었습니다.');
    }

    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('fill', fillColors[i]);
    path.setAttribute('d', d);
    svg.appendChild(path);
  }

  // 도형을 모두 만든 다음, 외부에서 이 SVG를 DOM에 한 번만 추가합니다.
  return svg;
}
