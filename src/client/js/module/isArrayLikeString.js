/**
 * 문자열 배열을 받아서 문자열이 배열 형식인지 체크
 * 단순 모양이 아니라 실제로 파싱 가능한지 확인
 * 파싱 결과가 진짜 배열인지 확인
 * @param {string} str 문자열 배열
 * @returns 문자열 배열이 맞으면 true
 */
export default (str) => {
  if (typeof str !== 'string') return false;

  try {
    const parsed = JSON.parse(str.replace(/'/g, '"'));
    return Array.isArray(parsed);
  } catch {
    return false;
  }
};
