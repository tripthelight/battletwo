function getMergedCurvedPlusArrowPath({
  width = 300,
  height = 300,

  xThickness,

  triangleHeight,
  triangleBaseLength,

  apexX,
  apexY,

  arcHeight,

  precision = 4,
}) {
  const values = [
    width,
    height,
    xThickness,
    triangleHeight,
    triangleBaseLength,
    apexX,
    apexY,
    arcHeight,
  ];

  if (!values.every(Number.isFinite)) {
    throw new Error("모든 인자는 숫자여야 합니다.");
  }

  if (
    width <= 0 ||
    height <= 0 ||
    xThickness <= 0 ||
    triangleHeight <= 0 ||
    triangleBaseLength <= 0 ||
    arcHeight <= 0
  ) {
    throw new Error("모든 길이 값은 0보다 커야 합니다.");
  }

  if (width !== height) {
    throw new Error(
      "현재 함수는 정사각형을 기준으로 하므로 width와 height가 같아야 합니다."
    );
  }

  if (xThickness >= triangleBaseLength) {
    throw new Error(
      "xThickness는 triangleBaseLength보다 작아야 합니다."
    );
  }

  if (arcHeight >= triangleBaseLength / 2) {
    throw new Error(
      "arcHeight는 triangleBaseLength / 2보다 작아야 합니다."
    );
  }

  const cx = width / 2;
  const cy = height / 2;

  if (Math.abs(apexX - cx) > 1e-9) {
    throw new Error(
      `card_21 형태를 만들려면 apexX는 정사각형 중심인 ${cx}이어야 합니다.`
    );
  }

  if (apexY < 0 || apexY >= cy) {
    throw new Error(
      "최초 apexY는 정사각형의 위쪽 절반 안에 있어야 합니다."
    );
  }

  const halfX = xThickness / 2;
  const halfBase = triangleBaseLength / 2;

  const arcRadius =
    (triangleBaseLength * triangleBaseLength) / (8 * arcHeight) +
    arcHeight / 2;

  const apex = {
    x: apexX,
    y: apexY,
  };

  const baseY = apexY + triangleHeight;

  const baseLeft = {
    x: apexX - halfBase,
    y: baseY,
  };

  const baseRight = {
    x: apexX + halfBase,
    y: baseY,
  };

  const circleCenterY =
    baseY + (arcRadius - arcHeight);

  const circleCenter = {
    x: apexX,
    y: circleCenterY,
  };

  if (halfX >= arcRadius) {
    throw new Error(
      "xThickness가 너무 커서 원호와 정상적으로 교차할 수 없습니다."
    );
  }

  const joinOffsetY =
    Math.sqrt(
      arcRadius * arcRadius -
      halfX * halfX
    );

  const joinY =
    circleCenterY - joinOffsetY;

  const joinLeft = {
    x: cx - halfX,
    y: joinY,
  };

  const joinRight = {
    x: cx + halfX,
    y: joinY,
  };

  const topLeftCorner = {
    x: cx - halfX,
    y: cy - halfX,
  };

  const topRightCorner = {
    x: cx + halfX,
    y: cy - halfX,
  };

  if (joinY >= topRightCorner.y) {
    throw new Error(
      "triangleHeight가 너무 커서 화살촉이 중앙 + 영역과 겹칩니다."
    );
  }

  const rotatePoint = (point, degree) => {
    const radian = degree * Math.PI / 180;

    const cos = Math.cos(radian);
    const sin = Math.sin(radian);

    const dx = point.x - cx;
    const dy = point.y - cy;

    return {
      x: cx + dx * cos - dy * sin,
      y: cy + dx * sin + dy * cos,
    };
  };

  const cleanNumber = (value) => {
    return Math.round(value);
  };

  const pointString = (point) => {
    return `${cleanNumber(point.x)},${cleanNumber(point.y)}`;
  };

  const firstArrow = {
    startCorner: topRightCorner,
    joinRight,
    baseRight,
    apex,
    baseLeft,
    joinLeft,
    endCorner: topLeftCorner,
  };

  const rotationOrder = [
    0,
    270,
    180,
    90,
  ];

  const d = [];
  const apexPoints = [];

  rotationOrder.forEach((degree, index) => {
    const rotated = {
      startCorner: rotatePoint(firstArrow.startCorner, degree),
      joinRight: rotatePoint(firstArrow.joinRight, degree),
      baseRight: rotatePoint(firstArrow.baseRight, degree),
      apex: rotatePoint(firstArrow.apex, degree),
      baseLeft: rotatePoint(firstArrow.baseLeft, degree),
      joinLeft: rotatePoint(firstArrow.joinLeft, degree),
      endCorner: rotatePoint(firstArrow.endCorner, degree),
    };

    apexPoints.push({
      x: cleanNumber(rotated.apex.x),
      y: cleanNumber(rotated.apex.y),
    });

    if (index === 0) {
      d.push(`M${pointString(rotated.startCorner)}`);
    }

    d.push(`L${pointString(rotated.joinRight)}`);

    /*
     * 여기의 sweepFlag를 1로 바꿔야
     * 호가 apex 방향으로 휘어집니다.
     */
    d.push(
      `A${cleanNumber(arcRadius)},${cleanNumber(arcRadius)} 0 0 1 ${pointString(rotated.baseRight)}`
    );

    d.push(`L${pointString(rotated.apex)}`);
    d.push(`L${pointString(rotated.baseLeft)}`);

    d.push(
      `A${cleanNumber(arcRadius)},${cleanNumber(arcRadius)} 0 0 1 ${pointString(rotated.joinLeft)}`
    );

    d.push(`L${pointString(rotated.endCorner)}`);
  });

  d.push("Z");

  return {
    d: d.join(" "),
    arcRadius: cleanNumber(arcRadius),
    apexPoints,
    firstTriangle: {
      apex: {
        x: cleanNumber(apex.x),
        y: cleanNumber(apex.y),
      },
      baseLeft: {
        x: cleanNumber(baseLeft.x),
        y: cleanNumber(baseLeft.y),
      },
      baseRight: {
        x: cleanNumber(baseRight.x),
        y: cleanNumber(baseRight.y),
      },
      joinLeft: {
        x: cleanNumber(joinLeft.x),
        y: cleanNumber(joinLeft.y),
      },
      joinRight: {
        x: cleanNumber(joinRight.x),
        y: cleanNumber(joinRight.y),
      },
      circleCenter: {
        x: cleanNumber(circleCenter.x),
        y: cleanNumber(circleCenter.y),
      },
    },
  };
}






const result = getMergedCurvedPlusArrowPath({
  width: 300,
  height: 300,

  xThickness: 30,

  triangleHeight: 76,
  triangleBaseLength: 76,

  apexX: 150,
  apexY: 10,

  arcHeight: 8,
});

console.log(result.d);
