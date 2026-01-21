// import { encrypt } from '@/client/js/webRTC/rtcConn';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

const A = 'abcdefghijklmnopqrstuvwxyz0123456789',
  L = 36n;
const enc36 = (q) => {
  let n = BigInt(q),
    s = '';
  do {
    s = A[Number(n % L)] + s;
    n /= L;
  } while (n > 0n);
  for (; s.length < 8; ) s = A[0] + s;
  return s;
};
const dec36 = (s) => {
  let n = 0n;
  for (const c of s) n = n * L + BigInt(A.indexOf(c));
  return n;
};
const fnv1a = (s) => {
  let x = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    x ^= s.charCodeAt(i);
    x = Math.imul(x, 16777619) >>> 0;
  }
  return x >>> 0;
};
const mix = (x) => {
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
};
const rnd = () => {
  try {
    const u = new Uint32Array(1);
    crypto.getRandomValues(u);
    return u[0] >>> 0;
  } catch (_) {
    return (Math.random() * 4294967296) >>> 0;
  }
};

// === 키 확보 ===
let _K = null;
function ensureKey() {
  if (_K != null) return _K;
  // const kstr = encrypt?.keypair;
  // const kstr = KEY?.keypair;
  const kstr = KEY?.prk;
  if (!kstr) throw throwObj('errorComn', 'decrypt number key error.');
  _K = typeof kstr === 'string' ? fnv1a(kstr) : kstr >>> 0;
  return _K;
}

// 수동 키 덮어쓰기 옵션
export function setKey(k) {
  if (!k) throw throwObj('errorComn', 'invalid key error.');
  _K = typeof k === 'string' ? fnv1a(k) : k >>> 0;
}

const tag = (K, n, s) => mix((K ^ n ^ s) >>> 0) & 15;

/**
 * 숫자를 받아서 난독화된 문자를 리턴
 * [ s:5 ][ num:32 ][ t:4 ] = 41비트 → base36 8자 가능
 * @param {string|number} num
 * @returns {string} 난독화 문자
 */
export function enc(num) {
  if (!Number.isInteger(num) || num < 0 || num > 0xffffffff) throw throwObj('errorComn', 'enc - range error.');
  const K = ensureKey();
  const s = (rnd() ^ mix((Date.now() >>> 0) ^ K)) & 0x1f; // 5비트 nonce
  const t = tag(K, num, s);
  const pack = (BigInt(s) << 36n) | (BigInt(num) << 4n) | BigInt(t);
  return enc36(pack);
}

export function dec(tok) {
  if (!/^[a-z0-9]{8}$/.test(tok)) throw throwObj('errorComn', 'token error.');
  const K = ensureKey();
  const x = dec36(tok),
    t = Number(x & 15n),
    n = Number((x >> 4n) & 0xffffffffn) >>> 0,
    s = Number((x >> 36n) & 0x1fn) >>> 0;
  if (tag(K, n, s) !== t) throw throwObj('errorComn', 'corrupt error.');
  return n;
}

// 사용
/*
const token_1 = enc(encryptNumOfStr('ewro')); // 20
const token_2 = enc(encryptNumOfStr('wwbs'));
const token_3 = enc(encryptNumOfStr('wero'));
const token_4 = enc(encryptNumOfStr('eebs'));
const token_5 = enc(encryptNumOfStr('ewrs'));
console.log('token_1 ------------- ', token_1);
console.log('token_2 ------------- ', token_2);
console.log('token_3 ------------- ', token_3);
console.log('token_4 ------------- ', token_4);
console.log('token_5 ------------- ', token_5);


const num_1 = dec(token_1);
const num_2 = dec(token_2);
const num_3 = dec(token_3);
const num_4 = dec(token_4);
const num_5 = dec(token_5);
console.log('num_1 --------------- ', num_1);
console.log('num_2 --------------- ', num_2);
console.log('num_3 --------------- ', num_3);
console.log('num_4 --------------- ', num_4);
console.log('num_5 --------------- ', num_5);
*/
