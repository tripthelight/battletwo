import GAME_LIST from '@/client/js/webpack/JSON/gameList.json';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default async () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'gameCard.js - container element failed.');
    const cardWrap = container.querySelector(".game-cards");
    if (!cardWrap) throw throwObj('elementLoss', 'gameCard.js - .game-cards element failed.');

    const gameList = GAME_LIST.gameList;
    if (!gameList.length) throw throwObj('errorComn', 'gameCard.js - gameList length error.');

    // ============================================================================
    // ============================================================================
    // ============================================================================
    const svgNS = "http://www.w3.org/2000/svg";
    const shapeCount = gameList.length;
    if (shapeCount < 3) throw throwObj('dataManipulation', 'gameCard.js game list length failed.');

    const WW = window.innerWidth;
    const WH = window.innerHeight;
    const blankMargin = WW > WH ? Math.round(WW / 20) : Math.round(WH / 20);
    const centerX = WW / 2;
    const centerY = WH / 2;
    const angle = 360 / shapeCount;
    const DEG_TO_RAD = Math.PI / 180;

    /*
    * 최초 배치 각도와 회전 애니메이션 값.
    *
    * SVG는 순차적으로 rotationAngle만큼 회전한다.
    * SVG만 독립적으로 회전시키면 인접 SVG 사이에 빈 공간이 생기므로,
    * 애니메이션 중에는 중앙 정N각형을 이루는 공통 경계선도 함께 이동시키고
    * 그 경계선을 기준으로 인접 path의 d 값을 다시 계산한다.
    */
    const INCREASE_TIME = 200;
    const animationTime = 1000;
    const animationFunc = ["ease", "ease-in", "ease-out", "ease-in-out", "linear"];
    const selectedAnimationFunc = animationFunc[1]; // ease-in

    if (animationTime <= 0) {
      throw throwObj('dataManipulation', 'gameCard.js animationTime failed.');
    }

    const initializationAngle = Math.floor(Math.random() * 361);
    const minAngle = 20;
    const maxAngle = 40;
    const rotationAngle = Math.floor(Math.random() * (maxAngle - minAngle + 1)) + minAngle;
    const rotationRadian = rotationAngle * DEG_TO_RAD;

    /*
    * blankMargin은
    * 중심 -> 정N각형의 변까지의 거리(apothem)이다.
    *
    * 따라서 중심 -> 꼭짓점까지의 거리(circumradius)는
    *
    * R = apothem / cos(PI / N)
    */
    const polygonRadius = blankMargin / Math.cos(Math.PI / shapeCount);

    /*
    * 중앙 정N각형의 회전 시작각.
    *
    * 홀수:
    *   3개 -> 삼각형 꼭짓점이 위쪽
    *   5개 -> 오각형 꼭짓점이 위쪽
    *
    * 짝수:
    *   4개 -> 사각형의 위쪽 변이 수평
    *
    * 첨부하신 이미지의 방향과 맞춘다.
    */
    const startAngle = shapeCount % 2 === 0 ? -90 - angle / 2 : -90;

    /*
    * 중앙 정N각형의 모든 꼭짓점을 계산한다.
    */
    const polygonPoints = [];
    for (let i = 0; i < shapeCount; i++) {
      const currentAngle = (startAngle + i * angle) * DEG_TO_RAD;
      polygonPoints.push({
        x: centerX + Math.cos(currentAngle) * polygonRadius,
        y: centerY + Math.sin(currentAngle) * polygonRadius,
      });
    }

    /*
    * 화면보다 충분히 멀리 path를 연장한다.
    */
    const rayLength = Math.hypot(WW, WH) * 4;

    function normalize(x, y) {
      const length = Math.hypot(x, y);
      return {
        x: x / length,
        y: y / length,
      };
    }

    /*
    * 최초/최종 상태에서 사용하는 기본 path.
    *
    * 모든 경계선의 회전량이 같을 때는 기존 정N각형 구조와 완전히 동일하므로
    * 애니메이션이 끝난 뒤에도 이 기본 d 값을 그대로 사용할 수 있다.
    */
    function pathValue() {
      const A = polygonPoints[0];
      const B = polygonPoints[1];
      const C = polygonPoints[2];

      const ray1 = normalize(
        A.x - B.x,
        A.y - B.y
      );

      const ray2 = normalize(
        B.x - C.x,
        B.y - C.y
      );

      const farPoint1 = {
        x: A.x + ray1.x * rayLength,
        y: A.y + ray1.y * rayLength,
      };

      const farPoint2 = {
        x: B.x + ray2.x * rayLength,
        y: B.y + ray2.y * rayLength,
      };

      const dData = Object.fromEntries(
        Object.entries({ A, B, farPoint1, farPoint2 }).map(([key, point]) => [
          key,
          {
            x: point.x > 0 ? Math.floor(point.x) : Math.ceil(point.x),
            y: point.y > 0 ? Math.floor(point.y) : Math.ceil(point.y),
          },
        ])
      );

      return [
        `M ${dData.A.x} ${dData.A.y}`,
        `L ${dData.B.x} ${dData.B.y}`,
        `L ${dData.farPoint2.x} ${dData.farPoint2.y}`,
        `L ${dData.farPoint1.x} ${dData.farPoint1.y}`,
        "Z",
      ].join(" ");
    }

    const defaultPathValue = pathValue();

    /*
    * 각 경계선은 중앙 원(blankMargin)에 접하는 직선으로 관리한다.
    *
    * lineStates[i]는 정N각형의 i번째 변이다.
    * 한 경계선만 움직일 때 이 경계선을 공유하는 path들의 d를 함께 변경하면
    * SVG들이 서로 다른 시간에 회전해도 화면에 빈 공간이 생기지 않는다.
    */
    const initialLineAngles = new Array(shapeCount);
    const lineStates = new Array(shapeCount);

    function setLineAngle(index, radian) {
      const cos = Math.cos(radian);
      const sin = Math.sin(radian);

      lineStates[index] = {
        cos,
        sin,
        tangentX: -sin,
        tangentY: cos,
      };
    }

    for (let i = 0; i < shapeCount; i++) {
      const lineAngle = (
        startAngle
        + (i + 0.5) * angle
        + initializationAngle
      ) * DEG_TO_RAD;

      initialLineAngles[i] = lineAngle;
      setLineAngle(i, lineAngle);
    }

    /*
    * 두 접선의 교점을 구한다.
    * 각 접선은 중심을 원점으로 보았을 때 다음 식을 만족한다.
    *
    * cos(a) * x + sin(a) * y = blankMargin
    */
    function getLineIntersection(lineA, lineB) {
      const determinant = lineA.cos * lineB.sin - lineA.sin * lineB.cos;

      return {
        x: centerX + blankMargin * (lineB.sin - lineA.sin) / determinant,
        y: centerY + blankMargin * (lineA.cos - lineB.cos) / determinant,
      };
    }

    function formatPathNumber(value) {
      return Math.round(value * 100) / 100;
    }

    /*
    * 기존 SVG 제거
    */
    cardWrap.replaceChildren();

    const cards = new Array(shapeCount);
    const paths = new Array(shapeCount);
    const initialCardAngles = new Array(shapeCount);
    const cardStates = new Array(shapeCount);

    /*
    * CSS transform으로 회전된 SVG 내부에 path를 그리기 때문에,
    * 화면 좌표로 계산한 점을 해당 SVG의 로컬 좌표로 역회전한다.
    */
    function toLocalPoint(point, cardState) {
      const dx = point.x - centerX;
      const dy = point.y - centerY;

      return {
        x: centerX + dx * cardState.cos + dy * cardState.sin,
        y: centerY - dx * cardState.sin + dy * cardState.cos,
      };
    }

    function setCardAngle(index, degree) {
      const radian = degree * DEG_TO_RAD;
      const cardState = cardStates[index];

      cardState.cos = Math.cos(radian);
      cardState.sin = Math.sin(radian);
      cards[index].style.transform = `rotate(${degree}deg)`;
    }

    /*
    * 현재 경계선 상태를 기준으로 한 path의 실제 화면 모양을 계산한다.
    *
    * A : 이전 경계선과 현재 경계선의 교점
    * B : 현재 경계선과 다음 경계선의 교점
    *
    * A -> B는 중앙 빈 공간의 한 변이며,
    * farPoint1 / farPoint2는 각각 두 경계선을 화면 밖까지 연장한 점이다.
    */
    function updatePath(index) {
      const prevLine = lineStates[(index - 1 + shapeCount) % shapeCount];
      const currentLine = lineStates[index];
      const nextLine = lineStates[(index + 1) % shapeCount];

      const A = getLineIntersection(prevLine, currentLine);
      const B = getLineIntersection(currentLine, nextLine);

      const farPoint1 = {
        x: A.x - currentLine.tangentX * rayLength,
        y: A.y - currentLine.tangentY * rayLength,
      };

      const farPoint2 = {
        x: B.x - nextLine.tangentX * rayLength,
        y: B.y - nextLine.tangentY * rayLength,
      };

      const cardState = cardStates[index];
      const localA = toLocalPoint(A, cardState);
      const localB = toLocalPoint(B, cardState);
      const localFarPoint1 = toLocalPoint(farPoint1, cardState);
      const localFarPoint2 = toLocalPoint(farPoint2, cardState);

      paths[index].setAttribute("d", [
        `M ${formatPathNumber(localA.x)} ${formatPathNumber(localA.y)}`,
        `L ${formatPathNumber(localB.x)} ${formatPathNumber(localB.y)}`,
        `L ${formatPathNumber(localFarPoint2.x)} ${formatPathNumber(localFarPoint2.y)}`,
        `L ${formatPathNumber(localFarPoint1.x)} ${formatPathNumber(localFarPoint1.y)}`,
        "Z",
      ].join(" "));
    }

    /*
    * gameList 개수만큼 SVG를 만들고
    * initializationAngle + increaseAngle 위치에 먼저 배치한다.
    */
    for (let i = 0; i < shapeCount; i++) {
      const increaseAngle = i * angle;
      const initialAngle = initializationAngle + increaseAngle;
      const cardSVG = document.createElementNS(svgNS, "svg");
      const path = document.createElementNS(svgNS, "path");

      cardSVG.setAttribute("viewBox", `0 0 ${WW} ${WH}`);
      cardSVG.setAttribute("width", String(WW));
      cardSVG.setAttribute("height", String(WH));
      cardSVG.classList.add("card", gameList[i]);

      path.setAttribute("d", defaultPathValue);
      path.classList.add("shape-path");
      path.dataset.index = i;
      path.dataset.shape = gameList[i];

      cardSVG.appendChild(path);
      cardWrap.appendChild(cardSVG);

      cards[i] = cardSVG;
      paths[i] = path;
      initialCardAngles[i] = initialAngle;
      cardStates[i] = {
        cos: 1,
        sin: 0,
      };

      setCardAngle(i, initialAngle);
    }

    /*
    * CSS timing-function과 동일한 cubic-bezier 진행률을 계산한다.
    *
    * SVG의 transform만 CSS easing으로 움직이고 path의 d를 별도로 선형 보간하면
    * 두 움직임의 진행률이 달라져 공통 경계선이 어긋날 수 있다.
    * 따라서 SVG 회전과 path의 d 변경 모두 같은 easing 진행률을 사용한다.
    */
    function createCubicBezier(x1, y1, x2, y2) {
      const cx = 3 * x1;
      const bx = 3 * (x2 - x1) - cx;
      const ax = 1 - cx - bx;
      const cy = 3 * y1;
      const by = 3 * (y2 - y1) - cy;
      const ay = 1 - cy - by;

      function sampleX(t) {
        return ((ax * t + bx) * t + cx) * t;
      }

      function sampleY(t) {
        return ((ay * t + by) * t + cy) * t;
      }

      function sampleDerivativeX(t) {
        return (3 * ax * t + 2 * bx) * t + cx;
      }

      return (progress) => {
        if (progress <= 0 || progress >= 1) return progress;

        let t = progress;
        let useBinarySearch = false;

        /*
        * 대부분의 프레임은 Newton-Raphson 2~4회 안에 수렴한다.
        */
        for (let i = 0; i < 4; i++) {
          const xError = sampleX(t) - progress;
          if (Math.abs(xError) < 0.00001) return sampleY(t);

          const derivative = sampleDerivativeX(t);
          if (Math.abs(derivative) < 0.000001) {
            useBinarySearch = true;
            break;
          }

          const nextT = t - xError / derivative;
          if (nextT < 0 || nextT > 1) {
            useBinarySearch = true;
            break;
          }

          t = nextT;
        }

        if (!useBinarySearch) return sampleY(t);

        /*
        * 극단적인 구간에서만 이분 탐색으로 안전하게 보정한다.
        */
        let minT = 0;
        let maxT = 1;
        t = progress;

        for (let i = 0; i < 8; i++) {
          const currentX = sampleX(t);
          if (Math.abs(currentX - progress) < 0.00001) break;

          if (currentX < progress) {
            minT = t;
          } else {
            maxT = t;
          }

          t = (minT + maxT) / 2;
        }

        return sampleY(t);
      };
    }

    function getAnimationEasing(name) {
      switch (name) {
        case "ease":
          return createCubicBezier(0.25, 0.1, 0.25, 1);
        case "ease-in":
          return createCubicBezier(0.42, 0, 1, 1);
        case "ease-out":
          return createCubicBezier(0, 0, 0.58, 1);
        case "ease-in-out":
          return createCubicBezier(0.42, 0, 0.58, 1);
        case "linear":
          return (progress) => progress;
        default:
          throw throwObj(
            'dataManipulation',
            `gameCard.js animationFunc failed: ${name}`
          );
      }
    }

    const animationEasing = getAnimationEasing(selectedAnimationFunc);

    /*
    * 순차 회전 애니메이션.
    *
    * INCREASE_TIME:
    *   각 SVG가 회전을 시작하는 시점 사이의 간격
    *
    * animationTime:
    *   각 SVG 한 개가 rotationAngle만큼 회전하는 데 걸리는 시간
    *
    * selectedAnimationFunc:
    *   SVG 회전과 path의 d 변경에 동시에 적용되는 timing-function
    *
    * 예:
    *   INCREASE_TIME = 500
    *   animationTime = 100
    *
    *   0번 SVG : 0ms 시작    -> 100ms 종료
    *   1번 SVG : 500ms 시작  -> 600ms 종료
    *   2번 SVG : 1000ms 시작 -> 1100ms 종료
    *
    * animationTime이 INCREASE_TIME보다 커져 애니메이션이 서로 겹치는 경우도
    * 하나의 requestAnimationFrame 흐름에서 함께 처리한다.
    */
    const totalAnimationTime = (shapeCount - 1) * INCREASE_TIME + animationTime;
    const stepProgress = new Float64Array(shapeCount);
    const dirtyPaths = new Uint8Array(shapeCount);
    let animationStartTime = null;

    function markPathsByLine(lineIndex) {
      dirtyPaths[(lineIndex - 1 + shapeCount) % shapeCount] = 1;
      dirtyPaths[lineIndex] = 1;
      dirtyPaths[(lineIndex + 1) % shapeCount] = 1;
    }

    function flushDirtyPaths() {
      for (let i = 0; i < shapeCount; i++) {
        if (!dirtyPaths[i]) continue;
        dirtyPaths[i] = 0;
        updatePath(i);
      }
    }

    function renderStep(stepIndex, rawProgress) {
      const easedProgress = animationEasing(rawProgress);
      const lineIndex = (stepIndex + 1) % shapeCount;

      setLineAngle(
        lineIndex,
        initialLineAngles[lineIndex] + rotationRadian * easedProgress
      );

      setCardAngle(
        stepIndex,
        initialCardAngles[stepIndex] + rotationAngle * easedProgress
      );

      markPathsByLine(lineIndex);
    }

    function animate(now) {
      /*
      * 첫 requestAnimationFrame의 timestamp를 시작 기준으로 사용한다.
      * 이전 v2에서 수정한 음수 elapsed 방지 방식도 그대로 유지한다.
      */
      if (animationStartTime === null) {
        animationStartTime = now;
      }

      const elapsed = Math.min(
        Math.max(now - animationStartTime, 0),
        totalAnimationTime
      );

      let hasActiveAnimation = false;
      let hasFutureAnimation = false;
      let nextStartTime = Infinity;

      for (let i = 0; i < shapeCount; i++) {
        const startTime = i * INCREASE_TIME;
        const endTime = startTime + animationTime;

        if (elapsed < startTime) {
          hasFutureAnimation = true;
          if (startTime < nextStartTime) nextStartTime = startTime;
          continue;
        }

        if (elapsed >= endTime) {
          /*
          * 프레임 드롭/백그라운드 탭 등으로 종료 프레임을 건너뛴 경우에도
          * 해당 SVG를 정확한 최종 상태로 한 번만 맞춘다.
          */
          if (stepProgress[i] < 1) {
            stepProgress[i] = 1;
            renderStep(i, 1);
          }
          continue;
        }

        hasActiveAnimation = true;

        const rawProgress = Math.min(
          Math.max((elapsed - startTime) / animationTime, 0),
          1
        );

        if (rawProgress !== stepProgress[i]) {
          stepProgress[i] = rawProgress;
          renderStep(i, rawProgress);
        }
      }

      /*
      * 같은 프레임에서 여러 경계선이 움직여도 각 path는 최대 한 번만 갱신한다.
      */
      flushDirtyPaths();

      if (!hasActiveAnimation && !hasFutureAnimation) {
        /*
        * 최종 상태에서는 모든 SVG의 상대 각도가 다시 동일하므로
        * 기본 d 값으로 복원해 불필요한 소수 좌표를 남기지 않는다.
        */
        for (let i = 0; i < shapeCount; i++) {
          paths[i].setAttribute("d", defaultPathValue);
        }
        return;
      }

      if (hasActiveAnimation) {
        requestAnimationFrame(animate);
        return;
      }

      /*
      * animationTime < INCREASE_TIME이면 애니메이션 사이에 대기 구간이 생긴다.
      * 그 시간 동안 requestAnimationFrame을 계속 돌리지 않고 다음 시작 직전에만 깨운다.
      */
      const waitTime = Math.max(nextStartTime - elapsed, 0);
      window.setTimeout(() => {
        requestAnimationFrame(animate);
      }, waitTime);
    }

    requestAnimationFrame(animate);

    // ============================================================================
    // ============================================================================
    // ============================================================================
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'gameCard.js error'
    );
  }
}
