import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

/**
 * Black And White II — 이번 Round에서 사용한 Point의 흑/백 정보.
 *
 * - 00~09 Point: 검은색 (배열 인덱스 0).
 * - 10~99 Point: 흰색   (배열 인덱스 1).
 * - 내 sessionStorage key/value는 모두 Private Key(findCharCode)를 사용합니다.
 * - 상대에게 전달할 값만 Public Key(findCharDecCode)를 사용합니다.
 * - Round마다 색상 코드가 달라집니다. 다른 Round의 값을 재사용하지 마십시오.
 * - 모든 코드는 숫자 배열로 보관하며 평문 난독화 문자열을 소스에 기록하지 않습니다.
 */
const STORAGE_KEY_CODES = [84, 81, 79, 78, 83, 73, 75, 90, 65, 72];

// 각 행은 [검정, 흰색], 행 인덱스는 (Round - 1)입니다.
const ROUND_COLOR_CODES = [
  [
    [73, 76, 65, 80, 90, 69, 75, 84, 72, 66],
    [65, 83, 71, 81, 89, 90, 72, 70, 82, 77],
  ],
  [
    [73, 77, 83, 69, 80, 66, 86, 88, 79, 78],
    [68, 88, 85, 73, 90, 83, 79, 65, 76, 71],
  ],
  [
    [74, 81, 69, 89, 90, 76, 70, 79, 78, 83],
    [69, 66, 74, 81, 65, 76, 70, 85, 73, 75],
  ],
  [
    [78, 88, 75, 72, 67, 79, 74, 82, 66, 71],
    [70, 76, 85, 68, 84, 66, 89, 79, 80, 75],
  ],
  [
    [79, 90, 81, 65, 80, 68, 84, 89, 82, 72],
    [71, 70, 88, 67, 90, 76, 74, 75, 66, 86],
  ],
  [
    [81, 73, 74, 79, 87, 71, 89, 66, 68, 84],
    [72, 85, 71, 65, 73, 90, 79, 66, 83, 87],
  ],
  [
    [85, 66, 72, 76, 87, 75, 70, 84, 79, 68],
    [78, 84, 76, 86, 82, 69, 73, 80, 87, 77],
  ],
  [
    [85, 72, 75, 80, 77, 76, 87, 88, 67, 82],
    [86, 67, 76, 81, 77, 74, 70, 80, 88, 72],
  ],
  [
    [85, 81, 67, 73, 86, 65, 82, 90, 87, 69],
    [89, 73, 88, 72, 70, 67, 77, 68, 75, 83],
  ],
];

const corrupted = (detail) => throwObj('dataManipulation', `pointColor.js - ${detail}`);

/**
 * 2의 보수에 의한 덧셈: OR/AND/NOT가 합 비트, AND와 <<가 올림입니다.
 * (left | right) & ~(left & right)는 left ^ right와 같습니다.
 * 작은 인덱스 계산도 기존 게임의 비트연산 스타일을 유지합니다.
 */
const addByBits = (a, b) => {
  let value = a | 0;
  let carry = b | 0;
  while (carry !== (1 ^ 1)) {
    const overlap = value & carry;
    value = (value | carry) & ~overlap;
    carry = overlap << 1;
  }
  return value;
};

const subtractByBits = (a, b) => addByBits(a, addByBits(~b, 1));

export const getPointColorStorageKey = () => findCharCode(STORAGE_KEY_CODES);

/**
 * @param {number} round - 기존 setRoundPoints().get(_rnd).round (1~9)
 * @param {number} used - checkAvailablePoint()에서 검증된 사용 포인트 (0~99)
 * @returns {{ encodedStorageValue:string, colorValue:string }}
 * 저장/송신용 토큰을 먼저 모두 계산하고, 여기서는 저장소를 변경하지 않습니다.
 */
export const preparePointColor = (round, used) => {
  // 9비트 범위만 허용한 다음 부호 비트를 사용해 경계를 검사합니다.
  // 1..9 Round, 0..99 Point가 아니면 데이터 조작 오류로 처리합니다.
  const lastRound = ROUND_COLOR_CODES.length;
  const maxPoint = (1 << 6) | (1 << 5) | (1 << 1) | 1; // 99
  if (!Number.isInteger(round) || round !== (round | 0) ||
      (subtractByBits(round, 1) >>> 31) !== 0 ||
      (subtractByBits(lastRound, round) >>> 31) !== 0) {
    throw corrupted('round failed.');
  }
  if (!Number.isInteger(used) || used !== (used | 0) ||
      (used >>> 31) !== 0 ||
      (subtractByBits(maxPoint, used) >>> 31) !== 0) {
    throw corrupted('point failed.');
  }

  // 10 = (1 << 3) | (1 << 1).
  // (used - 10) >>> 31 → 0~9에서 1(음수), 10~99에서 0(비음수).
  // ^1로 비트를 반전하면 검정=0 / 흰색=1 인덱스가 만들어집니다.
  const TEN = (1 << 3) | (1 << 1);
  const whiteIndex = ((subtractByBits(used, TEN) >>> 31) ^ 1) & 1;
  const roundIndex = subtractByBits(round, 1);
  const colorCodes = ROUND_COLOR_CODES[roundIndex][whiteIndex];

  return {
    encodedStorageValue: findCharCode(colorCodes),
    colorValue: findCharDecCode(colorCodes),
  };
};

/**
 * 이전 색상 상태를 읽습니다. 첫 Point 입력 전에는 key가 없을 수 있으므로 null 허용.
 * 값이 있다면 과거/현재 9개 Round × 흑백 2개 중 유일하게 일치해야 합니다.
 * 이전 Round의 색상값은 다음 Round 첫 입력 전까지 저장되어 있을 수 있습니다.
 */
export const readEncodedPointColor = () => {
  const value = storageMethod('s', 'GET_ITEM', getPointColorStorageKey());
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string' || value.length === 0) {
    throw corrupted('color storage failed.');
  }

  let count = 0;
  for (let round = 0; round < ROUND_COLOR_CODES.length; round = addByBits(round, 1)) {
    for (let color = 0; color < (1 << 1); color = addByBits(color, 1)) {
      if (value === findCharCode(ROUND_COLOR_CODES[round][color])) {
        count = addByBits(count, 1);
      }
    }
  }
  if (count !== 1) throw corrupted('color value failed.');
  return value;
};

/** 성공적으로 Point 사용이 확정되었을 때에만 호출하세요. */
export const writeEncodedPointColor = (value) => {
  if (typeof value !== 'string' || value.length === 0) {
    throw corrupted('color write failed.');
  }
  storageMethod('s', 'SET_ITEM', getPointColorStorageKey(), value);
};
