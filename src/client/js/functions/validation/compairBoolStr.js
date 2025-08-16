import findCharCode from '@/client/js/functions/findCharCode';

export default function (remote, local) {
  // findCharCode([...])는 기존 코드의 동일 util을 사용한다고 가정합니다.
  const T = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // "true" 토큰
  const F = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // "false" 토큰
  const TOK = [T, F]; // index 0 -> T, index 1 -> F

  // 빠른 타입 판별(난독화 겸용)
  const isStr = (v) => (typeof v === 'string');
  const isBool = (v) => (v === true || v === false);

  // 문자열 토큰을 불리언으로 복호화(null: 토큰 아님)
  const toBool = (s) => (s === T ? true : (s === F ? false : null));

  // 1) remote: 비어있지 않은 문자열이면 바로 조작
  if (isStr(remote) && remote !== '') return true;

  // 2) local: 값이 제공(빈문자열 아님)됐다면, 허용 토큰/불리언만 통과
  if (local !== '') {
    // toBool(local) === null 이면서 불리언도 아니면 허용 아님
    if (toBool(local) === null && !isBool(local)) return true;
  };

  // 3) 테이블 기반 상호 제약 검증 (조기 반환으로 분기 최소화)
  // remote가 불리언이면 local은 반드시 TOK[+remote] 이어야 함 (false->T, true->F)
  if (isBool(remote)) {
    if (local !== TOK[+remote]) return true;
  };

  // local이 불리언이면 remote는 반드시 TOK[+local] 이어야 함
  if (isBool(local)) {
    if (remote !== TOK[+local]) return true;
  };

  // 모든 검사 통과
  return false;
};
