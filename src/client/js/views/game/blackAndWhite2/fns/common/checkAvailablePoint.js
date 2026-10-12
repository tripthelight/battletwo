/**
 * Black And White II - 개인 잔여 포인트 사용 가능 여부 검사.
 *
 * 이 함수는 현재 플레이어의 실제 잔여 포인트를 외부에서 전달받습니다.
 * - 처음 시작할 때: 99
 * - 선택이 확정된 뒤: 이전 잔여 포인트 - 이번 사용 포인트
 * - 선택을 취소하거나 상대방과 통신 실패 시: 별도 게임 상태 관리부에서 처리
 *
 * 본 함수는 잔액을 저장/차감하거나 WebRTC 메시지를 보내지 않습니다.
 * 점수 난독화·키 처리와 별개인 '순수 검증 함수'입니다.
 *
 * 선/후플레이어 모두 자신의 잔액에 대해 동일한 규칙을 사용합니다.
 * 아래 복잡한 비트연산은 기존 코드 스타일을 유지한 것으로,
 * 개발자 도구로부터 데이터/키를 안전하게 숨기는 보안 기능은 아닙니다.
 */

/**
 * 비트 AND·OR·NOT·시프트만으로 32비트 덧셈을 구현합니다.
 *
 * 1. a & b: 두 숫자가 모두 1인 자리 → 올림(carry) 발생 위치.
 * 2. (a | b) & ~(a & b): 같은 자리를 제외한 합의 비트(XOR와 같음).
 * 3. shared << 1: 올림을 다음 자리로 한 칸 이동.
 * 4. 남은 올림이 0이 될 때까지 반복.
 *
 * 반환값은 부호 있는 32비트 정수입니다. 여기서는 0~99 및 2의 보수만 사용합니다.
 */
const addByBits = (a, b) => {
  let sum = a | 0;
  let carry = b | 0;

  while (carry !== 0) {
    const shared = sum & carry;
    sum = (sum | carry) & ~shared;
    carry = shared << 1;
  }

  return sum;
};

/**
 * a - b 를 2의 보수로 수행합니다.
 * ~b + 1 은 -b와 같으므로 a + (~b + 1) = a - b 입니다.
 */
const subtractByBits = (a, b) => addByBits(a, addByBits(~b, 1));

/**
 * 기존 setPointNum.js의 한 자리 숫자 판별 방식 그대로 유지.
 *
 * FIVE_BITS: 하위 5비트 마스크 = 0b11111 (= 31).
 * TEN_BITS: 하위 10비트 마스크 = 0b1111111111 (= 1023).
 * - Number.isInteger(): 소수와 문자 등을 먼저 제외.
 * - value === (value & FIVE_BITS): 음수, 31 초과 수 등을 제외.
 * - (TEN_BITS >>> value) & 1: 0~9만 참. 10~31은 거짓.
 * - 비트연산에서 발생하는 32비트 숫자 강제 변환을 동등성 검사로 방어.
 */
export const isPointDigit = (value) => {
  const FIVE_BITS = ~((~0) << ((1 << 2) | 1));
  const TEN_BITS = ~((~0) << ((1 << 3) | (1 << 1)));

  return (
    Number.isInteger(value) &&
    value === (value & FIVE_BITS) &&
    ((TEN_BITS >>> value) & 1) === 1
  );
};

/**
 * (1 << 6) | (1 << 5) | (1 << 1) | 1
 * = 64 | 32 | 2 | 1 = 99. 시작 포인트 상한을 비트로 표현합니다.
 */
const MAX_POINT = (1 << 6) | (1 << 5) | (1 << 1) | 1;

/**
 * 잔여 포인트는 반드시 0~99 사이의 정수여야 합니다.
 *
 * - value === (value | 0): 32비트 범위를 벗어난 수를 배제.
 * - value >>> 31: 최상위 부호 비트. 음수이면 1.
 * - subtractByBits(99, value) >>> 31: 99 - value가 음수면 1.
 *   따라서 99보다 큰 정수를 배제합니다.
 */
const isRemainingPoint = (value) => (
  Number.isInteger(value) &&
  value === (value | 0) &&
  ((value >>> 31) & 1) === 0 &&
  ((subtractByBits(MAX_POINT, value) >>> 31) & 1) === 0
);

/**
 * 사용 가능 포인트 검증 (상태 변경 없음).
 *
 * @param {number} _l - 입력한 포인트 십의 자리 (0~9)
 * @param {number} _r - 입력한 포인트 일의 자리 (0~9)
 * @param {number} _remainingPoint - 해당 플레이어의 '확정된' 남은 포인트 (0~99)
 * @returns {{available: boolean, reason: string|null, used: number|null,
 *  remainingBefore: number|null, remainingAfter: number|null, shortage: number}}
 *  reason: invalidPoint | invalidRemainingPoint | insufficientPoints | null
 *
 * 예) checkAvailablePoint(2, 0, 79)
 *     → {available:true, used:20, remainingBefore:79, remainingAfter:59, ...}
 * 예) checkAvailablePoint(8, 0, 79)
 *     → {available:false, reason:'insufficientPoints', shortage:1, ...}
 */
export default (_l, _r, _remainingPoint) => {
  // 숫자 형식 오류는 잔액 부족과 구별하여 반환합니다.
  if (!isPointDigit(_l) || !isPointDigit(_r)) {
    return {
      available: false,
      reason: 'invalidPoint',
      used: null,
      remainingBefore: null,
      remainingAfter: null,
      shortage: 0,
    };
  }

  // 잔액 입력이 누락되었거나 0~99가 아니면 기본값 99로 간주하지 않습니다.
  // 두 번째 라운드부터 잔액을 잘못 사용할 위험이 있기 때문입니다.
  if (!isRemainingPoint(_remainingPoint)) {
    return {
      available: false,
      reason: 'invalidRemainingPoint',
      used: null,
      remainingBefore: null,
      remainingAfter: null,
      shortage: 0,
    };
  }

  // 사용 예정 포인트 = 십의 자리 × 10 + 일의 자리.
  // l << 3 = l×8, l << 1 = l×2이므로
  // 비트 덧셈으로 ((l×8 + l×2) + r) 값을 계산합니다.
  const used = addByBits(addByBits(_l << 3, _l << 1), _r);

  // 잔액 차감 후보: remainingPoint - used (두 번의 비트 덧셈).
  const difference = subtractByBits(_remainingPoint, used);

  // 0~99 내의 정수끼리 뺄셈하므로 결과는 -99~99 범위입니다.
  // difference의 최상위 비트가 1이면 음수, 즉 잔액 부족입니다.
  const insufficient = ((difference >>> 31) & 1) === 1;

  return {
    available: !insufficient,
    reason: insufficient ? 'insufficientPoints' : null,
    used,
    remainingBefore: _remainingPoint,
    // 잔액 부족 시에는 차감하지 않습니다. 이것도 계산 결과일 뿐 실제 상태 변경은 아닙니다.
    remainingAfter: insufficient ? _remainingPoint : difference,
    shortage: insufficient ? subtractByBits(used, _remainingPoint) : 0,
  };
};

/**
 * 0~99 숫자를 10의 자리와 1의 자리로 되돌립니다.
 * 일반 나눗셈(% /) 대신 2의 보수 뺄셈과 비트 덧셈만 사용합니다.
 * 반복 횟수는 최대 9회(99 -> 9,9)이므로 가볍습니다.
 * @returns {{left:number,right:number}|null}
 */
export const splitPointByBits = (value) => {
  if (!isRemainingPoint(value)) return null;
  const ten = (1 << 3) | (1 << 1); // 8 + 2 = 10
  let left = 0;
  let right = value;
  while (right >= ten) {
    right = subtractByBits(right, ten);
    left = addByBits(left, 1);
  }
  return { left, right };
};
