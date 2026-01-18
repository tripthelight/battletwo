import int16ToU8 from '@/client/js/module/base64/int16ToU8';
import cryptInPlace from '@/client/js/module/base64/cryptInPlace';
import u8ToB64 from '@/client/js/module/base64/u8ToB64';
import findTPayloadPublic from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findTPayloadPublic';
import findTPayloadPrivate from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findTPayloadPrivate';

export default (heads, _case, _limit) => {
  // 1) 케이스 10개 정의(recs)
  // recs: [ [anchorX, anchorY, shapeId], ... ]
  const CASE_RECS = [{},{},{},{},{},{},{},{},{},{}];

  // 2) CASE payload 생성 (mode + recs) ----------------
  const buildCasePayload = (mode, recs, seed) => {
    // mode: 0(flat 1개), 1(nested 여러 개)
    const tokens = [mode | 0, recs.length | 0];
    for (const [ax, ay, sid] of recs) tokens.push(ax | 0, ay | 0, sid | 0);

    const u8 = int16ToU8(tokens);
    cryptInPlace(u8, seed >>> 0);
    return u8ToB64(u8);
  };

  const T_CASE_PAYLOADS = CASE_RECS.map((c, i) => {
    if (_case === "pu") {
      const { mode, recs } = findTPayloadPublic(heads[i], heads[heads.length - 1])
      return buildCasePayload(mode, recs, heads[i]);
    } else if (_case === "pu") {
      const { mode, recs } = findTPayloadPrivate(heads[i], heads[heads.length - 1])
      return buildCasePayload(mode, recs, heads[i]);
    }
  });
  return { T_CASE_PAYLOADS };
};
