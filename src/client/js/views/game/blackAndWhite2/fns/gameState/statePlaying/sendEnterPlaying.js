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

import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import { request } from '@/client/js/network/blackAndWhite2/request';
import { getStyle } from '@/client/js/functions/comnExport';
import createEmptyProfileSvg from '@/client/js/views/game/blackAndWhite2/fns/gameState/statePlaying/createEmptyProfileSvg';
import calculateFontSize from '@/client/js/views/game/blackAndWhite2/fns/gameState/statePlaying/calculateFontSize';

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
   * 상단 -----------------------------------------------------
   * Round
   * 메모장 open 아이콘
   */
  function drawRoundBlock() {
    const data = {
      roundBlock: {
        w: 0,
      },
      line: {
        l: 0, // line start position
        r: 0, // line end position
        pl: 0, // line left padding
        pr: 0, // line right padding
        w: 0 // line width
      },
      allow: {
        pos: [], // round allow position array
        size: {
          w: 0,
          h: 0,
        },
        d: {
          t: '', // top path d
          b: '', // bottom path d
        },
      }
    };

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

    const rndEls = document.querySelectorAll('.round-block dl');
    for (let i = 0; i < rndEls.length; i++) {
      const rndEl = rndEls[i];
      const posX = rndEl.offsetLeft;
      const w = rndEl.clientWidth;
      const pos = posX + w / 2;
      data.allow.pos.push(Math.round(pos));
      if (i === 0) {
        data.allow.size.w = Math.round(w + (w / 2));
        data.allow.size.h = Math.round((data.allow.size.w / 2) + ((data.allow.size.w / 2) / 2))
        data.line.l = Math.round(w / 2);
      }
      if (i === rndEls.length - 1) data.line.r = Math.round(w / 2);
    }

    // round-block width
    data.roundBlock.w = WW > 500 ? 500 : WW; // round-block max-width: 500
    document.documentElement.style.setProperty('--round-block-w', `${ data.roundBlock.w }px`);

    // round line width
    data.line.pb = getStyle(roundBlock, 'padding-left');
    data.line.pr = getStyle(roundBlock, 'padding-right');
    data.line.w = data.roundBlock.w - data.line.pb - data.line.pr - data.line.l - data.line.r;
    document.documentElement.style.setProperty('--round-dot-line-width', `${ data.line.w }px`);

    void gameScene.offsetHeight;

    // round allow
    const roundAllowSVG = document.createElementNS(SVG_NS, "svg");
    const allowTopPath = document.createElementNS(SVG_NS, "path"); // 화살표의 위쪽
    const allowBotPath = document.createElementNS(SVG_NS, "path"); // 화살표의 아랫쪽

    const aw = data.allow.size.w;
    const awHarf = Math.round(aw / 2);
    const awDived = Math.round(aw / 8);
    const awBlank = Math.round(awDived / 2);

    allowTopPath.setAttribute('d',`
      M0,0
      L${ awDived },0
      L${ awHarf },${ awHarf - awDived }
      L${ aw - awDived },0
      L${ aw },0
      L${ awHarf },${ awHarf }
      Z
    `);
    allowBotPath.setAttribute('d',`
      M0,${ awDived + awBlank }
      L${ awDived },${ awDived + awBlank }
      L${ awHarf },${ awHarf - awDived + awDived + awBlank }
      L${ aw - awDived },${ awDived + awBlank }
      L${ aw },${ awDived + awBlank }
      L${ awHarf },${ awHarf + awDived + awBlank }
      Z
    `);

    allowTopPath.classList.add('t');
    allowBotPath.classList.add('b');

    data.allow.size.h = awHarf + awDived + awBlank;

    roundAllowSVG.setAttribute('width', `${ data.allow.size.w }`);
    roundAllowSVG.setAttribute('height', `${ data.allow.size.h }`);
    roundAllowSVG.setAttribute('viewBox', `0 0 ${ data.allow.size.w } ${ data.allow.size.h }`);
    roundAllowSVG.classList.add("round-allow");

    document.documentElement.style.setProperty('--round-allow-l', `${ data.allow.pos[0] - data.allow.size.w / 2 }px`);
    document.documentElement.style.setProperty('--round-allow-w', `${ data.allow.size.w }px`);
    document.documentElement.style.setProperty('--round-allow-h', `${ data.allow.size.h }px`);
    document.documentElement.style.setProperty('--round-block-pt', `${ data.allow.size.h + 6 }px`);

    roundAllowSVG.appendChild(allowTopPath);
    roundAllowSVG.appendChild(allowBotPath);
    roundBlock.appendChild(roundAllowSVG);
  };
  drawRoundBlock();


  /** =========================================================
   * 중간 -----------------------------------------------------
   * 표시등 // drawIndicatorLight
   * 닉네임 // drawNickIcon
   * Score
   * 검/흰 표시
   */
  function drawGameElem() {
    // --------------------------------------------------------------------
    // 표시등 그리기
    // --------------------------------------------------------------------

    const indicatorBlock = document.createElement('div');
    indicatorBlock.classList.add('indicator-block');
    const indicatorLocal = document.createElement('div');
    indicatorLocal.classList.add('local');
    const indicatorRemote = document.createElement('div');
    indicatorRemote.classList.add('remote');

    for (let i = 0; i < 5; i++) {
      const blockEl = document.createElement('span');
      blockEl.classList.add('active');
      const min = 80 - i * 20;
      const max = 99 - i * 20;
      blockEl.textContent = `${min} ~ ${max}`;
      indicatorLocal.appendChild(blockEl.cloneNode(true));
      indicatorRemote.appendChild(blockEl);
    }
    indicatorBlock.append(indicatorLocal, indicatorRemote);
    gameScene.appendChild(indicatorBlock);

    void gameScene.offsetHeight;

    // --------------------------------------------------------------------
    // 닉네임 썸네일 그리기
    // --------------------------------------------------------------------
    const indicatorWrap = document.querySelector('.indicator-block');
    const indicatorHeight = indicatorWrap.clientHeight;
    const plEl = indicatorWrap.querySelector('.local');
    const pl = plEl.clientWidth;
    document.documentElement.style.setProperty('--nick-thumb-pl', `${ pl }px`);
    const prEl = indicatorWrap.querySelector('.remote');
    const pr = prEl.clientWidth;
    document.documentElement.style.setProperty('--nick-thumb-pr', `${ pr }px`);

    const nickBasicWidth = Math.floor((WW - pl - pr) / 2);
    const nickMaxWidth = (indicatorHeight / 5) * 2;
    const nickWidth = nickBasicWidth > nickMaxWidth ? nickMaxWidth : nickBasicWidth;

    const nickThumbBlock = document.createElement('div');
    nickThumbBlock.classList.add('nick-thumb-block');
    const nickThumbLocal = document.createElement('div');
    nickThumbLocal.classList.add('local');
    const nickThumbRemote = document.createElement('div');
    nickThumbRemote.classList.add('remote');

    const localIconSVG = createEmptyProfileSvg(nickWidth);
    const remoteIconSVG = createEmptyProfileSvg(nickWidth);

    nickThumbLocal.appendChild(localIconSVG);
    nickThumbRemote.appendChild(remoteIconSVG);

    nickThumbBlock.append(nickThumbLocal, nickThumbRemote);
    gameScene.appendChild(nickThumbBlock);

    void gameScene.offsetHeight;

    // --------------------------------------------------------------------
    // 닉네임 텍스트
    // --------------------------------------------------------------------
    const nickLocal = findNickname('localPlayer'); // localNick
    const nickRemote = fromUnicodePoints(
      parsePayloadToHex(
        storageMethod("s", "GET_ITEM", findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]))  // enemyNick
      )
    );
    const nickTxtLocal = document.createElement('div');
    nickTxtLocal.classList.add('local-nick');
    nickTxtLocal.innerText = nickLocal;
    const nickTxtRemote = document.createElement('div');
    nickTxtRemote.classList.add('remote-nick');
    nickTxtRemote.innerText = nickRemote;

    // const nickFontSize = nickWidth / Math.max(...[nickLocal, nickRemote].map(str => str.length));
    const nickFontSize = calculateFontSize(
      [nickLocal, nickRemote].reduce((max, str) => str.length > max.length ? str : max), // 두 Peer 중 더 긴 nickname
      nickWidth
    );
    document.documentElement.style.setProperty('--nick-font-size', `${ Math.floor(nickFontSize) }px`);

    nickThumbLocal.appendChild(nickTxtLocal);
    nickThumbRemote.appendChild(nickTxtRemote);


    void gameScene.offsetHeight;

    // --------------------------------------------------------------------
    // Score 그리기
    // --------------------------------------------------------------------
    const scoreLocal = document.createElement('div');
    scoreLocal.classList.add('local-score');
    scoreLocal.innerHTML = 0;
    const scoreRemote = document.createElement('div');
    scoreRemote.classList.add('remote-score');
    scoreRemote.innerHTML = 0;

    const indicatorEl = document.querySelector('.indicator-block');
    const nickEl = document.querySelector('.nick-thumb-block');

    const scoreFontSize = Math.floor(indicatorEl.clientHeight - nickEl.clientHeight)
    document.documentElement.style.setProperty('--score-font-size', `${ scoreFontSize }px`);


    nickThumbLocal.appendChild(scoreLocal);
    nickThumbRemote.appendChild(scoreRemote);



  };
  drawGameElem();


  /** =========================================================
   * 하단 -----------------------------------------------------
   * POINT 입력 INPUT
   */


  /** =========================================================
   * INFO MODAL POPUP -----------------------------------------
   * 상대 제시 포인트 흑/백 중 알림
   * 상대/당신 이겼습니다/졌습니다.
   */


  // ///////////////////////////////////////////////////////////
  LOADING_EVENT.hide();
};
