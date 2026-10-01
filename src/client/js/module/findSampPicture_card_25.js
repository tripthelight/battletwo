function getFivePointStarPath(margin) {
  const size = 300;
  const targetCenterX = size / 2;
  const targetCenterY = size / 2;

  if (!Number.isFinite(margin)) {
    throw new Error("margin은 숫자여야 합니다.");
  }

  if (margin < 0 || margin >= size / 2) {
    throw new Error("margin은 0 이상 150 미만이어야 합니다.");
  }

  /*
   * 좌우 여백 10px을 맞추는 기준
   *
   * 정5각별의 가장 좌우 바깥점은
   * outerRadius * cos(18°) 위치에 생깁니다.
   *
   * 따라서
   *   maxX = 300 - margin
   *   minX = margin
   *
   * 이 되게 하려면:
   *
   * outerRadius * cos(18°) = 150 - margin
   */
  const cos18 = Math.cos((18 * Math.PI) / 180);
  const outerRadius = (size / 2 - margin) / cos18;

  /*
   * 정5각별의 안쪽 반지름 비율
   * = sin(18°) / sin(54°)
   */
  const innerRadius =
    outerRadius *
    Math.sin((18 * Math.PI) / 180) /
    Math.sin((54 * Math.PI) / 180);

  const rawPoints = [];

  /*
   * 위쪽 꼭지점부터 시작
   * 바깥점 / 안쪽점을 번갈아 총 10개 생성
   */
  for (let i = 0; i < 10; i += 1) {
    const isOuter = i % 2 === 0;
    const radius = isOuter ? outerRadius : innerRadius;

    const angleDeg = -90 + i * 36;
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = targetCenterX + radius * Math.cos(angleRad);
    const y = targetCenterY + radius * Math.sin(angleRad);

    rawPoints.push({ x, y });
  }

  /*
   * 별 path 자체의 bounding box 계산
   */
  const xs = rawPoints.map((point) => point.x);
  const ys = rawPoints.map((point) => point.y);

  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  const bboxCenterX = (minX + maxX) / 2;
  const bboxCenterY = (minY + maxY) / 2;

  /*
   * bounding box 중심이 정사각형 중심으로 오도록 이동
   */
  const offsetX = targetCenterX - bboxCenterX;
  const offsetY = targetCenterY - bboxCenterY;

  const centeredPoints = rawPoints.map((point) => {
    return {
      x: Math.round(point.x + offsetX),
      y: Math.round(point.y + offsetY),
    };
  });

  const d =
    centeredPoints
      .map((point, index) => {
        const command = index === 0 ? "M" : "L";
        return `${command}${point.x},${point.y}`;
      })
      .join(" ") + " Z";

  return d;
}







const d = getFivePointStarPath(10);
console.log(d);
