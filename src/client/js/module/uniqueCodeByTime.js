/**
 * 현재 시, 분, 초 정보를 salt로 활용하여 매 시분초마다 달라지는 10자리 영문 대문자 문자열을 반환
 */
export default () => {
  const now = new Date();
  const salt = `${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  // 간단한 해시 함수: HMAC 대신 내부에서 의도적으로 중복 가능성 줄이기
  let hash = 0;
  for (let i = 0; i < salt.length; i++) {
    hash = (hash << 5) - hash + salt.charCodeAt(i);
    hash |= 0; // 32bit 변환
  }

  // 해시 값을 양수로 변환
  const seed = Math.abs(hash);

  // seed를 바탕으로 영문 대문자 10자리 생성
  const A_CODE = 'A'.charCodeAt(0);
  let result = '';
  let current = seed;

  for (let i = 0; i < 10; i++) {
    current = (current * 31 + i) % 26; // 0 ~ 25
    result += String.fromCharCode(A_CODE + current);
  }

  return result;
};
