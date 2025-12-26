import cardNumCodeDecryption from '@/client/js/functions/bcrypt/cardNumCodeDecryption';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import flipUserCardCheck from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipUserCardCheck';
import imgSetCardNum from '@/client/js/views/game/indianPocker/fns/common/images/setCards';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_target, _num) => {
  // 명령
  const findCardNumb = cardNumCodeDecryption(_num);

  // ===================================================================

  const SVG_NS = 'http://www.w3.org/2000/svg';

  // ///////////////////////////////////////////////////////////////

  const WW = window.innerWidth;
  const WH = window.innerHeight;
  const svg_path = document.createElementNS(SVG_NS, 'svg');
  svg_path.setAttribute('width', WW);
  svg_path.setAttribute('height', WH);
  svg_path.setAttribute('viewBox', `0 0 ${WW} ${WH}`);
  // path
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('stroke', '#000');
  path.setAttribute('stroke-width', '1');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');
  // Mx y Hx Lx y Hx
  path.setAttribute(
    'd',
    `
      M100,100 L150,150 L150,200
      A50,50 0 1,0 100,120
      Q20,250 200,300
      C255,350 375,350 400,300
    `,
  );
  // 조립
  svg_path.appendChild(path);
  document.body.appendChild(svg_path);

  // ///////////////////////////////////////////////////////////////
  const makeSvgCircle = (cx, cy) => {
    const svg_circle = document.createElementNS(SVG_NS, 'svg');
    svg_circle.setAttribute('width', WW);
    svg_circle.setAttribute('height', WH);
    svg_circle.setAttribute('viewBox', `0 0 ${WW} ${WH}`);
    const circle = document.createElementNS(SVG_NS, 'circle');
    circle.setAttribute('cx', cx.toString());
    circle.setAttribute('cy', cy.toString());
    circle.setAttribute('r', '3');
    circle.setAttribute('fill', '#0000ff');
    svg_circle.appendChild(circle);
    document.body.appendChild(svg_circle);
  };
  makeSvgCircle(20, 250);
  makeSvgCircle(225, 350);
  makeSvgCircle(375, 350);

  // ===================================================================

  _target.setAttribute('src', imgSetCardNum(findCardNumb));

  const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
  const encryptVal = window.sessionStorage.getItem(encryptKey);

  // 상대가 선택하기 전이 아니라면 값 복호화
  /* const safeRemoteNum = (() => {
    if (encryptVal === '') return encryptVal;
    try {
      return cardNumCodeDecryption(encryptVal);
    } catch (error) {
      console.log('error : ', error);
      throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
    }
  })(); */

  // request('choiceFirst', { eNum: findCardNumb, pNum: safeRemoteNum });
  request('choiceFirst', { eNum: _num, pNum: encryptVal });

  // if (encryptVal !== '') {
  //   flipUserCardCheck({ pNum: findCardNumb, eNum: safeRemoteNum });
  // }
};
