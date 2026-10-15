/**
 * #000000과 #999999 사이에서 n개의 중간 컬러 코드를 생성합니다.
 * @param {number} count - 생성할 컬러 코드의 개수
 * @returns {string[]} HEX 컬러 코드 배열
 */
export default (count) => {
  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.replace('#', ''), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  };

  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = Math.round(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  const c1 = hexToRgb('#000000');
  const c2 = hexToRgb('#222222');
  const result = [];

  for (let i = 1; i <= count; i++) {
    const ratio = i / (count + 1);
    const r = c1[0] + (c2[0] - c1[0]) * ratio;
    const g = c1[1] + (c2[1] - c1[1]) * ratio;
    const b = c1[2] + (c2[2] - c1[2]) * ratio;
    result.push(rgbToHex(r, g, b));
  }

  return result;
};
