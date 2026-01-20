import buildCasePayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildCasePayload';
import findTPayloadPublic from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findTPayloadPublic';
import findTPayloadPrivate from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findTPayloadPrivate';

export default (heads, _limit) => {
  // 1) 케이스 10개 정의 (길이만 필요하면 굳이 객체 10개 만들 필요 없음)
  const CASE_COUNT = 10;

  // 2) 공통 값/함수는 미리 한 번만 계산
  // const h = heads?.[heads.length - 1];
  if (!Array.isArray(heads) || heads.length === 0) {
    return { T_CASE_PAYLOADS: [] };
  }

  const limit = Math.max(
    0,
    Math.min(_limit ?? CASE_COUNT, CASE_COUNT, heads.length) // heads[i] 안전
  );

  // 4) map 한 번으로 끝
  return { T_CASE_PAYLOADS: Array.from({ length: limit }, (_, i) => i).map((i) => {
      const seed = heads[i] >>> 0;
      const { mode, recs } = findTPayloadPublic(heads[i], heads?.[heads.length - 1]);
      return buildCasePayload(mode, recs, seed);
    })
  };



  /* // 1) 케이스 10개 정의(recs)
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
  return { T_CASE_PAYLOADS }; */
};
