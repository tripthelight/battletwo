export default (width) => {
  const w = width;
  const h = w + w / 2; // 세로 = 가로 + 가로/2

  // =========================
  // 얼굴 원
  // =========================
  const faceMargin = w / 5;              // 좌우/상단 여백
  const faceDiameter = w - faceMargin * 2;
  const faceRadius = faceDiameter / 2;

  const faceCx = w / 2;
  const faceCy = faceMargin + faceRadius;
  const faceBottom = faceMargin + faceDiameter;

  // =========================
  // 몸통 타원
  // =========================
  const bodyWidth = h;         // 몸통 가로 지름 = 세로 크기
  const bodyHeight = h * 0.85; // 몸통 세로 지름 = 세로 크기의 85%

  const bodyRx = bodyWidth / 2;
  const bodyRy = bodyHeight / 2;

  // 얼굴과 몸통 사이 여백
  const gap = w / 10; // = (가로 / 5) / 2

  // 몸통 맨 위 위치
  const bodyTop = faceBottom + gap;

  // 몸통 타원 중심
  const bodyCx = w / 2;
  const bodyCy = bodyTop + bodyRy;

  // =========================
  // SVG 안에서 보이는 몸통 부분만 path로 계산
  // =========================
  // y = h 에서 타원과 만나는 x좌표 계산
  const dy = h - bodyCy;
  const ratio = 1 - (dy * dy) / (bodyRy * bodyRy);
  const dx = ratio > 0 ? Math.sqrt(ratio) * bodyRx : 0;

  const leftX = bodyCx - dx;
  const rightX = bodyCx + dx;

  const bodyPath = [
    `M ${leftX} ${h}`,
    `A ${bodyRx} ${bodyRy} 0 0 1 ${rightX} ${h}`,
    `L ${w} ${h}`,
    `L 0 ${h}`,
    'Z'
  ].join(' ');

  // =========================
  // SVG 생성
  // =========================
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  // 배경
  const bg = document.createElementNS(svgNS, 'rect');
  bg.setAttribute('x', '0');
  bg.setAttribute('y', '0');
  bg.setAttribute('width', w);
  bg.setAttribute('height', h);
  bg.setAttribute('fill', '#d9d9d9');
  svg.appendChild(bg);

  // 얼굴
  const face = document.createElementNS(svgNS, 'circle');
  face.setAttribute('cx', faceCx);
  face.setAttribute('cy', faceCy);
  face.setAttribute('r', faceRadius);
  face.setAttribute('fill', '#000');
  svg.appendChild(face);

  // 몸통
  const body = document.createElementNS(svgNS, 'path');
  body.setAttribute('d', bodyPath);
  body.setAttribute('fill', '#000');
  svg.appendChild(body);

  return svg;
}
