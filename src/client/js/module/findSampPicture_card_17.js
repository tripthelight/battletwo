function getMergedCurvedArrowPath({
  width = 300,
  height = 300,

  xThickness,

  triangleHeight,
  triangleBaseLength,

  apexX,
  apexY,

  arcHeight,
  // arcCircleDiameter,

  precision = 4,
  diameterTolerance = 0.01,
}) {
  if (
    !Number.isFinite(width) ||
    !Number.isFinite(height) ||
    !Number.isFinite(xThickness) ||
    !Number.isFinite(triangleHeight) ||
    !Number.isFinite(triangleBaseLength) ||
    !Number.isFinite(apexX) ||
    !Number.isFinite(apexY) ||
    !Number.isFinite(arcHeight)
    // || !Number.isFinite(arcCircleDiameter)
  ) {
    throw new Error("모든 인자는 숫자여야 합니다.");
  }

  if (
    width <= 0 ||
    height <= 0 ||
    xThickness <= 0 ||
    triangleHeight <= 0 ||
    triangleBaseLength <= 0 ||
    arcHeight <= 0
    // || arcCircleDiameter <= 0
  ) {
    throw new Error("모든 길이 인자는 0보다 커야 합니다.");
  }

  if (width !== height) {
    throw new Error("현재 함수는 정사각형 기준이므로 width와 height는 같아야 합니다.");
  }

  if (Math.abs(apexX - apexY) > 1e-9) {
    throw new Error("현재 구조에서는 최초 삼각형의 apexX와 apexY가 같아야 합니다.");
  }

  if (xThickness > triangleBaseLength) {
    throw new Error("xThickness는 triangleBaseLength보다 클 수 없습니다.");
  }

  const cx = width / 2;
  const cy = height / 2;

  const center = { x: cx, y: cy };

  const SQRT_HALF = Math.SQRT1_2;

  const direction = {
    x: SQRT_HALF,
    y: SQRT_HALF,
  };

  const normal = {
    x: -SQRT_HALF,
    y: SQRT_HALF,
  };

  const round = (value) => {
    const n = Number(value.toFixed(precision));
    return Math.abs(n) < 1e-10 ? 0 : n;
  };

  const formatPoint = (point) => `${round(point.x)},${round(point.y)}`;

  const rotateAroundCenter = (point, degree) => {
    const rad = degree * Math.PI / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const dx = point.x - cx;
    const dy = point.y - cy;

    return {
      x: cx + dx * cos - dy * sin,
      y: cy + dx * sin + dy * cos,
    };
  };

  const pointFromApex = (apex, along, across) => {
    return {
      x: apex.x + direction.x * along + normal.x * across,
      y: apex.y + direction.y * along + normal.y * across,
    };
  };

  const normalizeAngle = (angle) => {
    let a = angle;
    while (a <= -Math.PI) a += Math.PI * 2;
    while (a > Math.PI) a -= Math.PI * 2;
    return a;
  };

  /*
   * ---------------------------------------------------------
   * 1. 밑변 활꼴의 원 반지름 계산
   *
   * chord = triangleBaseLength
   * sagitta = arcHeight
   *
   * R = c^2 / (8h) + h / 2
   * ---------------------------------------------------------
   */
  const chord = triangleBaseLength;
  const sagitta = arcHeight;

  const radiusFromSagitta = (chord * chord) / (8 * sagitta) + sagitta / 2;
  const diameterFromSagitta = radiusFromSagitta * 2;

  /* if (Math.abs(diameterFromSagitta - arcCircleDiameter) > diameterTolerance) {
    throw new Error(
      [
        "triangleBaseLength, arcHeight, arcCircleDiameter 조합이 서로 맞지 않습니다.",
        `입력된 arcCircleDiameter: ${arcCircleDiameter}`,
        `arcHeight 기준으로 계산된 지름: ${diameterFromSagitta}`,
      ].join(" ")
    );
  } */

  const arcRadius = radiusFromSagitta;

  if (triangleBaseLength / 2 >= arcRadius) {
    throw new Error("arcCircleDiameter가 너무 작아서 triangleBaseLength를 가진 활꼴을 만들 수 없습니다.");
  }

  /*
   * ---------------------------------------------------------
   * 2. 최초(좌상단) 화살표 기하 계산
   * ---------------------------------------------------------
   */
  const apex = {
    x: apexX,
    y: apexY,
  };

  const halfBase = triangleBaseLength / 2;
  const halfX = xThickness / 2;

  /*
   * 직선 밑변의 중심점
   */
  const baseCenter = pointFromApex(apex, triangleHeight, 0);

  /*
   * 활꼴의 양 끝점(원래 삼각형 밑변 양 끝점)
   */
  const baseLeft = pointFromApex(apex, triangleHeight, +halfBase);
  const baseRight = pointFromApex(apex, triangleHeight, -halfBase);

  /*
   * 원 중심:
   * 활꼴이 apex 방향으로 오목하게 들어가게 만들기 위해,
   * chord(밑변) 반대편, 즉 shaft 방향으로 원 중심을 둡니다.
   *
   * chord midpoint에서 원 중심까지 거리 = R - sagitta
   */
  const circleCenterDistanceFromBase = arcRadius - sagitta;

  const arcCircleCenter = pointFromApex(
    apex,
    triangleHeight + circleCenterDistanceFromBase,
    0
  );

  /*
   * ---------------------------------------------------------
   * 3. 활꼴과 X 몸통이 만나는 접속점 계산
   *
   * local 좌표에서 across = ±halfX 인 위치가
   * 원 위에 있도록 along 값을 계산
   * ---------------------------------------------------------
   */
  if (halfX >= arcRadius) {
    throw new Error("xThickness가 너무 커서 활꼴과 정상적으로 만날 수 없습니다.");
  }

  const localCircleCenterAlong = triangleHeight + circleCenterDistanceFromBase;

  const joinAlong =
    localCircleCenterAlong -
    Math.sqrt(arcRadius * arcRadius - halfX * halfX);

  const joinLeft = pointFromApex(apex, joinAlong, +halfX);
  const joinRight = pointFromApex(apex, joinAlong, -halfX);

  /*
   * ---------------------------------------------------------
   * 4. X 중심부 notch 계산
   * ---------------------------------------------------------
   */
  const notchOffset = xThickness / Math.SQRT2;

  const notchTop = {
    x: cx,
    y: cy - notchOffset,
  };

  const notchLeft = {
    x: cx - notchOffset,
    y: cy,
  };

  /*
   * ---------------------------------------------------------
   * 5. 원호를 cubic bezier로 근사하는 제어점 계산
   *
   * start -> end 를 잇는 "짧은 원호"를 구합니다.
   * ---------------------------------------------------------
   */
  const getArcBezier = (start, end, circleCenter) => {
    const startAngle = Math.atan2(
      start.y - circleCenter.y,
      start.x - circleCenter.x
    );

    const endAngle = Math.atan2(
      end.y - circleCenter.y,
      end.x - circleCenter.x
    );

    const delta = normalizeAngle(endAngle - startAngle);

    const k = (4 / 3) * Math.tan(delta / 4);

    const c1 = {
      x: start.x - k * (start.y - circleCenter.y),
      y: start.y + k * (start.x - circleCenter.x),
    };

    const c2 = {
      x: end.x + k * (end.y - circleCenter.y),
      y: end.y - k * (end.x - circleCenter.x),
    };

    return {
      c1,
      c2,
      end,
    };
  };

  /*
   * 첫 번째 화살표의 곡선 2개
   *
   * notchTop
   *   -> joinRight
   *   -> (curve) baseRight
   *   -> apex
   *   -> baseLeft
   *   -> (curve) joinLeft
   *   -> notchLeft
   */
  const rightShoulderArc = getArcBezier(
    joinRight,
    baseRight,
    arcCircleCenter
  );

  const leftShoulderArc = getArcBezier(
    baseLeft,
    joinLeft,
    arcCircleCenter
  );

  /*
   * ---------------------------------------------------------
   * 6. 하나의 화살표 템플릿
   * ---------------------------------------------------------
   */
  const firstArrow = {
    notchStart: notchTop,
    joinRight,
    rightArcC1: rightShoulderArc.c1,
    rightArcC2: rightShoulderArc.c2,
    baseRight,
    apex,
    baseLeft,
    leftArcC1: leftShoulderArc.c1,
    leftArcC2: leftShoulderArc.c2,
    joinLeft,
    notchEnd: notchLeft,
  };

  /*
   * ---------------------------------------------------------
   * 7. 4개의 화살표를 회전시키며,
   *    하나의 연속된 d 문자열 생성
   *
   * 순서:
   * 0°   : 좌상단 화살표
   * 270° : 좌하단 화살표
   * 180° : 우하단 화살표
   * 90°  : 우상단 화살표
   * ---------------------------------------------------------
   */
  const rotationOrder = [0, 270, 180, 90];

  const dParts = [];

  rotationOrder.forEach((degree, index) => {
    const rotated = {
      notchStart: rotateAroundCenter(firstArrow.notchStart, degree),
      joinRight: rotateAroundCenter(firstArrow.joinRight, degree),
      rightArcC1: rotateAroundCenter(firstArrow.rightArcC1, degree),
      rightArcC2: rotateAroundCenter(firstArrow.rightArcC2, degree),
      baseRight: rotateAroundCenter(firstArrow.baseRight, degree),
      apex: rotateAroundCenter(firstArrow.apex, degree),
      baseLeft: rotateAroundCenter(firstArrow.baseLeft, degree),
      leftArcC1: rotateAroundCenter(firstArrow.leftArcC1, degree),
      leftArcC2: rotateAroundCenter(firstArrow.leftArcC2, degree),
      joinLeft: rotateAroundCenter(firstArrow.joinLeft, degree),
      notchEnd: rotateAroundCenter(firstArrow.notchEnd, degree),
    };

    if (index === 0) {
      dParts.push(`M${formatPoint(rotated.notchStart)}`);
    }

    dParts.push(`L${formatPoint(rotated.joinRight)}`);

    dParts.push(
      `C${formatPoint(rotated.rightArcC1)} ${formatPoint(rotated.rightArcC2)} ${formatPoint(rotated.baseRight)}`
    );

    dParts.push(`L${formatPoint(rotated.apex)}`);
    dParts.push(`L${formatPoint(rotated.baseLeft)}`);

    dParts.push(
      `C${formatPoint(rotated.leftArcC1)} ${formatPoint(rotated.leftArcC2)} ${formatPoint(rotated.joinLeft)}`
    );

    dParts.push(`L${formatPoint(rotated.notchEnd)}`);
  });

  dParts.push("Z");

  const d = dParts.join(" ");

  return {
    d,
    arcRadius: round(arcRadius),
    computedArcCircleDiameter: round(diameterFromSagitta),
    firstArrow: {
      apex: { x: round(apex.x), y: round(apex.y) },
      baseLeft: { x: round(baseLeft.x), y: round(baseLeft.y) },
      baseRight: { x: round(baseRight.x), y: round(baseRight.y) },
      joinLeft: { x: round(joinLeft.x), y: round(joinLeft.y) },
      joinRight: { x: round(joinRight.x), y: round(joinRight.y) },
      arcCircleCenter: {
        x: round(arcCircleCenter.x),
        y: round(arcCircleCenter.y),
      },
    },
  };
}

const result = getMergedCurvedArrowPath({
  width: 300,
  height: 300,

  xThickness: 30,

  triangleHeight: 100,
  triangleBaseLength: 80,

  apexX: 10,
  apexY: 10,

  arcHeight: 8,
  // arcCircleDiameter: 208,
});

console.log(result.d);
