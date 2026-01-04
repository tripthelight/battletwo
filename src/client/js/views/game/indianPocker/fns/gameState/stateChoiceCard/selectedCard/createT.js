import { pathPayload } from '@/client/store/encryptionStore';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { safeBase64Decode } from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt";
import dAdd from "@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/dAdd";
import { H } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/f';
import C from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/C';
import { reverseString as D } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/reverseString';

export default (_d) => new Promise(resolve => {
  try {
    const { nCode, SVG_NS, svg } = _d;
    const payloadT = pathPayload("t");

    // --- (2) base64 디코드 ---
    const B = (b64) => {
      const bin = atob(b64);
      const out = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
      return out;
    };

    // --- (3) 도형(d/dr/ds/drs) 복호화: 코드에 원본 배열 없음 ---
    // 값 저장: byte = ((v + 64) XOR 0xA7), v는 int8 범위(-20..32 정도)
    const SHAPE_B64 = [
      "5+ft5fPn7e+RmZ3n58edn+ePkec=", // d
      "9+fh7+f/7efv75GZi+eRn+3l4ec=", // dr
      "5+fv5fTn7u+QmZzn5/ucn+eLn+c=", // ds
      "6efi7+fz7+fu75+ZiueQn+7l4uc="  // drs
    ];

    const DE_SHAPE = (idx) => {
      const k = (0xA7 ^ 0x00) | 0;     // 살짝 우회
      const off = (1 << 6) | 0;        // 64
      const raw = B(SHAPE_B64[idx]);
      const pts = new Array(raw.length >> 1);
      for (let i = 0, p = 0; i < raw.length; i += 2, p++) {
        // "매우 어려운 수식" 느낌: 불필요한 비트연산/우회 섞음
        const a = ((raw[i] ^ k) - off) | 0;
        const b = ((raw[i + 1] ^ k) - off) | 0;
        pts[p] = [a, b];
      }
      return pts;
    };

    const SHAPES = new Array(4);
    const shape = (idx) => (SHAPES[idx] ??= DE_SHAPE(idx));

    // --- (4) 케이스별 배치(좌표/도형 선택)도 암호화된 템플릿으로만 보관 ---
    // 템플릿 형식: [count, (shapeId,x,y)*]
    // 저장: byte = ((val + 17) XOR 0x5C)
    const decodePlacements = (caseId) => {
      const k = (0x5C ^ 0x00) | 0;
      const off = (0x10 + 1) | 0; // 17
      // const raw = B(CASE_TPL_B64[caseId]);
      const raw = B(`${C(D(payloadT[H(caseId)]), caseId)}==`);

      const dec = (i) => (((raw[i] ^ k) - off) & 0xff) | 0;
      const n = dec(0);
      const out = new Array(n);
      let pos = 1;
      for (let i = 0; i < n; i++) {
        const sId = dec(pos++);      // 0..3
        const x = dec(pos++);        // 0..255
        const y = dec(pos++);        // 0..255
        out[i] = [sId, x, y];
      }
      return out;
    };

    // --- (5) 최종 결과 생성: 반환 배열 리터럴을 직접 작성하지 않음 ---
    const build = (caseId) => {
      const placements = decodePlacements(caseId);

      // case 1은 "단일 폴리곤 배열"을 바로 리턴해야 함
      // if (caseId === 1) {
      if (caseId === findCharDecCode([79, 69, 74, 78, 73, 72, 77, 75, 88, 84])) {
        const [sid, x, y] = placements[0];
        const pts = shape(sid);

        // [[x,y], ...pts] 형태를 계산으로 생성
        const one = new Array(pts.length + 1);
        one[0] = [x, y];
        for (let i = 0; i < pts.length; i++) one[i + 1] = pts[i];
        return one;
      }

      // 나머지는 "폴리곤들의 배열" 리턴
      const res = new Array(placements.length);
      for (let i = 0; i < placements.length; i++) {
        const [sid, x, y] = placements[i];
        const pts = shape(sid);
        const poly = new Array(pts.length + 1);
        poly[0] = [x, y];
        for (let j = 0; j < pts.length; j++) poly[j + 1] = pts[j];

        res[i] = poly;
      }
      return res;
    };

    // --- (6) 공개 함수 ---
    function getPattern(token) {
      if (!token) return null;
      // const id = CASE_BY_HASH[H(token)];
      // return id ? build(id) : null; // 매칭 없으면 null
      return build(token);
    }

    /**
     * - 단일 폴리곤: [ [Mx,My], [dx,dy], [dx,dy], ... ]  => ["M... m... l... Z"]
     * - 폴리곤 n개:  [ 폴리곤, 폴리곤, ... ]             => ["...", "...", ...]
     */
    function toSvgPaths(input) {
      const isPoint = (v) =>
        Array.isArray(v) &&
        v.length === 2 &&
        typeof v[0] === "number" &&
        typeof v[1] === "number" &&
        Number.isFinite(v[0]) &&
        Number.isFinite(v[1]);

      const isPolygon = (arr) => Array.isArray(arr) && arr.length > 0 && arr.every(isPoint);

      const polygonToPath = (poly) => {
        const [mx, my] = poly[0];
        let s = `M${mx},${my}`;

        for (let i = 1; i < poly.length; i++) {
          const [x, y] = poly[i];
          const cmd = i === 1 ? "m" : "l";
          s += ` ${cmd}${x},${y}`;
        }
        return s + " Z";
      };

      if (!Array.isArray(input) || input.length === 0) return [];

      // 1) 단일 폴리곤이면 => 문자열 1개짜리 배열
      if (isPolygon(input)) {
        return [polygonToPath(input)];
      }

      // 2) 폴리곤 묶음이면 => n개 문자열 배열
      if (input.every(isPolygon)) {
        return input.map(polygonToPath);
      }

      throw new TypeError("입력 형식이 올바르지 않습니다.");
    }

    const d = toSvgPaths(getPattern(nCode));

    for (let i = 0; i < d.length; i++) {
      const path = document.createElementNS(safeBase64Decode(SVG_NS), "path");
      dAdd(path, d[i]);
      svg.appendChild(path);
    }

    resolve();
  } catch (error) {
    throw error;
  }
});
