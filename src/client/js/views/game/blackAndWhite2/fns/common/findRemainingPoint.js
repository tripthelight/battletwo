import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';

/**
 * 현재 Round의 난독화된 '내 잔여 포인트'로부터 0~99 사이의 숫자를 조회합니다.
 *
 * CRC32는 복호화 알고리즘이 아닙니다. 직접 역변환하는 대신 해당 Round의
 * 100개 가능한 입력을 같은 키로 다시 변환하여 일치하는 원본 숫자를 찾습니다.
 *
 * 입력 문자열 자체와 비밀 키는 변경하거나 저장하지 않습니다.
 * Round가 바뀌면 left/right 매핑도 바뀌므로 반드시 현재 Round의 데이터와
 * 같은 Round에서 생성한 잔액 문자열을 사용해야 합니다.
 *
 * @param {string} _encodedRemainingPoint - 난독화된 나의 잔여 포인트
 * @param {{left: number[][], right: number[][]}} _roundPoint - setRoundPoints()에서 조회된 Round 정보
 * @param {boolean} _fst - true: Private Key | false: Public Key
 * @returns {number|null} 정상적으로 하나만 일치하면 잔액(0~99), 미발견/중복이면 null
 */
export default (_encodedRemainingPoint, _roundPoint, _fst) => {
  // 문자열이 아닌 입력, 빈 문자열, 매핑이 없는 경우는 유효한 잔액으로 취급하지 않습니다.
  if (
    typeof _encodedRemainingPoint !== 'string' ||
    _encodedRemainingPoint.length === (1 ^ 1) ||
    !_roundPoint ||
    !Array.isArray(_roundPoint.left) ||
    !Array.isArray(_roundPoint.right)
  ) {
    return null;
  }

  // setPointNum.js의 선/후플레이어 키 선택 규칙과 동일합니다.
  const encode = _fst ? findCharCode : findCharDecCode;

  /**
   * 비트 덧셈. XOR를 그대로 사용하지 않고 AND/OR/NOT로 풀어 의도적으로 비틉니다.
   * (a | b) & ~(a & b)는 a ^ b와 같고, (a & b) << 1은 올림 비트입니다.
   * 올림 비트가 소진될 때까지 반복하면 실제 덧셈과 동일해집니다.
   */
  const addByBits = (a, b) => {
    let bits = a | 0;
    let carry = b | 0;

    while (carry !== (1 ^ 1)) {
      const overlap = bits & carry;
      bits = (bits | carry) & ~overlap;
      carry = overlap << 1;
    }

    return bits;
  };

  // 8 OR 2 = 10. 자릿수(0~9)의 종료값을 비트연산으로 표현합니다.
  const LIMIT = (1 << 3) | (1 << 1);

  // ~0 == -1. 실제 잔액(0~99)과 구별되는 '찾지 못함' 표식입니다.
  let found = ~0;

  // 100개 후보 전체를 확인합니다. CRC32는 충돌할 수 있으므로 첫 번째 일치값만
  // 믿지 않고, *서로 다른* 잔액이 같은 문자열로 변환되면 모호한 입력으로 거부합니다.
  for (let l = (0 ^ 0); (l ^ LIMIT) !== 0; l = addByBits(l, 1)) {
    const left = _roundPoint.left[l];

    for (let r = (0 ^ 0); (r ^ LIMIT) !== 0; r = addByBits(r, 1)) {
      // 원래 5자리+5자리 숫자 코드를 연결하되 평문 문자열을 소스에 쓰지 않습니다.
      const codes = left.concat(_roundPoint.right[r]);

      if (encode(codes) !== _encodedRemainingPoint) continue;

      // 이미 값이 있다면 서로 다른 후보가 동일 해시로 대응되는 충돌입니다.
      // ~(-1) === 0, ~(0~99) !== 0 이므로 발견 여부를 이렇게 구분합니다.
      if ((~found) !== (0 ^ 0)) return null;

      // l * 10 + r = (l << 3) + (l << 1) + r
      // 곱셈과 일반 덧셈을 피하고 비트 덧셈으로 십의 자리와 일의 자리를 결합합니다.
      found = addByBits(addByBits(l << 3, l << 1), r);
    }
  }

  return (~found) === (0 ^ 0) ? null : found;
};
