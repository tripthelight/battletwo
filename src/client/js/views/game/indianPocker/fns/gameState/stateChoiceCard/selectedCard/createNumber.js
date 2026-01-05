import { pathPayload } from '@/client/store/encryptionStore';
import { safeBase64Decode } from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt";
import { __fnv1a32 } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/f';
import dAdd from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/dAdd";
import editPos from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/n/editPos';

export default (_d) => new Promise(resolve => {
  try {
    const { nCode, encryptSize, SVG_NS, svg } = _d;


    const __PAYLOADS = Object.create(null);

    // key = FNV-1a 32-bit hash (입력 문자열의 해시), value = 암호화된(base64) 바이너리
    __PAYLOADS[0x550b0f8c] = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
    __PAYLOADS[0xc47bb621] = "gAAHMpXA6/4NinNwxU8040b3gbPb61vkz7EdI6UcJScpXyfwWM4=";

    const payloadN = pathPayload("n");

    function __xorshift32(x) {
      x >>>= 0;
      x ^= (x << 13) >>> 0;
      x ^= x >>> 17;
      x ^= (x << 5) >>> 0;
      return x >>> 0;
    }

    // "어려운 수식 기반 바이트 복호화(키스트림 생성)
    function __decryptInPlace(u8, seed) {
      let s = (seed ^ 0xa5a5a5a5) >>> 0;

      for (let i = 0; i < u8.length; i++) {
        // i*0x9E3779B9 누산 + xorshift + 비선형 혼합
        const add = Math.imul(i, 0x9e3779b9) >>> 0;
        s = __xorshift32((s + add) >>> 0);

        const rot = ((s >>> 16) | (s << 16)) >>> 0;
        const mix = (Math.imul(s, 0x27d4eb2d) ^ rot) >>> 0;
        const k = mix & 0xff;

        u8[i] ^= k;
      }
    }

    function __b64ToU8(b64) {
      // 브라우저: atob 사용
      const bin = atob(b64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i) & 0xff;
      return out;
    }

    function __i16LE(dv, off) {
      return dv.getInt16(off, true);
    }

    function __unscale(i16) {
      // 스케일(×10) 복원 + "의미 없는 0항을 섞어 수식 난도를 올림 (값은 그대로)
      const q = i16 / 10;
      const z = Math.sqrt(2) - Math.sqrt(2); // 0
      return Math.round((q + z) * 10) / 10;
    }

    function hexDump(u8, n = 16) {
      return [...u8.slice(0, n)].map(b => b.toString(16).padStart(2, "0")).join(" ");
    }

    function __unpack(u8) {
      const dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
      let p = 0;
      const depth = dv.getUint8(p++);
      if (depth !== 1 && depth !== 2 && depth !== 3) throw new Error("bad payload");

      // counts 읽기
      let groupCount = 0;
      let pathCount = 0;
      let pathsPerGroup = null;
      let lens = null; // depth2: [len...], depth3: [[len...], ...]

      if (depth === 1) {
        const n = dv.getUint8(p++);
        const out = new Array(n);
        for (let i = 0; i < n; i++) {
          const x = __unscale(__i16LE(dv, p));
          const y = __unscale(__i16LE(dv, p + 2));
          p += 4;
          out[i] = [x, y];
        }
        return out;
      }

      if (depth === 2) {
        pathCount = dv.getUint8(p++);
        lens = new Array(pathCount);
        for (let i = 0; i < pathCount; i++) lens[i] = dv.getUint8(p++);

        const out = new Array(pathCount);
        for (let pi = 0; pi < pathCount; pi++) {
          const n = lens[pi];
          const path = new Array(n);
          for (let i = 0; i < n; i++) {
            const x = __unscale(__i16LE(dv, p));
            const y = __unscale(__i16LE(dv, p + 2));
            p += 4;
            path[i] = [x, y];
          }
          out[pi] = path;
        }
        return out;
      }

      // depth === 3
      groupCount = dv.getUint8(p++);
      pathsPerGroup = new Array(groupCount);
      lens = new Array(groupCount);

      for (let gi = 0; gi < groupCount; gi++) {
        const pc = dv.getUint8(p++);
        pathsPerGroup[gi] = pc;
        const l = new Array(pc);
        for (let pi = 0; pi < pc; pi++) l[pi] = dv.getUint8(p++);
        lens[gi] = l;
      }

      const out = new Array(groupCount);
      for (let gi = 0; gi < groupCount; gi++) {
        const pc = pathsPerGroup[gi];
        const grp = new Array(pc);
        for (let pi = 0; pi < pc; pi++) {
          const n = lens[gi][pi];
          const path = new Array(n);
          for (let i = 0; i < n; i++) {
            const x = __unscale(__i16LE(dv, p));
            const y = __unscale(__i16LE(dv, p + 2));
            p += 4;
            path[i] = [x, y];
          }
          grp[pi] = path;
        }
        out[gi] = grp;
      }
      return out;
    }

    // ✅ 요구사항 함수
    function getResultArray(secretKey) {
      if (typeof secretKey !== "string") throw new TypeError("string required");
      // const h = __fnv1a32(secretKey);
      const h = __fnv1a32("OEJNIHMKXT");
      // const b64 = __PAYLOADS[h];
      // const b64 = payloadN[h];
      const b64 = "tYgZn8WQVDTzjwbgZ/VqLNbdp3kyXw==";
      if (!b64) throw new Error("unknown key");
      const bytes = __b64ToU8(b64);
      __decryptInPlace(bytes, h);
      return __unpack(bytes);
    }

    /**
     * shape(중첩 배열)을 SVG path 문자열 배열로 변환합니다.
     *
     * 지원 형태:
     * 1) [[dx,dy], [dx,dy], ...]                         -> ["M0,0 ... Z"]
     * 2) [ [[dx,dy],...], [[dx,dy],...] ]                -> ["M0,0 ... Z ... Z"]
     * 3) [ [ [[dx,dy],...], [[dx,dy],...] ], [ ... ] ]   -> ["M0,0 ...", "M0,0 ..."]
     */
    function toSvgPaths(input) {
      const isPair = (v) =>
        Array.isArray(v) &&
        v.length === 2 &&
        typeof v[0] === "number" &&
        typeof v[1] === "number";

      const isPath = (v) => Array.isArray(v) && v.length > 0 && isPair(v[0]);
      const isArrayOfPaths = (v) => Array.isArray(v) && v.length > 0 && isPath(v[0]);
      const isArrayOfArrayOfPaths = (v) =>
        Array.isArray(v) && v.length > 0 && Array.isArray(v[0]) && isArrayOfPaths(v[0]);

      const samePair = (a, b) => a && b && a[0] === b[0] && a[1] === b[1];
      const ORIGIN = [0, 0];

      // 단일 path (점들의 배열) -> "M0,0 m... l... Z"
      const pathToD = (path) => {
        const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
        if (path.length <= startIdx) return "M0,0 Z";

        const [mx, my] = path[startIdx];
        let d = `M0,0 m${mx},${my}`;
        for (let i = startIdx + 1; i < path.length; i++) {
          const [x, y] = path[i];
          d += ` l${x},${y}`;
        }
        return d + " Z";
      };

      // compound: [path1, path2, ...] -> "M0,0 ... Z m... l... Z ..."
      // (여기서 핵심: 두 번째 서브패스부터는 절대 "M"을 쓰지 않음)
      const compoundToD = (paths) => {
        let d = pathToD(paths[0]); // 첫 서브패스는 M0,0 포함

        for (let p = 1; p < paths.length; p++) {
          const path = paths[p];

          const startIdx = samePair(path[0], ORIGIN) ? 1 : 0;
          if (path.length <= startIdx) continue;

          const [mx, my] = path[startIdx];
          d += ` m${mx},${my}`; // ✅ 여기서 "M" 금지, 반드시 상대 move

          for (let i = startIdx + 1; i < path.length; i++) {
            const [x, y] = path[i];
            d += ` l${x},${y}`;
          }
          d += " Z";
        }

        return d;
      };

      // 1) [[x,y], ...]
      if (isPath(input)) {
        return [pathToD(input)];
      }

      // 2) [[[x,y], ...], [[x,y], ...]]  -> 각각 따로
      if (isArrayOfPaths(input)) {
        return input.map(pathToD);
      }

      // 3) [ [path, path], [path, path] ] -> 각 요소 내부는 합쳐서 2개 리턴
      if (isArrayOfArrayOfPaths(input)) {
        return input.map(compoundToD);
      }

      throw new Error("지원하지 않는 입력 형태입니다.");
    }

    const pathNumber = {
      f: document.createElementNS(safeBase64Decode(SVG_NS), "path"),
      r: document.createElementNS(safeBase64Decode(SVG_NS), "path")
    };

    const d_num = toSvgPaths(getResultArray(nCode));

    if (d_num.length === 1) {
      dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
      dAdd(pathNumber.r, editPos.r(d_num[0], nCode, encryptSize));
    } else if (d_num.length === 2) {
      dAdd(pathNumber.f, editPos.f(d_num[0], nCode));
      dAdd(pathNumber.r, editPos.r(d_num[1], nCode, encryptSize));
    };

    svg.appendChild(pathNumber.f);
    svg.appendChild(pathNumber.r);

    resolve();
  } catch (error) {
    throw error;
  }
});
