import throwObj from '@/client/js/module/errorHandler/throwObj';
import { publicCardNumbs } from '@/client/store/encryptionStore';
import findBits from "@/client/js/views/game/indianPocker/fns/common/compareCard/findBits";
// import CardIdx from "@/client/js/views/game/indianPocker/fns/common/compareCard/CardIdx";

/**
 * 내 카드번호와 상대 카드번호를 받아서 대/소 비교 후 결과 리턴
 * @param {string} _l local : 내 키드번호
 * @param {string} _r remote : 상대 키드번호
 * @returns {boolean} 승 : 1 / 패 : 0 / 동 : 2
 */
export default async function(_l, _r) {
  try {
    if (_l === _r) return 2;
    const cardCodes = publicCardNumbs();
    if (!cardCodes || (cardCodes && cardCodes.length === 0)) {
      throw throwObj('cardNum', 'select card - public card code length failed.');
    };

    const na = Object.create(null);
    na[_l] = findBits(_l);
    na[_r] = findBits(_r);

    const L = (((((((((0b10101100 << 1) ^ 0b11010011) & 0x1ff) ^ 0) & 0xff) | 0) >>> 0) << 3) >>> 3) & 0b111; // array length : 3 의 복잡한 비트연산
    const R = Math.floor(Math.random() * L);

    function findNum(n) {
      if (!cardCodes.includes(n)) return false;
      return na[n][R];
    };

    const CN = {
      l: findNum(_l), // local peer card
      r: findNum(_r), // remote peer card
    };

    // 카드 번호 잘못 입력 시 에러처리
    if (!CN.l || !CN.r) throw "select card failed";

    return ((((new Set(na[(await import("@/client/js/views/game/indianPocker/fns/common/compareCard/CardIdx")).default.get(CN.l | CN.r)])).has(CN.l) ? CN.r : CN.l) | 0) & CN.l) !== 0;
  } catch (error) {
    throw error?.message ?? "select card failed";
  }
};
