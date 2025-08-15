import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import findCharCode from '@/client/js/functions/findCharCode';

export default (() => {
  // 불투명 술어(보기에 난해하지만 항상 같은 결과)
  const Ω = n => ((n + 1) >> 1) !== (n >> 1);  // 항상 true

  // 불리언 상수: 리터럴 대신 표현식
  const T = !![]; // true
  const F = ![];  // false

  // 문자열 동등비교를 XOR 누적으로 우회
  const ξeq = (a, b) => {
    if ((a.length ^ b.length) !== 0) return F;
    let acc = 0;
    for (let i = 0; i < a.length; i++) {
      acc |= (a.charCodeAt(i) ^ b.charCodeAt(i));
    }
    return !acc; // acc가 0이면 동일
  };

  // no-op 변환(형식상만 연산처럼 보이게)
  const id = arr => arr.map(v => (v ^ 0) + 0);
  // 간접 호출(흔적 감추기)
  const call = (f, x) => (1, f)(x);

  // 실제 디코더
  return function (nums) {
    // s: 입력 nums를 해석한 문자열
    const s  = (0, booleanCheck)(nums);

    // BT/BF: 반드시 "원본 순서"를 유지해야 매칭됨    const BT = call(findCharCode, id([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])); // true 시드
    const BT = call(findCharCode, id([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])); // true 시드
    const BF = call(findCharCode, id([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])); // false 시드

    // 매칭을 숫자 플래그로 변환
    const eqBT = +ξeq(s, BT) << 1;  // 2 또는 0
    const eqBF = +ξeq(s, BF);       // 1 또는 0
    const flag = eqBT | eqBF;       // 2=BT, 1=BF, 0=미매칭

    switch (flag ^ 0) {
      case 2:  return Ω(7) ? T : F;             // 항상 T
      case 1:  return (Ω(8) && !Ω(8)) ? T : F;  // 항상 F
      // default: return void 0;                // 매칭 실패 시 undefined
      default: return ''                        // 매칭 실패 시 '
    }
  };
})();
