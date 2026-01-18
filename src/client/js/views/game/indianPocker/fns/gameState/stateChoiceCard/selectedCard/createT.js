import buildT from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/buildT';
import { pathPayload } from '@/client/store/encryptionStore';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import { safeBase64Decode } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/base64Crypt';
import dAdd from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/dAdd';
import { H } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/f';
import C from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/C';
import { reverseString as D } from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/selectedCard/fns/t/reverseString';

export default (_d) =>
  new Promise((resolve) => {
    try {
      const { nCode, SVG_NS, svg, HASHES, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS } = _d;

      /**
       * - 단일 폴리곤: [ [Mx,My], [dx,dy], [dx,dy], ... ]  => ["M... m... l... Z"]
       * - 폴리곤 n개:  [ 폴리곤, 폴리곤, ... ]             => ["...", "...", ...]
       */
      function toSvgPathsT(input) {
        const isPoint = (v) => Array.isArray(v) && v.length === 2 && typeof v[0] === 'number' && typeof v[1] === 'number' && Number.isFinite(v[0]) && Number.isFinite(v[1]);

        const isPolygon = (arr) => Array.isArray(arr) && arr.length > 0 && arr.every(isPoint);

        const polygonToPath = (poly) => {
          const [mx, my] = poly[0];
          let s = `M${mx},${my}`;

          for (let i = 1; i < poly.length; i++) {
            const [x, y] = poly[i];
            const cmd = i === 1 ? 'm' : 'l';
            s += ` ${cmd}${x},${y}`;
          }
          return s + ' Z';
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

        throw new TypeError('입력 형식이 올바르지 않습니다.');
      }

      const d = toSvgPathsT(buildT({ HASHES, T_SHAPE_SEED, T_SHAPE_PAYLOADS, T_CASE_PAYLOADS, nCode }));

      for (let i = 0; i < d.length; i++) {
        const path = document.createElementNS(safeBase64Decode(SVG_NS), 'path');
        dAdd(path, d[i]);
        svg.appendChild(path);
      }

      resolve();
    } catch (error) {
      throw error;
    }
  });
