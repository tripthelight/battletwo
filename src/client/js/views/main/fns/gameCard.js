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
      const currentAngle = (startAngle + i * angle) * Math.PI / 180;
      polygonPoints.push({
        x: centerX + Math.cos(currentAngle) * polygonRadius,
        y: centerY + Math.sin(currentAngle) * polygonRadius,
      });
    }

    /*
    * 화면보다 충분히 멀리 path를 연장한다.
    *
    * SVG 자체를 회전시키기 때문에
    * 화면 모서리까지 반드시 덮도록
    * 대각선 길이보다 훨씬 크게 잡는다.
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
    * 기본 SVG 한 개의 path를 만든다.
    *
    *
    *                  farPoint2
    *                     /
    *                    /
    *                   B
    *                  /
    *       중앙 빈공간
    *                /
    *               A
    *              /
    *             /
    *       farPoint1
    *
    *
    * A -> B는 중앙 정N각형의 한 변이다.
    *
    * A에서는 A-B 방향으로 바깥까지 연장하고,
    * B에서는 B-C의 반대 방향으로 바깥까지 연장한다.
    *
    * 이 path를 angle만큼 계속 회전시키면
    * 첨부 이미지처럼 중앙 정N각형만 비게 된다.
    */
    function pathValue() {
      const A = polygonPoints[0];
      const B = polygonPoints[1];
      const C = polygonPoints[2];

      /*
      * 첫 번째 경계선
      *
      * B -> A 방향으로 연장
      */
      const ray1 = normalize(
        A.x - B.x,
        A.y - B.y
      );

      /*
      * 두 번째 경계선
      *
      * C -> B 방향으로 연장
      */
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

    /*
    * 기존 SVG 제거
    */
    cardWrap.replaceChildren();
    const d = pathValue();

    /*
    * gameList 개수만큼 동일한 기본 SVG를 만든 후
    * 화면 중심을 기준으로 angle만큼 회전시킨다.
    */
    for (let i = 0; i < shapeCount; i++) {
      const increaseAngle = i * angle;
      const cardSVG = document.createElementNS(svgNS, "svg");
      const path = document.createElementNS(svgNS, "path");
      cardSVG.setAttribute("viewBox", `0 0 ${WW} ${WH}`);
      cardSVG.setAttribute("width", String(WW));
      cardSVG.setAttribute("height", String(WH));

      /*
      * gameList 값 자체를 class로 부여한다.
      *
      * 예:
      * <svg class="card shape1">
      */
      cardSVG.classList.add("card", gameList[i]);

      /*
      * path는 viewBox 바깥까지 길게 뻗어 있으므로
      * overflow: visible이 필요하다.
      */
      Object.assign(cardSVG.style, { transform: `rotate(${increaseAngle}deg)`});
      path.setAttribute("d", d);
      path.classList.add("shape-path");
      /*
      * 이벤트 발생 시
      * 어떤 도형인지 구분하기 위한 값
      */
      path.dataset.index = i;
      path.dataset.shape = gameList[i];

      cardSVG.appendChild(path);
      cardWrap.appendChild(cardSVG);
    }
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
