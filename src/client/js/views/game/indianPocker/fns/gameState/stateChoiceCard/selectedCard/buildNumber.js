import { OPEN, CLOSE, SCALE } from '@/client/js/module/base64/variables';
import { unpack } from '@/client/js/module/splitArray';
import fnv1a32 from '@/client/js/module/base64/fnv1a32';
import b64ToU8 from '@/client/js/module/base64/b64ToU8';
import decryptInPlace from '@/client/js/module/base64/decryptInPlace';

export default (_params) => {
  const { HASHES, N_PAYLOADS: NP, nCode: TOKEN } = _params;

  const N_PAYLOADS = unpack(NP);


  // HASHES 에서 카드번호 10개만 추출해서 payloads 와 key: value로 병합
  const PAYLOADS = Object.fromEntries(HASHES.slice(0, 10).map((k, i) => [k, N_PAYLOADS[i]]));

  // ---------- 토큰 스트림 -> 중첩 배열 파싱 ----------
  // OPEN=-32768, CLOSE=32767, SCALE=10 (모든 좌표는 x10 정수로 저장되어 있음)
  const parseTokenStream = (u8) => {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);

    const root = [];
    const stack = [];

    const toNum = (v) => {
      // v는 SCALE 적용된 int
      if (v % SCALE === 0) return v / SCALE;
      // 소수 1자리 고정 (2.5, 10.3, 12.4, 14.4, 15.5, 3.6, 2.8 등)
      return Number((v / SCALE).toFixed(1));
    };

    for (let off = 0; off < dv.byteLength; off += 2) {
      const t = dv.getInt16(off, true);

      if (t === OPEN) {
        const arr = [];
        if (stack.length) stack[stack.length - 1].push(arr);
        else root.push(arr);
        stack.push(arr);
        continue;
      }

      if (t === CLOSE) {
        stack.pop();
        continue;
      }

      // 혹시라도 스트림이 깨졌을 때 안전장치 (push undefined 방지)
      if (!stack.length) {
        const arr = [];
        root.push(arr);
        stack.push(arr);
      }

      const x = t;
      const y = dv.getInt16(off + 2, true);
      off += 2;

      stack[stack.length - 1].push([toNum(x), toNum(y)]);
    }

    return root[0];
  };

  const buildByIndex = (hash) => {
    console.log(hash);

    const u8 = b64ToU8(PAYLOADS[hash]);
    decryptInPlace(u8, hash);
    const out = parseTokenStream(u8);
    return out;
  };

  return buildByIndex(fnv1a32(String(TOKEN), HASHES[HASHES.length - 1]));
};
