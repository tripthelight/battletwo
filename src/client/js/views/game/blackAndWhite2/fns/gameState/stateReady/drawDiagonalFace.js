import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import getAverageColors from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/getAverageColors';
import createDiagonalFaceSvg from '@/client/js/views/game/blackAndWhite2/fns/gameState/stateReady/createDiagonalFaceSvg';
import { request } from '@/client/js/network/blackAndWhite2/request';

export default () => {
  try {
    // 내 닉네임을 상대에게 전달
    request('providingNick', {
      nick: storageMethod('l', 'GET_ITEM', 'localPlayer'),
    });

    // 첫입장 대기자(polite)가 random 함수로 선플레이어 결정

    // 상대에게 선플레이어 닉네임 전달

    // 브라우저 화면에 `First Player` 노출

    // statePlaying 단계로 진입

    /*
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
    */

  } catch(error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'drawDiagonalFace.js error'
    );
  }
}
