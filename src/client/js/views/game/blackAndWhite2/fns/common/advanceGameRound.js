import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import setRoundPoints from '@/client/js/views/game/blackAndWhite2/fns/common/setRoundPoints';
import findRemainingPoint from '@/client/js/views/game/blackAndWhite2/fns/common/findRemainingPoint';
import { readPointIndicatorLevel } from '@/client/js/views/game/blackAndWhite2/fns/common/pointIndicator';
import {
  advancePointRound,
  readEncodedRemainingPoint,
  writeEncodedRemainingPoint,
} from '@/client/js/views/game/blackAndWhite2/fns/common/pointStorage';

/**
 * Black And White II — 라운드 완료 시 상태 전환.
 *
 * [기존 파일과의 연결]
 * - setPointNum(): 사용자 Point의 차감·표시등 변경을 이미 확정함. 여기서 재차 차감하지 않음.
 * - comparePointNum(): 결과는 호출부에서 처리함. 이 함수에서 승패를 재계산하지 않음.
 * - pointStorage.advancePointRound(): 기존 Round의 잔액을 다음 Round 코드로 재난독화.
 * - sessionStorage는 반드시 공통 storageMethod('s', ...)만 사용.
 *
 * [Round 값이 서로 다른 이유]
 * - 내 sessionStorage Round key/value: 내 Private Key 기반 findCharCode().
 * - 상대에게 전달·대조할 완료 Round: 두 플레이어에게 공통인 Public Key 기반
 *   findCharDecCode(). 내 Private Key 해시를 상대에게 그대로 전송하면 서로 다른
 *   개인 키 때문에 동일한 Round라도 같은 문자열로 비교할 수 없습니다.
 *
 * [호출 시점]
 * - 선플레이어: comparePointNum()으로 결과를 구한 다음 advanceGameRound(true).
 * - 후플레이어: 결과 + 완료 Round 값을 수신한 다음 advanceGameRound(false, receivedRound).
 * - 동일한 라운드 결과로 두 번 호출하면 안 됩니다. 통신 중복 메시지나 재전송 중복
 *   방지는 향후 게임 상태/메시지 ID 관리부에서 별도로 처리하십시오.
 */

// 사용자가 지정한 sessionStorage Round 키. 평문 문자열 상수는 두지 않습니다.
const ROUND_STORAGE_KEY_CODES = [71, 72, 87, 84, 69, 74, 70, 82, 66, 78];

// Round 1~9 고유 코드. 기존 setRoundPoints() 매핑의 식별자와 동일하게 유지합니다.
const ROUND_CODES = [
  [74, 90, 87, 85, 82, 81, 78, 70, 84, 65],
  [76, 88, 90, 81, 82, 72, 85, 71, 86, 66],
  [80, 66, 88, 74, 85, 68, 82, 90, 84, 83],
  [79, 78, 84, 77, 73, 85, 89, 88, 75, 70],
  [68, 74, 78, 90, 73, 76, 67, 65, 85, 77],
  [82, 81, 77, 83, 84, 88, 74, 69, 67, 80],
  [89, 83, 75, 67, 81, 76, 70, 65, 80, 88],
  [66, 88, 72, 76, 89, 78, 86, 68, 74, 87],
  [89, 72, 81, 88, 65, 78, 74, 83, 84, 85],
];

const corrupted = (detail) => throwObj('dataManipulation', `advanceGameRound.js - ${detail}`);

/**
 * a ^ b == (a | b) & ~(a & b) 입니다. 올림 비트를 별도 시프트하여
 * 32비트 정수 덧셈을 수행합니다. 여기서는 0~9만 다루므로 오버플로가 없습니다.
 */
const addByBits = (a, b) => {
  let result = a | 0;
  let carry = b | 0;
  while (carry !== (1 ^ 1)) {
    const overlap = result & carry;
    result = (result | carry) & ~overlap;
    carry = overlap << 1;
  }
  return result;
};

export const getRoundStorageKey = () => findCharCode(ROUND_STORAGE_KEY_CODES);

/**
 * 새 게임 시작 시에만 실행하세요. 기존 잔액/표시등은 수정하지 않습니다.
 * pointStorage.initializePointStorage()와 함께 게임 시작 초기화에서 1회 호출합니다.
 * @returns {string} 개인 Private Key 기반 1 Round value
 */
export const initializeRoundStorage = () => {
  const round = findCharCode(ROUND_CODES[0]);
  if (setRoundPoints().get(round)?.round !== 1) {
    throw corrupted('initial round failed.');
  }
  storageMethod('s', 'SET_ITEM', getRoundStorageKey(), round);
  return round;
};

/**
 * 저장된 Round 문자열이 1~9 중 유일하게 한 개와 일치하는지 확인합니다.
 * 복호화가 불가능한 CRC32이므로 Round 후보 9개를 실제 Private Key로 변환해 검사합니다.
 * 임의 문자열 / 누락 / 해시 충돌 / 매핑 불일치 → dataManipulation.
 */
export const readCurrentRound = () => {
  const encoded = storageMethod('s', 'GET_ITEM', getRoundStorageKey());
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw corrupted('round storage failed.');
  }

  let found = ~0; // -1: 발견되지 않음. 유효한 인덱스 0~8과 구별합니다.
  for (let index = 0; index < ROUND_CODES.length; index = addByBits(index, 1)) {
    if (encoded !== findCharCode(ROUND_CODES[index])) continue;
    if (found !== ~0) throw corrupted('round collision failed.');
    found = index;
  }
  if (found === ~0) throw corrupted('round value failed.');

  // 현재 난독화값이 기존 setRoundPoints()와 같은 라운드를 가리키는지 이중 검증합니다.
  const point = setRoundPoints().get(encoded);
  if (!point || point.round !== addByBits(found, 1)) {
    throw corrupted('round mapping failed.');
  }

  return { number: point.round, index: found, encoded };
};

/**
 * 진행중인 라운드의 Public Key 기반 식별자입니다.
 * 원격 플레이어에게는 이 값을 보내고, 내 로컬 저장소에는 Private Key 값을 유지합니다.
 * @returns {string} 상대와 공유할 현재 Round 토큰
 */
export const getRoundValueForPeer = () => {
  const current = readCurrentRound();
  return findCharDecCode(ROUND_CODES[current.index]);
};

/**
 * 완료된 한 라운드의 결과를 반영합니다. 승패 판정/승점/통신은 담당하지 않습니다.
 *
 * @param {boolean} _fst - true: 선플레이어(로컬 비교 종료), false: 후플레이어(결과 수신)
 * @param {string} [_receivedRound] - 후플레이어가 받은 '완료 Round'의 Public Key 값.
 *   반드시 현재 저장된 Round와 같은 번호여야 합니다. 누락/오류도 데이터 조작으로 처리.
 *
 * @returns {{status:'nextRound',completedRound:string,nextRound:string} |
 *           {status:'gameOver',completedRound:string,nextRound:null}}
 *   completedRound: 두 플레이어가 공유할 '완료된' 라운드의 Public Key 값.
 *   nextRound: 다음 setPointNum()에 전달할 '새' Private Key 기반 Round 값.
 *   Round 9에서는 보유 Point·표시등·Round 저장값을 그대로 유지하고 gameOver 반환.
 */
export default (_fst, _receivedRound) => {
  if (typeof _fst !== 'boolean') throw corrupted('player failed.');

  // ① 먼저 로컬 sessionStorage Round를 검증합니다.
  const current = readCurrentRound();
  const completedRound = findCharDecCode(ROUND_CODES[current.index]);

  // ② 후플레이어는 상대에게 받은 Round와 내 Round가 정확히 같은지 검증합니다.
  // 선플레이어는 Round를 보내는 쪽이므로 수신값을 받지 않습니다.
  if (_fst) {
    if (_receivedRound !== undefined) throw corrupted('unexpected received round.');
  } else if (typeof _receivedRound !== 'string' || _receivedRound !== completedRound) {
    throw corrupted('remote round mismatch.');
  }

  // ③ 마지막 9 Round: 다음 Round/잔여 Point 매핑이 존재하지 않습니다.
  // 저장값 조작이 없는지만 검사한 뒤 게임 종료 신호를 반환합니다.
  if (current.index === addByBits(ROUND_CODES.length, ~0)) {
    const map = setRoundPoints().get(current.encoded);
    const remaining = findRemainingPoint(readEncodedRemainingPoint(), map, true);
    if (remaining === null) throw corrupted('remaining point failed.');
    readPointIndicatorLevel(remaining);
    return { status: 'gameOver', completedRound, nextRound: null };
  }

  // ④ 다음 Round의 Private Key 식별자를 만들고 기존 매핑에서 유효성을 확인합니다.
  const nextIndex = addByBits(current.index, 1);
  const nextRound = findCharCode(ROUND_CODES[nextIndex]);
  if (setRoundPoints().get(nextRound)?.round !== addByBits(current.number, 1)) {
    throw corrupted('next round mapping failed.');
  }

  // ⑤ 기존 advancePointRound()가 잔액·표시등을 검증한 뒤, 잔액을 다음 Round에
  // 대응하는 Private Key 값으로 변환합니다. *그 후* Round key를 새 값으로 교체합니다.
  // 일반 sessionStorage에는 다중 SET 트랜잭션이 없으므로 저장 도중 오류가 나면
  // 원래 잔액과 Round를 가능한 한 복원합니다.
  const previousRemaining = readEncodedRemainingPoint();
  try {
    advancePointRound(current.encoded, nextRound);
    storageMethod('s', 'SET_ITEM', getRoundStorageKey(), nextRound);
  } catch (error) {
    try {
      writeEncodedRemainingPoint(previousRemaining);
      storageMethod('s', 'SET_ITEM', getRoundStorageKey(), current.encoded);
    } catch (rollbackError) {
      throw corrupted('storage rollback failed.');
    }
    throw error;
  }

  // ⑥ 완료 Round를 원격 전송할 수 있도록 Public 값으로, 다음 Round는 로컬에서
  // 바로 setPointNum()에 사용할 수 있도록 Private 값으로 구분해 반환합니다.
  return { status: 'nextRound', completedRound, nextRound };
};
