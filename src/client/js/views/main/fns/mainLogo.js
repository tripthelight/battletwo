import GAME_LIST from '@/client/js/webpack/JSON/gameList.json';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'mainLogo.js - container element failed.');
    const cardWrap = container.querySelector(".game-cards");
    if (!cardWrap) throw throwObj('elementLoss', 'mainLogo.js - .game-cards element failed.');
    const mainLogoWrap = container.querySelector(".main-logo");
    if (!mainLogoWrap) throw throwObj('elementLoss', 'mainLogo.js - .main-logo element failed.');
    const mainLogoSVG = mainLogoWrap.querySelector("SVG");
    if (!mainLogoSVG) throw throwObj('elementLoss', 'mainLogo.js - .main logo SVG element failed.');

    const gameList = GAME_LIST.gameList;

    function getBlankAreaSize() {
      const shapeCount = gameList.length;
      if (shapeCount < 3) throw throwObj('dataManipulation', 'mainLogo.js game list length failed.');
      const cardSVG = cardWrap.querySelector(".card");
      if (!cardSVG) return null;

      const viewBox = cardSVG.viewBox.baseVal;
      const WW = viewBox.width;
      const WH = viewBox.height;
      const centerX = viewBox.x + WW / 2;
      const centerY = viewBox.y + WH / 2;
      const blankMargin = WW > WH ? Math.round(WW / 20) : Math.round(WH / 20);
      const angle = 360 / shapeCount;
      const polygonRadius = blankMargin / Math.cos(Math.PI / shapeCount);
      const startAngle = shapeCount % 2 === 0 ? -90 - angle / 2 : -90;
      const screenMatrix = cardSVG.getScreenCTM();
      if (!screenMatrix) return null;

      function toScreenPoint(x, y) {
        const point = new DOMPoint(x, y).matrixTransform(screenMatrix);
        return {
          x: point.x,
          y: point.y,
        };
      }

      const center = toScreenPoint(centerX, centerY);
      const polygonPoints = [];
      for (let i = 0; i < shapeCount; i++) {
        const rad = (startAngle + i * angle) * Math.PI / 180;
        polygonPoints.push(
          toScreenPoint(
            centerX + Math.cos(rad) * polygonRadius,
            centerY + Math.sin(rad) * polygonRadius
          )
        );
      }

      let safeRadius = Infinity;

      for (let i = 0; i < shapeCount; i++) {
        const a = polygonPoints[i];
        const b = polygonPoints[(i + 1) % shapeCount];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const distance = Math.abs(dy * (center.x - a.x) - dx * (center.y - a.y)) / Math.hypot(dx, dy);
        safeRadius = Math.min(safeRadius, distance);
      }

      return {
        safeDiameter: safeRadius * 2
      };
    }

    const { safeDiameter } = getBlankAreaSize();
    if (!safeDiameter) throw throwObj('dataManipulation', 'mainLogo.js safeDiameter failed.');
    const logoSize = Math.round(Math.round(safeDiameter) * 0.7); // LOGO의 width, height는 70%
    document.documentElement.style.setProperty('--main-logo-size', `${ logoSize }px`);

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'mainLogo.js error'
    );
  }
}
