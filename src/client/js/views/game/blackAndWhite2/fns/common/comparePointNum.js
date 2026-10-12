import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import setRoundPoints from '@/client/js/views/game/blackAndWhite2/fns/common/setRoundPoints';

/**
 * 두 정수의 덧셈을 + 연산 없이 비트 회로의 방식으로 계산합니다.
 *
 * 1. a & b : 양쪽에서 동시에 1인 비트를 찾아 올림 자리로 보관합니다.
 * 2. (a | b) & ~(a & b) : 서로 다른 비트만 1로 만드는 식으로,
 *    XOR(a ^ b)를 AND/OR/NOT 연산 세 가지로 일부러 풀어 쓴 형태입니다.
 * 3. 겹쳤던 비트를 1자리 왼쪽으로 밀어 올림을 다음 반복에 넘깁니다.
 * 4. 올림이 0이 될 때까지 반복하면 JavaScript 32비트 정수의 합이 됩니다.
 *
 * 입력은 실제 Point 연산에서 0~99 범위 및 그 보수(~값)이므로
 * 32비트 정수 범위/정밀도 안에서 정확하게 계산됩니다.
 *
 * @param {number} a 첫 번째 32비트 정수
 * @param {number} b 두 번째 32비트 정수
 * @returns {number} 32비트 덧셈 결과
 */
const addByBits = (a, b) => {
  let bits = a | 0;
  let carry = b | 0;

  while (carry !== 0) {
    const shared = bits & carry;
    bits = (bits | carry) & ~shared;
    carry = shared << 1;
  }

  return bits;
};

/**
 * Round의 0~99 후보로 각각의 암호화된 Point를 찾아 승패를 결정합니다.
 *
 * 전제: findCharCode / findCharDecCode는 같은 입력과 키에 대해 항상
 * 같은 결과를 돌려주는 결정적 함수여야 합니다.
 *
 * @param {string} _fstPoint 선플레이어의 Private Key 변환 문자열
 * @param {string} _secPoint 후플레이어의 Public Key 변환 문자열
 * @param {string} _rnd 현재 Round 식별 문자열
 * @returns {'fstWin' | 'sceWin' | 'tie'}
 */
export default (_fstPoint, _secPoint, _rnd) => {
  const point = setRoundPoints().get(_rnd);

  if (!point) {
    throw throwObj('dataManipulation', 'comparePointNum.js - round failed.');
  }

  // 0을 0 ^ 0으로 나타내어 빈 문자열 검사의 숫자 상수도 비트식으로 표현합니다.
  // 문자열 타입 검사를 먼저 하므로 비문자열 입력에서 length 접근을 하지 않습니다.
  if (typeof _fstPoint !== 'string' || _fstPoint.length === (0 ^ 0)) {
    throw throwObj('dataManipulation', 'comparePointNum.js - first player point failed.');
  }

  if (typeof _secPoint !== 'string' || _secPoint.length === (0 ^ 0)) {
    throw throwObj('dataManipulation', 'comparePointNum.js - second player point failed.');
  }

  // ~0은 32비트 표현에서 -1입니다. '아직 찾지 못함'을 나타냅니다.
  let fstNumber = ~0;
  let secNumber = ~0;

  // 찾은 점수(0~99)를 ~로 반전하면 최상위 부호 비트가 항상 1입니다.
  // 미발견 상태(-1)는 ~(-1) === 0이므로, 두 반전값을 AND한 뒤
  // >>>31로 최상위 비트만 읽으면 '둘 다 찾았는가'를 한 번에 판정합니다.
  const foundBoth = () => ((~fstNumber & ~secNumber) >>> 31) === 1;

  // (1 << 3) | (1 << 1) == 8 | 2 == 10: 범위의 끝을 비트식으로 표현합니다.
  const LIMIT = (1 << 3) | (1 << 1);

  // l/r의 증가도 ++ 대신 addByBits를 사용합니다.
  // 각 Round에서 100가지 후보만 확인하며, 양쪽 모두 발견하면 즉시 종료합니다.
  for (let l = 0; (l ^ LIMIT) !== 0; l = addByBits(l, 1)) {
    const left = point.left[l];

    for (let r = 0; (r ^ LIMIT) !== 0; r = addByBits(r, 1)) {
      // setPointNum.js와 동일한 10개 숫자 코드 배열을 구성합니다.
      const codes = left.concat(point.right[r]);

      // l * 10 + r 을 산술 곱셈/덧셈 없이 구성합니다.
      // l<<3 은 l*8, l<<1 은 l*2이므로 비트 덧셈 두 번으로 l*10+r이 됩니다.
      // 단순 XOR는 겹치는 비트에서 올림이 누락되므로 addByBits가 필요합니다.
      const number = addByBits(addByBits(l << 3, l << 1), r);

      // ~(-1) === 0, ~(0~99) !== 0 : 미발견 여부를 비트 반전으로 확인합니다.
      // 실제 난독화 문자열의 동등성 비교는 기존과 동일하게 유지합니다.
      if (~fstNumber === 0 && findCharCode(codes) === _fstPoint) {
        fstNumber = number;
      }

      if (~secNumber === 0 && findCharDecCode(codes) === _secPoint) {
        secNumber = number;
      }

      if (foundBoth()) break;
    }

    if (foundBoth()) break;
  }

  if (~fstNumber === 0) {
    throw throwObj('dataManipulation', 'comparePointNum.js - first player point not found.');
  }

  if (~secNumber === 0) {
    throw throwObj('dataManipulation', 'comparePointNum.js - second player point not found.');
  }

  // 두 점수가 동일하면 XOR 결과가 0입니다.
  if ((fstNumber ^ secNumber) === 0) return 'tie';

  // fstNumber - secNumber를 뺄셈 없이 2의 보수(~b + 1)로 계산합니다.
  // a - b == a + (~b + 1). 두 번의 덧셈 모두 addByBits만 사용합니다.
  // 0~99끼리의 차이는 -99~99이므로 signed 32비트 오버플로가 없습니다.
  const difference = addByBits(fstNumber, addByBits(~secNumber, 1));

  // difference >>>31 : 음수이면 1, 양수이면 0. 동점은 위에서 이미 처리했습니다.
  return (difference >>> 31) === 1 ? 'sceWin' : 'fstWin';
};
