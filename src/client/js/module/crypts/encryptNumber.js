import { encrypt } from '@/client/js/webRTC/rtcConn';
import throwObj from '@/client/js/module/errorHandler/throwObj';

// feistel32.js (ESM)
// 32비트 부호없는 정수만 처리: 0 <= n <= 0xFFFFFFFF
// secret이 같으면 항상 같은 치환 결과가 나오고, 복호화로 되돌릴 수 있습니다.

const toHex8 = (u32) => u32.toString(16).padStart(8, "0");
const fromHex8 = (hex8) => {
  if (!/^[0-9a-fA-F]{8}$/.test(hex8)) {
    // 8글자 HEX 필요
    throw throwObj('errorComn', 'number hex8 error.');
  };
  return parseInt(hex8, 16) >>> 0;
};

// 간단한 32비트 키 스케줄러 (Jenkins one-at-a-time 변형)
function keyWordsFromSecret(secret) {
  let h = 0;
  for (let i = 0; i < secret.length; i++) {
    h = (h + secret.charCodeAt(i)) >>> 0;
    h = (h + (h << 10)) >>> 0;
    h ^= (h >>> 6);
  }
  h = (h + (h << 3)) >>> 0;
  h ^= (h >>> 11);
  h = (h + (h << 15)) >>> 0;
  // 4개의 16비트 서브키
  return [
    h & 0xffff,
    (h >>> 16) & 0xffff,
    ((h * 0x9e37) & 0xffff) >>> 0,
    (((h ^ 0xa5a5) * 0x85eb) & 0xffff) >>> 0,
  ];
};

// 16비트 round 함수(가벼운 혼합, 암호학적으로 강하지 않음)
function F(r16, subkey, round) {
  let v = (r16 + subkey + (round * 0x9e37)) & 0xffff;
  v ^= (v << 7) & 0xffff;
  v ^= (v >>> 3);
  v = (v * 109) & 0xffff;
  return v;
};

export function encrypt32ToHex8(n, rounds = 8) {
  if (!Number.isInteger(n) || n < 0 || n > 0xFFFFFFFF) {
    // 0~2^32-1 범위의 정수만 지원;
    throw throwObj('errorComn', 'integer range error.');
  }
  let L = (n >>> 16) & 0xffff;
  let R = n & 0xffff;
  if (!encrypt.keypair) {
    throw throwObj('errorComn', 'decrypt number key error.');
  };
  const ks = keyWordsFromSecret(encrypt.keypair);

  for (let i = 0; i < rounds; i++) {
    const t = F(R, ks[i & 3], i);
    const newL = R;
    const newR = (L ^ t) & 0xffff;
    L = newL; R = newR;
  }
  const out = ((L << 16) | R) >>> 0;
  return toHex8(out);
};

export function decryptHex8To32(hex8, rounds = 8) {
  let v = fromHex8(hex8);
  let L = (v >>> 16) & 0xffff;
  let R = v & 0xffff;
  if (!encrypt.keypair) {
    throw throwObj('errorComn', 'decrypt number key error.');
  };
  const ks = keyWordsFromSecret(encrypt.keypair);

  for (let i = rounds - 1; i >= 0; i--) {
    const t = F(L, ks[i & 3], i);
    const newR = L;
    const newL = (R ^ t) & 0xffff;
    L = newL; R = newR;
  }
  return ((L << 16) | R) >>> 0;
};

// 16진수(문자열) → 10진수(숫자)
export function hexToDec(hexStr) {
  // 16진수 문자열을 10진수 정수로 변환
  return parseInt(hexStr, 16);
};

// 10진수(숫자) → 16진수(문자열)
export function decToHex(num, padLength = 0) {
  if (!Number.isInteger(num) || num < 0) {
    // 0 이상의 정수를 입력 필요
    throw throwObj('errorComn', 'number dec hex error.');
  };
  // padLength 지정 시 앞을 0으로 채워줌
  const hexStr = num.toString(16).padStart(padLength, "0");
  return "0x" + hexStr;
};
