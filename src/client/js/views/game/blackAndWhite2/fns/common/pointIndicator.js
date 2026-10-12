import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

/**
 * 개인 표시등 상태를 sessionStorage에 저장하고, 상대에게 전달할 때에만
 * Public Key 기반 CRC32로 변환합니다.
 *
 * [저장값과 전송값을 분리하는 이유]
 * - 저장 key와 최초 5층 value는 요청하신 대로 Private Key(findCharCode)를 사용합니다.
 * - 모든 층을 Private Key 값으로 *일관되게* 저장합니다. 그래야 저장값 조작을
 *   이전/이후 단계 모두 검증할 수 있고 첫 저장값도 요청하신 값과 일치합니다.
 * - 상대가 읽을 층 변경 알림만 Public Key(findCharDecCode)로 반환합니다.
 * - 빈값/임의문자/저장된 층과 실제 잔액의 층 불일치는 dataManipulation 오류입니다.
 */
const STORAGE_KEY_CODES = [67, 81, 75, 89, 76, 87, 65, 68, 90, 71];

// 1~5층. 모든 문자열은 10자리 문자 코드만 유지합니다.
const LEVEL_CODES = [
  [70, 80, 84, 67, 89, 81, 78, 66, 90, 65], // 1층: 0~19
  [77, 83, 81, 70, 69, 90, 78, 66, 82, 80], // 2층: 20~39
  [69, 86, 74, 81, 67, 77, 76, 90, 79, 65], // 3층: 40~59
  [83, 90, 80, 68, 75, 82, 76, 73, 77, 87], // 4층: 60~79
  [70, 80, 65, 67, 69, 82, 81, 86, 78, 84], // 5층: 80~99
];

const corrupted = (detail) => throwObj('dataManipulation', `pointIndicator.js - ${detail}`);

/** 2의 보수를 이용한 뺄셈. 의도적으로 일반 산술 부호는 사용하지 않습니다. */
const addByBits = (a, b) => {
  let bits = a | 0;
  let carry = b | 0;
  while (carry !== 0) {
    const shared = bits & carry;
    bits = (bits | carry) & ~shared; // XOR와 같은 합 비트
    carry = shared << 1; // 올림 비트
  }
  return bits;
};
const subtractByBits = (a, b) => addByBits(a, addByBits(~b, 1));

/** 남은 포인트(0~99)를 ON 표시등 층(1~5)으로 계산합니다. */
export const getPointIndicatorLevel = (remaining) => {
  const MAX = (1 << 6) | (1 << 5) | (1 << 1) | 1; // 99
  if (!Number.isInteger(remaining) || remaining !== (remaining | 0) ||
      (remaining >>> 31) !== 0 || (subtractByBits(MAX, remaining) >>> 31) !== 0) {
    throw corrupted('remaining point failed.');
  }

  // 20,40,60,80을 각각 넘는지 판단하고 1층부터 개수를 누적합니다.
  // (a-b) >>> 31은 a<b일 때 1, 아닐 때 0입니다. ^1로 비교를 뒤집습니다.
  // 경계값 20은 (1<<4)|(1<<2), 이후에는 비트 덧셈으로 20씩 이동합니다.
  const STEP = (1 << 4) | (1 << 2);
  const END = 1 << 6 | 1 << 4; // 80
  let level = 1;
  for (let threshold = STEP; threshold <= END; threshold = addByBits(threshold, STEP)) {
    const meetsBoundary = ((subtractByBits(remaining, threshold) >>> 31) ^ 1) & 1;
    level = addByBits(level, meetsBoundary);
  }
  return level;
};

export const getPointIndicatorStorageKey = () => findCharCode(STORAGE_KEY_CODES);

/** 새 게임일 때만 호출. 5층 개인 저장값은 Private Key 기반입니다. */
export const initializePointIndicator = () => {
  const encoded = findCharCode(LEVEL_CODES[(1 << 2)]); // 인덱스 4 → 5층
  storageMethod('s', 'SET_ITEM', getPointIndicatorStorageKey(), encoded);
  return encoded;
};

/** 현재 저장된 표시등 값을 읽어 유효한 Private Key 기반 층으로 조회합니다. */
export const readPointIndicatorLevel = (remaining) => {
  const stored = storageMethod('s', 'GET_ITEM', getPointIndicatorStorageKey());
  if (typeof stored !== 'string' || stored.length === 0) {
    throw corrupted('indicator storage failed.');
  }

  let found = 0;
  for (let idx = 0; idx < LEVEL_CODES.length; idx = addByBits(idx, 1)) {
    if (findCharCode(LEVEL_CODES[idx]) === stored) {
      if (found !== 0) throw corrupted('indicator collision failed.');
      found = addByBits(idx, 1);
    }
  }
  if (found === 0 || found !== getPointIndicatorLevel(remaining)) {
    throw corrupted('indicator value failed.');
  }
  return found;
};

/** 저장 실패 시 원래 값을 복원하기 위한 내부 상태 보조 함수입니다. */
export const readEncodedPointIndicator = () =>
  storageMethod('s', 'GET_ITEM', getPointIndicatorStorageKey());

export const restoreEncodedPointIndicator = (encoded) => {
  storageMethod('s', 'SET_ITEM', getPointIndicatorStorageKey(), encoded);
};

/**
 * 포인트가 확정된 직후에 호출됩니다.
 * @param {number} remainingBefore - 차감 전 잔액
 * @param {number} remainingAfter - 차감 후 잔액
 * @returns {string|null} 표시등이 줄어들었다면 새로운 층의 Public Key 난독화값,
 *   변동 없으면 null. 저장은 개인 Private Key 난독화값으로 수행됩니다.
 *
 * 상대는 단계가 바뀐 경우에만 반환 문자열을 받으면 됩니다.
 */
export const updatePointIndicator = (remainingBefore, remainingAfter) => {
  const oldLevel = readPointIndicatorLevel(remainingBefore);
  const newLevel = getPointIndicatorLevel(remainingAfter);

  // 잔액 차감으로 층이 올라갈 수는 없습니다.
  if (newLevel > oldLevel) throw corrupted('indicator progression failed.');
  if (newLevel === oldLevel) return null;

  // sessionStorage는 내 Private Key, 전송 예정 결과는 Public Key입니다.
  storageMethod('s', 'SET_ITEM', getPointIndicatorStorageKey(), findCharCode(LEVEL_CODES[addByBits(newLevel, ~0)]));
  return findCharDecCode(LEVEL_CODES[addByBits(newLevel, ~0)]);
};
