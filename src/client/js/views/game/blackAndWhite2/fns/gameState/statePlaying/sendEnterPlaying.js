import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/blackAndWhite2/request';
import { getStyle } from '@/client/js/functions/comnExport';

export default function () {
  console.log("PLAYING 진입 >>>>>>>>>>>>>>>>>>>> ");
  // 나는 gameState playing으로 왔어
  // 너의 gameState를 보내줘
  // request("enterPlayingSend", { enter: true });

  const container = document.getElementById("container");
  if (!container) throw throwObj('elementLoss', 'sendEnterPlaying.js - container element failed.');
  const gameScene = document.getElementById("gameScene");
  if (!gameScene) throw throwObj('elementLoss', 'sendEnterPlaying.js - gameScene element failed.');

  const WW = document.body.clientWidth;
  const WH = document.body.clientHeight;

  // ready 단계에서 사용했던 모든 element 제거
  gameScene.replaceChildren();


  /** =========================================================
   * 상단 -
   * Round
   * 메모장 open 아이콘
   */
  // Round element
  const roundBlock = document.createElement("div");
  roundBlock.classList.add('round-block');

  // dot line element
  const dotLine = document.createElement("span");
  dotLine.classList.add('dot-line');
  roundBlock.appendChild(dotLine);

  // round num element
  for (let i = 0; i < 9; i++) {
    const r = document.createElement("dl");
    const dot = document.createElement("dt");
    const num = document.createElement("dd"); // 1R 2R 3R ... 9R
    num.innerText = `${ i + 1 }R`;
    r.appendChild(dot);
    r.appendChild(num);
    roundBlock.appendChild(r);
  }
  gameScene.appendChild(roundBlock);

  void gameScene.offsetHeight;

  const allowPos = [];
  const lr = [];
  const rndEls = document.querySelectorAll('.round-block dl');
  for (let i = 0; i < rndEls.length; i++) {
    const rndEl = rndEls[i];
    const posX = rndEl.offsetLeft;
    const w = rndEl.clientWidth;
    const pos = posX + w / 2;
    allowPos.push(Math.round(pos));
    if (i === 0 || i === rndEls.length - 1) lr.push(Math.round(w / 2));
  }

  // round line width
  const PB = getStyle(roundBlock, 'padding-left');
  const PR = getStyle(roundBlock, 'padding-right');
  const lineWidth = WW - PB - PR - lr[0] - lr[1];
  document.documentElement.style.setProperty('--round-dot-line-width', `${ lineWidth }px`);


  /** =========================================================
   * 중간 -
   * 표시등
   * 닉네임
   * Score
   * 검/흰 표시
   */


  /** =========================================================
   * 하단 -
   * POINT 입력 INPUT
   */


  /** =========================================================
   * INFO MODAL POPUP
   * 상대 제시 포인트 흑/백 중 알림
   * 상대/당신 이겼습니다/졌습니다.
   */


  // ///////////////////////////////////////////////////////////
  LOADING_EVENT.hide();
};
