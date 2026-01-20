import { OPEN, CLOSE } from '@/client/js/module/base64/variables';
import int16ToU8 from '@/client/js/module/base64/int16ToU8';
import cryptInPlace from '@/client/js/module/base64/cryptInPlace';
import u8ToB64 from '@/client/js/module/base64/u8ToB64';

export default (heads) => {
  // const d = [[0, 0],[10, 2],[20, 0],[10, 8],[-10, -2],[-6, 0],[0, 32],[-6, -8],[0, -24],[-10, 0]];
  // const dr = [[16, 0],[6, 8],[0, 24],[10, 0],[8, 8],[-10, -2],[-20, 0],[-10, -8],[10, 2],[6, 0]];
  // const ds = [[0, 0],[8, 2],[19, 0],[9, 8],[-9, -2],[-5, 0],[0, 28],[-5, -8],[0, -20],[-8, 0]];
  // const drs = [[14, 0],[5, 8],[0, 20],[8, 0],[9, 8],[-8, -2],[-19, 0],[-9, -8],[9, 2],[5, 0]];
  // 1) shapeId 매핑(고정): 0:d, 1:dr, 2:ds, 3:drs
  // const SHAPES = [d, dr, ds, drs];
  const SHAPES = [
    [[0, 0],[10, 2],[20, 0],[10, 8],[-10, -2],[-6, 0],[0, 32],[-6, -8],[0, -24],[-10, 0]], // d
    [[16, 0],[6, 8],[0, 24],[10, 0],[8, 8],[-10, -2],[-20, 0],[-10, -8],[10, 2],[6, 0]], // dr
    [[0, 0],[8, 2],[19, 0],[9, 8],[-9, -2],[-5, 0],[0, 28],[-5, -8],[0, -20],[-8, 0]], // ds
    [[14, 0],[5, 8],[0, 20],[8, 0],[9, 8],[-8, -2],[-19, 0],[-9, -8],[9, 2],[5, 0]] // drs
  ];

  // 2) CASE payload 생성 (mode + recs)
  const buildShapePayload = (points, seed) => {
    const tokens = [OPEN];
    for (const [x, y] of points) tokens.push(x | 0, y | 0);
    tokens.push(CLOSE);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  return {
    T_SHAPE_PAYLOADS: SHAPES.map((pts, i) => buildShapePayload(pts, heads[i])),
    T_SHAPE_SEED: heads.slice(0, 4)
  };
};
