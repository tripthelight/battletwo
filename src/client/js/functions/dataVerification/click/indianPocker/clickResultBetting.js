import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * clickResultBetting
 * 두 peer 모두 선플레이어 결정 카드를 선택 후 안내팝업의 X 버튼 클릭
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @param {string} result 선플레이어 결과 - [start: 내가 높음 | end: 내가 낮음 | tie: 같은 카드]
 * @returns
 */
export default (storageKeys, result) => {
  // 필요한 키 모두 있는지 확인
  const allExist = storageKeys.every((k) => sessionStorage.getItem(k) !== null);
  if (!allExist) {
    throw throwObj('sessionStorageLoss', 'choiceCard gameState sessionStorage key manipulat.');
  };

  // betUser, betUserFirst 검증 (tie일 경우 빈값)
  booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

  // ────────────────────────────────────────────────────────────
  // ** local Player가 betUser, betUserFirst sessionStorage 조작했는지 체크
  // ── 상수 복원(한 번만): 'true' / 'false' / 키들
  const Vt = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]);         // "true"
  const Vf = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]);         // "false"
  const K1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]);         // "betUser"
  const K2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]);         // "betUserFirst"

  // ── 현재 값 2개만 접근(없으면 빈문자와 동일 취급)
  const A = window.sessionStorage.getItem(K1) ?? '';
  const B = window.sessionStorage.getItem(K2) ?? '';

  // ── result → 인덱스: 첫 글자 코드만으로 매핑 (s/e/t 고유)
  // 'start'(115) → 0, 'end'(101) → 1, 'tie'(116) → 2
  const r0 = result && result.charCodeAt(0);
  const ix = (r0 === 115 ? 0 : (r0 === 101 ? 1 : 2));

  // ── 기대값 테이블(분기 제거)
  // 0: start → [true, true], 1: end → [false, false], 2: tie → ['', '']
  const E0 = ix === 0 ? Vt : (ix === 1 ? Vf : '');
  const E1 = E0; // 두 값 동일 패턴

  // ── 메시지 테이블(실패 지점에 따라 하나만 선택)
  const M = [
    ['start as betUser value manipulat.',      'start as betUserFirst value manipulat.'],
    ['end as betUser value manipulat.',        'end as betUserFirst value manipulat.'],
    ['tie as betUser value manipulat.',        'tie as betUserFirst value manipulat.']
  ];

  // ── 상수시간 비교(비트 연산으로 합성, 분기 최소화)
  // c0=첫 값 일치여부, c1=두 번째 값 일치여부
  const c0 = (A === E0) | 0;
  const c1 = (B === E1) | 0;

  // 둘 다 맞으면 종료, 아니면 어느 쪽 실패인지에 따라 메시지 선택
  // 우선순위: betUser(A) 검증 실패가 있으면 그 메시지, 아니면 betUserFirst(B)
  // (원래 코드의 순차 검증과 동일한 관찰 가능 행태)
  if ((c0 & c1) !== 1) {
    const msg = (c0 === 0 ? M[ix][0] : M[ix][1]);
    throw throwObj('sessionStorageLoss', msg);
  };
  // ────────────────────────────────────────────────────────────

  // 문자열 결과를 바로 값으로 매핑
  const mapped = ({ start: true, end: false, tie: '' })[result];
  if (![true, false, ''].includes(mapped)) {
    throw throwObj('errorComn', `choiceCard end state X button click error: ${result}`);
  };

  request('requestCompairResultBetting', {
    result,
    resultStorage: {
      valRemoteBetUser: mapped,
      valRemoteBetUserFirst: mapped,
    },
  });
};
