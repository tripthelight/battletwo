// 영문, 숫자 복호화 - 한글은 안됨
function safeBase64Decode(str) {
  try {
    return atob(str);
  } catch (e) {
    console.error('유효하지 않은 Base64:', e);
    return null;
  }
};
// 영문, 숫자 암호화 - 한글은 안됨
function safeBase64Encode(str) {
  try {
    return btoa(str);
  } catch (e) {
    // Unicode 문제일 가능성
    return btoa(unescape(encodeURIComponent(str)));
  }
};
// btoa / atob 암복호호 사용예시
// const eStr = safeBase64Encode(36); // 암호화
// console.log(eStr);
// const dStr = safeBase64Decode(eStr); // 복호화
// console.log(parseInt(dStr));
// console.log(dStr);

// 숫자 복호화
const dn = (n) => parseInt(safeBase64Decode(n));

export { safeBase64Decode, safeBase64Encode, dn };