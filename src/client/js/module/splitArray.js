/* export default (str, spl) => {
  return str.split(spl)
    .filter(Boolean)
    .map(s => s + spl);
} */

/**
 * 길이 프리픽스(length-prefix) 프레이밍 (가장 견고)
 * 각 요소를 길이:내용 형태로 이어 붙입니다. 내용에 어떤 문자가 있어도 길이로 잘라 복원 가능해서 매우 안정적입니다.
 * pack :
  - ["hello", "b|b", "줄\n바꿈", "123:456"] => "5:hello3:b|b5:줄\n바꿈7:123:456"
 * unpack :
  - "5:hello3:b|b5:줄\n바꿈7:123:456" => ["hello", "b|b", "줄\n바꿈", "123:456"]
 */

/**
 * 문자열 배열을 받아서 문자열의 숫자: 문자열 방식으로 한문장으로 변환
 * @param {Array<string>} arr payload 문자열 배열
 * @returns {string} 문자열 배열을 한문장으로 병합
 */
function pack(arr) {
  return arr
    .map((s) => {
      s = String(s);
      return `${s.length}:${s}`;
    })
    .join('');
}

/**
 * 문자열을 받아서 원래 배열로 변환
 * @param {string} str payload 문자열 배열을 한문장 문자열로 바꾼 문자열
 * @returns {Array<string>} 원래 배열로 변환
 */
function unpack(str) {
  const out = [];
  let i = 0;

  while (i < str.length) {
    const colon = str.indexOf(':', i);
    if (colon === -1) throw new Error('Invalid format');

    const len = Number(str.slice(i, colon));
    if (!Number.isFinite(len)) throw new Error('Invalid length');

    const start = colon + 1;
    const end = start + len;
    out.push(str.slice(start, end));
    i = end;
  }

  return out;
}

// ✅ 사용 예시
// const arr = ["hello", "b|b", "줄\n바꿈", "123:456"];
// const packed = pack(arr);
// const unpacked = unpack(packed);
// console.log(packed);
// console.log(unpacked);

export { pack, unpack };
