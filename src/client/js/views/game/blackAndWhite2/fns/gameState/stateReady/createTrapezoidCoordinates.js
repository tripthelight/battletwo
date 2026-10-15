/**
 * 오른쪽 대각선의 기울기를 유지하며, 직각사다리꼴/직각삼각형 좌표를 생성합니다.
 * 좌표 원점은 각 도형의 왼쪽 위 (0, 0), Y축은 아래쪽으로 증가합니다.
 *
 * @param {number} topWidth 첫 도형의 윗면 길이 (0 이상)
 * @param {number} bottomWidth 첫 도형의 아랫면 길이 (0 이상)
 * @param {number} leftHeight 첫 도형의 왼쪽면 길이 (0 초과)
 * @param {number} count 전체 도형 개수 (1 이상의 안전한 정수)
 * @returns {Array} 각 도형의 유형, 유효 길이, 원래 계산 길이, 대각선 각도, 좌표
 */
export default (topWidth, bottomWidth, leftHeight, count) => {
  if (
    ![topWidth, bottomWidth, leftHeight].every(Number.isFinite) ||
    topWidth < 0 ||
    bottomWidth < 0 ||
    leftHeight <= 0 ||
    (topWidth === 0 && bottomWidth === 0) ||
    !Number.isSafeInteger(count) ||
    count < 1
  ) {
    throw new RangeError('올바른 길이와 도형 개수를 입력해야 합니다.');
  }

  if (topWidth === bottomWidth) {
    throw new RangeError('윗면과 아랫면이 같으면 오른쪽 면이 대각선이 아닙니다.');
  }

  // 더 긴 면을 기준으로 줄여야 윗면/아랫면 중 어느 쪽이 짧아도 삼각형이 될 수 있습니다.
  const step = Math.max(topWidth, bottomWidth) / count;
  const diagonalOffset = bottomWidth - topWidth;
  const diagonalAngle = Math.atan2(leftHeight, diagonalOffset) * 180 / Math.PI;
  const epsilon = Number.EPSILON * 16 * Math.max(topWidth, bottomWidth, 1);
  const shapes = [];

  for (let i = 0; i < count; i++) {
    const reduction = step * i;
    const computedTop = topWidth - reduction;
    const computedBottom = bottomWidth - reduction;
    const currentTop = Math.abs(computedTop) <= epsilon ? 0 : computedTop;
    const currentBottom = Math.abs(computedBottom) <= epsilon ? 0 : computedBottom;

    let type;
    let points;
    let actualHeight = leftHeight;

    if (currentTop > 0 && currentBottom > 0) {
      type = 'trapezoid';
      points = [
        { x: 0, y: 0 },
        { x: currentTop, y: 0 },
        { x: currentBottom, y: leftHeight },
        { x: 0, y: leftHeight }
      ];
    } else if (currentTop <= 0 && currentBottom > 0) {
      // 윗면이 0 이하: 대각선과 왼쪽 면(x=0)이 만나는 점 아래만 남깁니다.
      type = 'triangle';
      const intersectionY = (-currentTop * leftHeight) / (currentBottom - currentTop);
      actualHeight = leftHeight - intersectionY;
      points = [
        { x: 0, y: intersectionY },
        { x: currentBottom, y: leftHeight },
        { x: 0, y: leftHeight }
      ];
    } else if (currentBottom <= 0 && currentTop > 0) {
      // 아랫면이 0 이하: 대각선과 왼쪽 면(x=0)이 만나는 점 위만 남깁니다.
      type = 'triangle';
      const intersectionY = (currentTop * leftHeight) / (currentTop - currentBottom);
      actualHeight = intersectionY;
      points = [
        { x: 0, y: 0 },
        { x: currentTop, y: 0 },
        { x: 0, y: intersectionY }
      ];
    } else {
      // 정상 입력과 i<count에서는 발생할 수 없는 경우에 대한 안전장치입니다.
      throw new RangeError('유효한 도형을 생성할 수 없습니다.');
    }

    shapes.push({
      index: i + 1,
      type,
      calculatedTopWidth: currentTop,
      calculatedBottomWidth: currentBottom,
      topWidth: Math.max(0, currentTop),
      bottomWidth: Math.max(0, currentBottom),
      leftHeight: actualHeight,
      diagonalAngle,
      points
    });
  }

  return shapes;
}
