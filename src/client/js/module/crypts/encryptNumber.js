// import { encrypt } from '@/client/js/webRTC/rtcConn';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

// feistel32.js (ESM)
// 32비트 부호없는 정수만 처리: 0 <= n <= 0xFFFFFFFF
// secret이 같으면 항상 같은 치환 결과가 나오고, 복호화로 되돌릴 수 있습니다.

const toHex8 = (u32) => u32.toString(16).padStart(8, '0');
const fromHex8 = (hex8) => {
  if (!/^[0-9a-fA-F]{8}$/.test(hex8)) {
    // 8글자 HEX 필요
    throw throwObj('errorComn', 'number hex8 error.');
  }
  return parseInt(hex8, 16) >>> 0;
};

// 간단한 32비트 키 스케줄러 (Jenkins one-at-a-time 변형)
function keyWordsFromSecret(secret) {
  let h = 0;
  for (let i = 0; i < secret.length; i++) {
    h = (h + secret.charCodeAt(i)) >>> 0;
    h = (h + (h << 10)) >>> 0;
    h ^= h >>> 6;
  }
  h = (h + (h << 3)) >>> 0;
  h ^= h >>> 11;
  h = (h + (h << 15)) >>> 0;
  // 4개의 16비트 서브키
  return [h & 0xffff, (h >>> 16) & 0xffff, ((h * 0x9e37) & 0xffff) >>> 0, (((h ^ 0xa5a5) * 0x85eb) & 0xffff) >>> 0];
}

// 16비트 round 함수(가벼운 혼합, 암호학적으로 강하지 않음)
function F(r16, subkey, round) {
  let v = (r16 + subkey + round * 0x9e37) & 0xffff;
  v ^= (v << 7) & 0xffff;
  v ^= v >>> 3;
  v = (v * 109) & 0xffff;
  return v;
}

export function encrypt32ToHex8(n, rounds = 8) {
  if (!Number.isInteger(n) || n < 0 || n > 0xffffffff) {
    // 0~2^32-1 범위의 정수만 지원;
    throw throwObj('errorComn', 'encrypt32ToHex8 - integer range error.');
  }
  let L = (n >>> 16) & 0xffff;
  let R = n & 0xffff;
  // if (!encrypt.keypair) {
  if (!KEY.keypair) {
    throw throwObj('errorComn', 'decrypt number key error.');
  }
  console.log("KEY 찾냐 ? >>>>>>>>> encrypt32ToHex8 ");

  // const ks = keyWordsFromSecret(encrypt.keypair);
  const ks = keyWordsFromSecret(KEY.keypair);

  for (let i = 0; i < rounds; i++) {
    const t = F(R, ks[i & 3], i);
    const newL = R;
    const newR = (L ^ t) & 0xffff;
    L = newL;
    R = newR;
  }
  const out = ((L << 16) | R) >>> 0;
  return toHex8(out);
}

export function decryptHex8To32(hex8, rounds = 8) {
  let v = fromHex8(hex8);
  let L = (v >>> 16) & 0xffff;
  let R = v & 0xffff;
  // if (!encrypt.keypair) {
  if (!KEY.keypair) {
    throw throwObj('errorComn', 'decrypt number key error.');
  }
  console.log("KEY 찾냐 ? >>>>>>>>> decryptHex8To32 ");
  // const ks = keyWordsFromSecret(encrypt.keypair);
  const ks = keyWordsFromSecret(KEY.keypair);

  for (let i = rounds - 1; i >= 0; i--) {
    const t = F(L, ks[i & 3], i);
    const newR = L;
    const newL = (R ^ t) & 0xffff;
    L = newL;
    R = newR;
  }
  return ((L << 16) | R) >>> 0;
}

// 16진수(문자열) → 10진수(숫자)
export function hexToDec(hexStr) {
  // 16진수 문자열을 10진수 정수로 변환
  return parseInt(hexStr, 16);
}

// 10진수(숫자) → 16진수(문자열)
export function decToHex(num, padLength = 0) {
  if (!Number.isInteger(num) || num < 0) {
    // 0 이상의 정수를 입력 필요
    throw throwObj('errorComn', 'number dec hex error.');
  }
  // padLength 지정 시 앞을 0으로 채워줌
  const hexStr = num.toString(16).padStart(padLength, '0');
  return '0x' + hexStr;
}

// Node/브라우저 겸용 atob
const _atob = globalThis.atob || ((s) => Buffer.from(s, 'base64').toString('binary'));

function makeLUT() {
  // "ew|br|p6|cz|os|k2|d4|iu|a5|ft|nx|lq|h1|jv|m3|gy" 를 각 파트별 Base64로 캡슐화
  const base64 = 'ZXc|YnI|cDY|Y3o|b3M|azI|ZDQ|aXU|YTU|ZnQ|bng|bHE|aDE|anY|bTM|Z3k';
  const keys = '0123456789ABCDEF';
  const values = base64.split('|').map(_atob); // ["ew","br",...,"gy"]

  const lut = Object.create(null); // 문자 -> HEX 키
  for (let i = 0; i < values.length; i++) {
    for (const ch of values[i]) lut[ch] = keys[i];
  }
  return lut;
}

const LUT = makeLUT();

/*
0 -> e, w
1 -> b, r
2 -> p, 6
3 -> c, z
4 -> o, s
5 -> k, 2
6 -> d, 4
7 -> i, u
8 -> a, 5
9 -> f, t
A -> n, x
B -> l, q
C -> h, 1
D -> j, v
E -> m, 3
F -> g, y
*/
export function encryptNumOfStr(str) {
  if (typeof str !== 'string') {
    // 입력은 문자열이어야 합니다.
    throw throwObj('errorComn', 'encrypt number string param failed.');
  }

  let result = '';
  const invalids = [];

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    const mapped = LUT[ch];
    if (mapped === undefined) {
      invalids.push({ ch, index: i });
    } else {
      result += mapped;
    }
  }

  if (invalids.length) {
    // 예: Unsupported characters: '9'(idx:0), '9'(idx:1)
    const msg = invalids.map(({ ch, index }) => `'${ch}'(idx:${index})`).join(', ');
    // 매핑 불가 문자가 포함되어 있습니다
    throw throwObj('errorComn', `encrypt number string param error : ${msg}`);
  }

  const r = parseInt(result, 16);
  if (Number.isNaN(r)) {
    throw throwObj('errorComn', 'encrypt number string result failed.');
  }
  return r;
}
// 사용
// const coinsPlayerToken = decryptHex8To32(window.sessionStorage.getItem('coinsPlayer')); // decrypt code -> number 20
// const coinsEnemyToken = decryptHex8To32(window.sessionStorage.getItem('coinsEnemy')); // decrypt code -> number 20
// console.log('coinsPlayerToken :::::: ', coinsPlayerToken); // number 20
// console.log('coinsEnemyToken ::::::: ', coinsEnemyToken); // number 20

// const coinsPlayerCode = encrypt32ToHex8(coinsPlayerToken); // number 20 -> decrypt code
// const coinsEnemyCode = encrypt32ToHex8(coinsEnemyToken); // number 20 -> decrypt code
// console.log('coinsPlayerCode :::::: ', coinsPlayerCode); // decrypt code
// console.log('coinsEnemyCode ::::::: ', coinsEnemyCode); // decrypt code

// 숫자 난독화 - 양수만 지원해서 주석처리함
/* export function obfuscateNumber(n, secret = 0x5a3c_1f29) {
  if (!Number.isSafeInteger(n) || n < 0) throw new Error("0 이상의 안전한 정수만 지원");
  const x = (n ^ secret) >>> 0;          // 32bit로
  return x.toString(36);                 // 0-9a-z
}
// 난독화 숫자 복호화 - 양수만 지원해서 주석처리함
// 난독 문자열 -> 숫자
export function deobfuscateNumber(s, secret = 0x5a3c_1f29) {
  const x = parseInt(s, 36) >>> 0;
  return (x ^ secret) >>> 0;
}
// 예)
// const token = obfuscateNumber(123456);   // 예: "2n9k" 같은 형태
// const original = deobfuscateNumber(token); // 123456 */

// 숫자 난독화 - 양수/음수 지원
// int32 난독화: -2147483648 ~ 2147483647 지원
export function obfuscateInt32(n, secret = 0x5a3c_1f29) {
  if (!Number.isInteger(n)) throw throwObj('dataManipulation', 'Int32 failed.'); // 정수만 지원
  // int32 범위로 강제 (음수 포함)
  const v = n | 0;

  // XOR 후 32bit 패턴 유지(부호 없는 uint32로 변환)
  const x = (v ^ secret) >>> 0;

  // base36 문자열 (0-9a-z)
  return x.toString(36);
};

// 난독화 숫자 복호화 - 양수/음수 지원
export function deobfuscateInt32(s, secret = 0x5a3c_1f29) {
  const x = (parseInt(s, 36) >>> 0);

  // XOR 복호화 후 int32로 되돌림 (부호 복원)
  return ((x ^ secret) | 0);
};

// 예)
// const t1 = obfuscateInt32(123456);
// const o1 = deobfuscateInt32(t1); // 123456

// const t2 = obfuscateInt32(-123456);
// const o2 = deobfuscateInt32(t2); // -123456
