import { publicCardStrs } from '@/client/store/encryptionStore';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

function weirdDecode(tri) {
  const STRS = publicCardStrs();
  if (!STRS || (STRS && STRS.length === 0)) {
    throw { message: 'compare str failed.' };
  };

  // 마지막 seed 삭제한 배열
  const A = STRS.slice(0, -1);
  // 배열을 순회하면 마지막 문자열만 빼고 나머지 문자열의 마지막 "==" 제거
  const B = A.map((v, i) => i === A.length - 1 ? v : v.replace(/==$/, ""));

  const C = +STRS
    .at(-1) // STRS 배열의 마지막은 seed 임
    .replace(/==$/, "") // 마지막 "==" 제거
    .replace(/\D/g, ""); // 영문, 특문 제거

  // 짝수길이 문자열 : 짝수번째 문자를 바로 앞 문자로 이동
  // 홀수길이 문자열 : 맨 앞에 있는 문자를 맨뒤로 보내고, 짝수번째 문자를 바로 앞 문자로 이동
  const swapPairs = (str) => {
    const arr = [...str];
    for (let i = 0; i + 1 < arr.length; i += 2) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
    return arr.join("");
  };
  const swap = (str) => {
    if (str.length % 2 === 1) {
      // 홀수: 맨 앞글자를 맨 뒤로
      str = str.slice(1) + str[0];
    }
    // 짝수/홀수 공통: pair swap (fn1의 역연산)
    return swapPairs(str);
  };

  const B64 = (() => {
    // 홀수 인덱스 조각은 뒤집어서 저장되어 있으므로 여기서 다시 뒤집어 복원
    let s = "";
    for (let i = 0; i < B.length; i++) {
      const t = B[i];
      // const t = swap(P[i]);
      s += (i & 1) ? t.split("").reverse().join("") : t;
    }
    return s;
  })();

  const b64ToU8 = (s) => {
    s = String(s).replace(/[^A-Za-z0-9+/=]/g, "");
    if (typeof atob === "function") {
      const bin = atob(s);
      const u8 = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i) & 255;
      return u8;
    }
    // Node.js fallback
    return Uint8Array.from(Buffer.from(s, "base64"));
  };

  const xs32 = (seed) => {
    let x = seed >>> 0;
    return () => {
      x ^= (x << 13) >>> 0;
      x ^= x >>> 17;
      x ^= (x << 5) >>> 0;
      return (x >>> 0);
    };
  };

  const decryptInPlace = (u8) => {
    // const next = xs32(0xa5f1523d);
    const next = xs32(C);
    for (let i = 0; i < u8.length; i++) {
      const r = next();
      const k = ((r ^ Math.imul(i, 0x9e3779b9)) >>> ((i & 3) << 3)) & 255;
      u8[i] ^= k;
    }
    return u8;
  };

  const raw = decryptInPlace(b64ToU8(B64));
  const dv = new DataView(raw.buffer, raw.byteOffset, raw.byteLength);

  const mix = (x) => {
    x |= 0;
    x ^= x >>> 16;
    x = Math.imul(x, 0x7feb352d);
    x ^= x >>> 15;
    x = Math.imul(x, 0x846ca68b);
    x ^= x >>> 16;
    return x >>> 0;
  };

  const REC = 16;

  const result = () => {
    const a = ((tri && tri[0]) ?? 0) | 0;
    const b = ((tri && tri[1]) ?? 0) | 0;
    const c = ((tri && tri[2]) ?? 0) | 0;

    // 의미 없는 태그(복잡도 증가용)
    const tag = mix(a ^ (b << 11) ^ (c << 22));

    for (let off = 0; off < raw.byteLength; off += REC) {
      const ra = dv.getUint16(off, true);
      const rb = dv.getUint16(off + 2, true);
      const rc = dv.getUint16(off + 4, true);

      if (((ra ^ a) | (rb ^ b) | (rc ^ c)) === 0) {
        // "배열을 직접 리턴": 중간 리스트 만들지 않고 바로 반환
        return Array.from({ length: 10 }, (_, i) => raw[off + 6 + i] ^ ((tag >>> ((i & 3) << 3)) & 0));
      }
    }
  }

  return result();
};

function findObArr(...arr) {
  return findCharDecCode(weirdDecode(arr));
};

export { findObArr };
