import throwObj from '@/client/js/module/errorHandler/throwObj';
import getAverageColors from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/getAverageColors';
import createDiagonalFaceSvg from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/createDiagonalFaceSvg';

export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'drawDiagonalFace.js - container element failed.');
    const gameScene = document.getElementById("gameScene");
    if (!gameScene) throw throwObj('elementLoss', 'drawDiagonalFace.js - gameScene element failed.');

    const ww = document.body.clientWidth;
    const wh = document.body.clientHeight;

    const divLength = 8;
    const fillColors = getAverageColors(divLength);
    const topPoint = Math.floor(Math.random() * ww);
    const bottomPoint = ww - topPoint;

    const wrapperSVG = createDiagonalFaceSvg(
      topPoint,
      bottomPoint,
      wh,
      fillColors
    );

    gameScene.appendChild(wrapperSVG);

  } catch(error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'drawDiagonalFace.js error'
    );
  }
}
