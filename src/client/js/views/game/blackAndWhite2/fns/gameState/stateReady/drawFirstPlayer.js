import { SVG_NS } from '@/client/js/functions/variable';
import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import findNickname from '@/client/js/functions/findNickname';
import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';
import { request } from '@/client/js/network/blackAndWhite2/request';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import blackAndWhite2GameState from '@/client/js/gameState/blackAndWhite2';

/**
 * 선플레이어 그리기
 */
export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'drawFirstPlayer.js - container element failed.');
    const gameScene = document.getElementById("gameScene");
    if (!gameScene) throw throwObj('elementLoss', 'drawFirstPlayer.js - gameScene element failed.');

    /** ===========================================================================================
     * first Player 찾기
     */
    const encryptKey1 = findCharCode([86, 88, 85, 83, 90, 65, 84, 70, 78, 69]); // firstUser
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

    // 첫 선 플레이어 닉네임
    const firstPlayerNick =
      X.dec(encryptVal1) ?
      findNickname('localPlayer') :
      fromUnicodePoints(
        parsePayloadToHex(
          storageMethod("s", "GET_ITEM", findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]))  // enemyNick
        )
      );

    /** ===========================================================================================
     * 배경 네모 그리기
     */
    const WW = document.body.clientWidth;
    const WH = document.body.clientHeight;
    const rectangles = [];
    for (let i = 0; i < 10; i++) {
      const el = document.createElement('div');
      el.classList.add(
        'rectangle',
        i % 2 === 0 ? 'even' : 'odd'
      );

      gameScene.appendChild(el);

      rectangles.push({
        el,
        opacity: (Math.floor(Math.random() * 3) + 2) / 10,
        height: Math.floor(Math.random() * WH)
      });
      // el.style.opacity = (Math.floor(Math.random() * 3) + 2) / 10; // 0.2 ~ 0.4
      // el.style.height = Math.floor(Math.random() * WH) + 'px';
    }

    void gameScene.offsetHeight;

    let duration = 1;
    // 목표 스타일 적용
    for (const { el, opacity, height } of rectangles) {
      el.style.opacity = opacity;
      el.style.height = `${height}px`;
      duration -= 0.05;
      document.documentElement.style.setProperty('--rectangle-transition-duration', `${duration}s`);
    }

    /** ===========================================================================================
     * first player 보여주기
     */
    document.documentElement.style.setProperty('--first-player-text-size', `20px`);

    const textBlock = document.createElement("div");
    textBlock.classList.add("first-player-block");
    const textTitle = document.createElement("span");
    textTitle.classList.add("first-player", "text-title");
    textTitle.innerText = 'First Player';
    const textNick = document.createElement("span");
    textNick.classList.add("first-player", "text-nick");
    textNick.innerText = firstPlayerNick;

    textBlock.appendChild(textTitle);
    textBlock.appendChild(textNick);
    gameScene.appendChild(textBlock);

    /** ===========================================================================================
     * 다음 버튼 그리기
     */
    const btnNextSVG = document.createElementNS(SVG_NS, "svg");
    const side = 30;
    const btnHeight = (side * Math.sqrt(3)) / 2;

    document.documentElement.style.setProperty('--go-state-playing-top', `${textBlock.clientHeight * 1.2}px`);
    // document.documentElement.style.setProperty('--go-state-playing-left', `${diagonalHalf / 2}px`);

    btnNextSVG.setAttribute('width', `${btnHeight}`);
    btnNextSVG.setAttribute('height', `${side}`);
    btnNextSVG.setAttribute('viewBox', `0 0 ${btnHeight} ${side}`);
    btnNextSVG.setAttribute('aria-label', 'button');
    btnNextSVG.classList.add("btn-next", "go-state-playing");

    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute('d',`
      M0,0
      L0,${side}
      L${btnHeight},${btnHeight / 2}
      Z
    `);

    btnNextSVG.appendChild(path);
    gameScene.appendChild(btnNextSVG);

    /** ===========================================================================================
     * 다음 버튼 click
     */
    btnNextSVG.onclick = () => {
      LOADING_EVENT.show();

      storageMethod("s", "SET_ITEM",
        findCharCode([90, 67, 66, 79, 89, 70, 86, 76, 71, 72]), // localReady
        X.enc(decodeTF(_t([115, 109, 114, 110]))) // "smrn" : true
      );

      // 나는 다음 STEP으로 갈 준비가 되었다는 신호를 상대 Peer에게 보냄
      request('goNextStep', {
        ready: _t([115, 109, 114, 117]), // "smru" : true,
      });

      const encryptKey1 = findCharCode([84, 79, 80, 68, 70, 86, 82, 87, 85, 74]) // remoteReady key
      const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
      if (!encryptVal1 || encryptVal1 === "") {
        // 상대 Peer의 Ready 대기
      } else {
        if (X.dec(encryptVal1)) {
          // *** 다음 STEP 진행 전 ready sessionStorage 제거
          storageMethod('s', 'REMOVE_ARR', '', '', [
            findCharCode([90, 67, 66, 79, 89, 70, 86, 76, 71, 72]), // localReady
            findCharCode([84, 79, 80, 68, 70, 86, 82, 87, 85, 74]), // remoteReady key
          ]);
          // *** 다음 STEP 진행
          blackAndWhite2GameState.playing();
        } else {
          throw throwObj('sessionStorageLoss', 'drawFirstPlayer.js remoteReady sessionStorage key manipulat.');
        }
      }
    }
  } catch(error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? 'drawFirstPlayer.js error');
  }
}
