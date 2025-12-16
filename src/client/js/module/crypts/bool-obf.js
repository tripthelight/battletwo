// import { encrypt } from '@/client/js/webRTC/rtcConn.js';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import textDE from '@/client/js/module/crypts/textDE';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 8글자 난독 문자열: [a-z0-9]만 사용
 * 페이로드(총 41비트):  nonce(20b) | bit(1b) | mac(20b)
 * mac = FNV-1a( (nonce<<1)|bit , key=encrypt.keypair ) 하위 20비트
 * 동일 입력("true"/"false")이어도 nonce가 매번 달라져 결과 문자열이 바뀜
 */

const ALPH = 'abcdefghijklmnopqrstuvwxyz0123456789';
const RADIX = BigInt(ALPH.length); // 36n
const MAC_MASK_20 = (1 << 20) - 1; // 0xFFFFF
const MAC_MASK_20N = 0xfffffn; // 20비트 BigInt 마스크

// base36 고정 8자 인코딩 (왼쪽 패딩)
function b36encFixed8(n) {
  let s = '';
  let b = BigInt(n);
  do {
    s = ALPH[Number(b % RADIX)] + s;
    b /= RADIX;
  } while (b > 0n);
  while (s.length < 8) s = ALPH[0] + s; // 'a'로 패딩
  return s;
}

// base36 디코딩
function b36dec(s) {
  let b = 0n;
  for (const c of s) {
    const i = ALPH.indexOf(c);
    if (i < 0) throw throwObj('errorComn', 'invalid alphabet');
    b = b * RADIX + BigInt(i);
  }
  return b;
}

// 20비트 난수
function rand20() {
  return (crypto.getRandomValues(new Uint32Array(1))[0] & MAC_MASK_20) >>> 0;
}

// encrypt.keypair → 32비트 키 유도
function deriveKey32FromEncryptKeypair() {
  // const k = encrypt?.keypair;
  const k = KEY?.keypair;
  if (k == null) throw throwObj('errorComn', 'keypair not found');

  /** bytes: Uint8Array */
  let bytes;
  if (typeof k === 'string') {
    bytes = new TextEncoder().encode(k);
  } else if (k instanceof Uint8Array) {
    bytes = k;
  } else if (k?.buffer instanceof ArrayBuffer) {
    bytes = new Uint8Array(k.buffer);
  } else if (typeof k === 'object') {
    // publicKey / privateKey 존재 시 문자열화
    const guess = k.publicKey ?? k.privateKey ?? JSON.stringify(k);
    bytes = new TextEncoder().encode(String(guess));
  } else {
    bytes = new TextEncoder().encode(String(k));
  }

  // 바이트 전체에 FNV-1a 32비트 적용
  let h = 0x811c9dc5 >>> 0; // 2166136261
  for (let i = 0; i < bytes.length; i++) {
    h ^= bytes[i];
    h = Math.imul(h, 0x01000193) >>> 0; // 16777619
  }
  return h >>> 0;
}

function fnv1a32WithKey(u32) {
  // 키로 초기화된 FNV-1a(32) 변형: u32 입력 4바이트를 섞음
  const K32 = deriveKey32FromEncryptKeypair();
  // offset_basis ^ K32 로 키 결합
  let h = (0x811c9dc5 ^ K32) >>> 0;
  // 리틀엔디언으로 4바이트 순차 처리
  h ^= u32 & 0xff;
  h = Math.imul(h, 0x01000193) >>> 0;
  h ^= (u32 >>> 8) & 0xff;
  h = Math.imul(h, 0x01000193) >>> 0;
  h ^= (u32 >>> 16) & 0xff;
  h = Math.imul(h, 0x01000193) >>> 0;
  h ^= (u32 >>> 24) & 0xff;
  h = Math.imul(h, 0x01000193) >>> 0;
  return h >>> 0;
}

// 공개 API (가독성)
export const X = {
  /**
   * @param {"true"|"false"} text 인자는 반드시 문자
   * @returns {string} 8글자 난독 문자열([a-z0-9])
   */
  enc(text) {
    // if (text !== "true" && text !== "false")
    if (
      text !== textDE([116, 114, 117, 101]) && // "true"
      text !== textDE([102, 97, 108, 115, 101]) // "false"
    )
      throw throwObj('errorComn', 'arg must be true or false');

    const bit = text === textDE([116, 114, 117, 101]) ? 1 : 0; // 1비트
    const nonce = rand20(); // 20비트

    // MAC용 입력값: (nonce<<1)|bit  → u32
    const u = ((nonce << 1) | bit) >>> 0;

    // 키 기반 MAC 20비트
    const mac = (fnv1a32WithKey(u) & MAC_MASK_20) >>> 0;

    // 41비트 페이로드: nonce(20) | bit(1) | mac(20)
    const payload = (BigInt(nonce) << 21n) | (BigInt(bit) << 20n) | BigInt(mac);

    return b36encFixed8(payload);
  },

  /**
   * @param {string} s 8글자 난독 문자열
   * @returns {boolean}
   */
  dec(s) {
    if (typeof s !== 'string' || s.length !== 8) throw throwObj('errorComn', 'invalid token length');

    const v = b36dec(s);

    const mac = Number(v & MAC_MASK_20N);
    const bit = Number((v >> 20n) & 1n);
    const nonce = Number((v >> 21n) & ((1n << 20n) - 1n));

    const u = ((nonce << 1) | bit) >>> 0;
    const m2 = (fnv1a32WithKey(u) & MAC_MASK_20) >>> 0;

    if (m2 !== mac) throw throwObj('errorComn', 'invalid token/mac');

    return !!bit;
  },
};

// 기본 내보내기는 난독화/경량 버전을 사용하세요(별도 파일 권장).
// 여기서는 검증 편의를 위해 동일한 심플 API를 유지합니다.
export default X;

/* ---------- 간단 사용 예 ----------
import X from "./bool-obf.readable.js";

const t1 = X.enc("true");   // 예: "ak8m2t9c" (매번 달라짐)
const f1 = X.enc("false");  // 예: "b7r0n9kq"

console.log(t1, f1);
console.log(X.dec(t1)); // true
console.log(X.dec(f1)); // false
----------------------------------- */

// product에서 사용할 난독화 버전
/*
export const X=(()=>{const A="abcdefghijklmnopqrstuvwxyz0123456789",L=BigInt(A.length),E=n=>{let s="",b=BigInt(n);do{s=A[Number(b%L)]+s;b/=L}while(b>0n);for(;s.length<8;)s=A[0]+s;return s},D=s=>{let b=0n;for(let i=0;i<s.length;i++)b=b*L+BigInt(A.indexOf(s[i]));return b},R=()=>crypto.getRandomValues(new Uint32Array(1))[0]&((1<<20)-1),F=b=>{let h=2166136261>>>0;for(let i=0;i<b.length;i++){h^=b[i];h=Math.imul(h,16777619)>>>0}return h>>>0},K=(()=>{const k=encrypt?.keypair;if(k==null)throw Error("no keypair");let bytes;if(typeof k==="string")bytes=new TextEncoder().encode(k);else if(k instanceof Uint8Array)bytes=k;else if(k?.buffer instanceof ArrayBuffer)bytes=new Uint8Array(k.buffer);else bytes=new TextEncoder().encode(String(k.publicKey??k.privateKey??JSON.stringify(k)));return F(bytes)})(),H=u=>{let h=(2166136261^K)>>>0;h^=u&255;h=Math.imul(h,16777619)>>>0;h^=(u>>>8)&255;h=Math.imul(h,16777619)>>>0;h^=(u>>>16)&255;h=Math.imul(h,16777619)>>>0;h^=(u>>>24)&255;h=Math.imul(h,16777619)>>>0;return h>>>0};return{enc:t=>{if(t!=="true"&&t!=="false")throw TypeError(0);const b=t==="true"?1:0,n=R(),u=((n<<1)|b)>>>0,m=H(u)&((1<<20)-1),p=(BigInt(n)<<21n)|(BigInt(b)<<20n)|BigInt(m);return E(p)},dec:s=>{const v=D(s),m=Number(v&((1n<<20n)-1n)),b=Number((v>>20n)&1n),n=Number((v>>21n)&((1n<<20n)-1n)),u=((n<<1)|b)>>>0;if((H(u)&((1<<20)-1))!==m)throw Error("invalid");return !!b}}})();
export default X;
*/
