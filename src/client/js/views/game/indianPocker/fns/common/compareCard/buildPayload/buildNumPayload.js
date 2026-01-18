import buildPayload from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/buildPayload';
import findPayloadPublic from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findPayloadPublic';
import findPayloadPrivate from '@/client/js/views/game/indianPocker/fns/common/compareCard/buildPayload/findPayloadPrivate';

export default (heads, _case, _limit) => {
  const N_PAYLOADS = [];
  for (let i = 0; i < _limit; i++) {
    if (_case === "pu") {
      // public card
      N_PAYLOADS.push(buildPayload(findPayloadPublic(heads[i], heads[heads.length - 1]), heads[i])); // 난독화 문자열
    } else if (_case === "pr") {
      // private card
      N_PAYLOADS.push(buildPayload(findPayloadPrivate(heads[i], heads[heads.length - 1]), heads[i])); // 난독화 문자열
    }
  }
  return { N_PAYLOADS };
};
