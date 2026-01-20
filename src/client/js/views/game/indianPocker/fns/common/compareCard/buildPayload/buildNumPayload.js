import buildPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildPayload';
import findPayloadPublic from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findPayloadPublic';

export default (heads, _limit) => {
  // const h = heads?.[heads.length - 1];
  if (!Array.isArray(heads) || heads.length === 0) {
    return { N_PAYLOADS: [] };
  };
  // const limit = Math.max(0, Math.min(_limit ?? heads.length, heads.length));
  return { N_PAYLOADS : heads
    .slice(0, Math.max(0, Math.min(_limit ?? heads.length, heads.length)))
    .map((d) => buildPayload(findPayloadPublic(d, heads?.[heads.length - 1]), d))
  };

  /* const N_PAYLOADS = [];
  for (let i = 0; i < _limit; i++) {
    const p = {
      d: heads[i], // path > d
      h: heads[heads.length - 1], // hash
    };

    if (_case === "pu") {
      // public card
      N_PAYLOADS.push(buildPayload(findPayloadPublic(p.d, p.h), p.d)); // 난독화 문자열
    } else if (_case === "pr") {
      // private card
      N_PAYLOADS.push(buildPayload(findPayloadPrivate(p.d, p.h), p.d)); // 난독화 문자열
    }
  }
  return { N_PAYLOADS }; */
};
