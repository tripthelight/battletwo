import { unpack } from '@/client/js/module/splitArray';
import { OPEN, CLOSE } from '@/client/js/module/base64/variables';
import fnv1a32 from '@/client/js/module/base64/fnv1a32';
import b64ToU8 from '@/client/js/module/base64/b64ToU8';
import decryptInPlace from '@/client/js/module/base64/decryptInPlace';

export default (_params) => {
  const { HASHES, IDX, T_SHAPE_SEED, T_SHAPE_PAYLOADS: TSP, T_CASE_PAYLOADS: TCP, nCode: TOKEN } = _params;

  const T_SHAPE_PAYLOADS = unpack(TSP);
  const T_CASE_PAYLOADS = unpack(TCP);

  // console.log("HASHES =============== > ", HASHES);
  // console.log("T_SHAPE_SEED ========= > ", T_SHAPE_SEED);
  // console.log("T_SHAPE_PAYLOADS ===== > ", T_SHAPE_PAYLOADS);
  // console.log("T_CASE_PAYLOADS ====== > ", T_CASE_PAYLOADS);


  // HASHES 에서 카드번호 10개만 추출해서 payloads 와 key: value로 병합
  const CASE_PAYLOADS = T_CASE_PAYLOADS.length > 1 ?
    Object.fromEntries(HASHES.slice(0, 10).map((k, i) => [k, T_CASE_PAYLOADS[i]])) :
    Object.fromEntries([[HASHES[IDX], T_CASE_PAYLOADS[0]]])


  // console.log("CASE_PAYLOADS ======== > ", CASE_PAYLOADS);


  // --------- nested token stream parser (OPEN/CLOSE + int16 pairs) ---------
  const parseNestedPoints = (u8) => {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const root = [];
    const stack = [];

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

      // 안전장치 (데이터 깨짐 방지)
      if (!stack.length) {
        const arr = [];
        root.push(arr);
        stack.push(arr);
      }

      const x = t;
      const y = dv.getInt16(off + 2, true);
      off += 2;

      stack[stack.length - 1].push([x, y]);
    }

    return root[0];
  };

  // --------- case template parser: [mode, count, (x,y,shapeId)*] ---------
  const parseCaseTemplate = (u8) => {
    const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
    const readI16 = (i) => dv.getInt16(i * 2, true);

    const mode = readI16(0); // 0: flat, 1: nested
    const count = readI16(1);

    const recs = [];
    let p = 2;
    for (let i = 0; i < count; i++) {
      const x = readI16(p++);
      const y = readI16(p++);
      const sid = readI16(p++);
      recs.push([x, y, sid]);
    }
    return { mode, recs };
  };

  // --------- shape decode cache ---------
  const getShape = (sid) => {
    let v = null;
    const u8 = b64ToU8(T_SHAPE_PAYLOADS[sid]);
    decryptInPlace(u8, T_SHAPE_SEED[sid]);
    v = parseNestedPoints(u8);
    return v;
  };

  // --------- build: anchor + shape ---------
  const buildAnchored = (ax, ay, shape) => {
    const out = new Array(1 + shape.length);
    out[0] = [ax, ay];
    for (let i = 0; i < shape.length; i++) {
      const p = shape[i];
      out[i + 1] = [p[0], p[1]]; // 깊은 복사
    }
    return out;
  };

  // --------- case decode + assemble ---------
  const buildByIndex = (hash) => {
    let cached = null;
    const u8 = b64ToU8(CASE_PAYLOADS[hash]);
    decryptInPlace(u8, hash);
    const { mode, recs } = parseCaseTemplate(u8);

    if (mode === 0) {
      // flat: [ [anchor], ...shape ]
      const [x, y, sid] = recs[0];
      cached = buildAnchored(x, y, getShape(sid));
    } else {
      // nested: [ [ [anchor], ...shape ], ... ]
      cached = new Array(recs.length);
      for (let i = 0; i < recs.length; i++) {
        const [x, y, sid] = recs[i];
        cached[i] = buildAnchored(x, y, getShape(sid));
      }
    }

    return cached;
  };

  // --------- exported function ---------
  return buildByIndex(fnv1a32(TOKEN, HASHES[HASHES.length - 1]));
};
