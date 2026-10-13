import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { readCurrentRound, getRoundValueForPeer } from '@/client/js/views/game/blackAndWhite2/fns/common/advanceGameRound';

/**
 * Black And White II - 내 브라우저 기준 Local/Remote 승점 관리.
 *
 * 역할을 명확히 분리합니다.
 * - comparePointNum() : 선플레이어가 점수 비교 후 fstWin / sceWin / tie 생성 (읽기 전용)
 * - updateGameScore(): 각자의 브라우저에서 비교 결과에 따라 승점 1점 갱신
 * - advanceGameRound(): updateGameScore().status === 'nextRound' 일 때만 Round 진행
 *
 * 두 플레이어는 서로 다른 브라우저와 sessionStorage를 사용합니다.
 * 여기서 말하는 'Local'은 선플레이어가 아니라 "현재 내 브라우저의 플레이어"입니다.
 * 따라서 같은 fstWin 결과라도 내 역할이 선인지 후인지에 따라 Local/Remote가 뒤집힙니다.
 *
 * CRC32 기반 Private Key 난독화는 기존 프로젝트 규칙을 유지합니다.
 * 하지만 CRC32 자체는 암호화나 조작 방지 수단이 아닙니다.
 */

// 사용자가 제공한 두 개의 score 저장 키: 모두 내 브라우저의 Private Key 적용.
const LOCAL_SCORE_KEY_CODES = [80, 78, 82, 65, 71, 81, 72, 84, 83, 90];
const REMOTE_SCORE_KEY_CODES = [80, 76, 67, 81, 86, 83, 84, 90, 69, 74];

// 0~9 승점에 대응하는 사용자 지정 문자 코드. 평문 난독화 문자열을 두지 않습니다.
const LOCAL_SCORE_CODES = [
  [65, 69, 83, 78, 73, 68, 67, 87, 66, 80],
  [67, 82, 90, 75, 85, 77, 81, 80, 84, 66],
  [68, 88, 89, 80, 90, 72, 69, 65, 76, 75],
  [69, 73, 82, 72, 79, 80, 85, 90, 83, 87],
  [70, 69, 76, 86, 77, 72, 85, 90, 67, 87],
  [72, 75, 67, 81, 80, 79, 69, 70, 86, 73],
  [73, 79, 77, 74, 72, 78, 65, 83, 81, 86],
  [75, 90, 68, 70, 80, 73, 83, 87, 86, 74],
  [81, 65, 85, 88, 67, 82, 80, 70, 84, 66],
  [89, 75, 73, 67, 66, 77, 90, 74, 65, 79],
];
const REMOTE_SCORE_CODES = [
  [66, 86, 82, 85, 80, 73, 84, 68, 65, 76],
  [67, 78, 69, 79, 84, 86, 88, 85, 87, 89],
  [67, 85, 78, 69, 71, 86, 74, 65, 79, 90],
  [74, 87, 89, 68, 84, 86, 82, 85, 88, 66],
  [76, 71, 89, 83, 74, 79, 72, 65, 70, 75],
  [78, 76, 71, 89, 80, 87, 79, 81, 75, 86],
  [87, 81, 89, 66, 90, 82, 80, 74, 85, 88],
  [88, 82, 66, 80, 78, 85, 90, 79, 72, 71],
  [89, 83, 68, 75, 65, 80, 66, 79, 69, 82],
  [90, 85, 79, 87, 78, 74, 76, 72, 83, 67],
];

// 동일 Round의 중복 결과 반영을 막기 위한 별도 완료-라운드 마커 키입니다.
// 0: 게임 시작 직후(아직 정산한 Round 없음), 1~9: 마지막으로 정산한 Round.
// 이 마커는 승점이 늘어나지 않는 tie에서도 갱신됩니다.
const SETTLED_ROUND_KEY_CODES = [86, 71, 82, 80, 85, 69, 72, 90, 77, 65];
const SETTLED_ROUND_VALUE_CODES = [75, 82, 68, 90, 66, 83, 81, 79, 86, 72];

const corrupt = (detail) => throwObj('dataManipulation', `gameScore.js - ${detail}`);

/**
 * 기존 비트 덧셈 스타일을 유지합니다.
 * (a | b) & ~(a & b)는 두 입력의 XOR과 같습니다.
 * 두 비트가 1로 겹치는 위치(a & b)를 왼쪽으로 이동하여 carry로 재처리합니다.
 * 처리 대상이 0~9이므로 signed 32-bit overflow는 발생하지 않습니다.
 */
const addByBits = (a, b) => {
  let sum = a | 0;
  let carry = b | 0;
  while (carry !== (1 ^ 1)) {
    const overlap = sum & carry;
    sum = (sum | carry) & ~overlap;
    carry = overlap << 1;
  }
  return sum;
};

// a + ~b + 1 = a - b (2의 보수): 일반 뺄셈 연산자 대신 사용합니다.
const subtractByBits = (a, b) => addByBits(a, addByBits(~b, 1));
const FIRST_SCORE = (1 ^ 1);
const WIN_SCORE = (1 << 2) | 1; // 5승: 0b0101
const LAST_ROUND = (1 << 3) | 1; // 9Round: 0b1001

export const getGameScoreStorageKeys = () => ({
  local: findCharCode(LOCAL_SCORE_KEY_CODES),
  remote: findCharCode(REMOTE_SCORE_KEY_CODES),
});

const markerKey = () => findCharCode(SETTLED_ROUND_KEY_CODES);

/**
 * Round 번호를 0~9로 제한한 후, 값 코드 끝 한 자리를 XOR하여 마커를 구성합니다.
 * 0은 초기화, 1~9는 실제 정산이 끝난 Round입니다.
 * 같은 KEY.prk라면 동일한 마커를 만들며, 이를 통해 중복 호출을 확인합니다.
 * (숫자 코드 난독화만 목적이고 위변조 방지용 암호학적 서명은 아닙니다.)
 */
const encodeSettledRound = (round) => {
  if (!Number.isInteger(round) || round < FIRST_SCORE || round > LAST_ROUND) {
    throw corrupt('settled round range failed.');
  }
  const codes = SETTLED_ROUND_VALUE_CODES.slice();
  const last = subtractByBits(codes.length, 1);
  codes[last] = codes[last] ^ round;
  return findCharCode(codes);
};

/**
 * CRC32는 역변환이 불가능하므로 저장된 난독화값이 지정된 코드 0~9 중
 * 정확히 한 곳에만 일치하는지 검사합니다. 중복 매칭도 조작 오류로 취급합니다.
 */
const decodeScore = (key, codes, detail) => {
  const encoded = storageMethod('s', 'GET_ITEM', key);
  if (typeof encoded !== 'string' || encoded.length === FIRST_SCORE) {
    throw corrupt(`${detail} storage failed.`);
  }
  let matched = ~0; // -1 = 아직 발견하지 못함 (0점과 구분).
  for (let index = FIRST_SCORE; index < codes.length; index = addByBits(index, 1)) {
    if (findCharCode(codes[index]) !== encoded) continue;
    if (matched !== ~0) throw corrupt(`${detail} collision failed.`);
    matched = index;
  }
  if (matched === ~0) throw corrupt(`${detail} value failed.`);
  return matched;
};

const readSettledRound = () => {
  const encoded = storageMethod('s', 'GET_ITEM', markerKey());
  if (typeof encoded !== 'string' || encoded.length === FIRST_SCORE) {
    throw corrupt('settled round storage failed.');
  }
  let matched = ~0;
  for (let index = FIRST_SCORE; index <= LAST_ROUND; index = addByBits(index, 1)) {
    if (encodeSettledRound(index) !== encoded) continue;
    if (matched !== ~0) throw corrupt('settled round collision failed.');
    matched = index;
  }
  if (matched === ~0) throw corrupt('settled round value failed.');
  return matched;
};

/**
 * 새 게임에 진입할 때 한 번만 호출합니다 (KEY.prk 준비 및 Round 1 초기화 후 권장).
 * Local/Remote 점수를 각각 0점 Private Key 문자열로 저장하고 중복 반영 방지
 * 마커를 0 Round로 초기화합니다. 이미 진행된 게임 중 재호출하면 점수가 초기화됩니다.
 */
export const initializeGameScore = () => {
  const keys = getGameScoreStorageKeys();
  const encodedLocal = findCharCode(LOCAL_SCORE_CODES[FIRST_SCORE]);
  const encodedRemote = findCharCode(REMOTE_SCORE_CODES[FIRST_SCORE]);
  storageMethod('s', 'SET_ITEM', keys.local, encodedLocal);
  storageMethod('s', 'SET_ITEM', keys.remote, encodedRemote);
  storageMethod('s', 'SET_ITEM', markerKey(), encodeSettledRound(FIRST_SCORE));
  return { localScore: FIRST_SCORE, remoteScore: FIRST_SCORE, scoreText: '0 : 0' };
};

/**
 * 현재 내/상대의 난독화 Score를 숫자로 읽고, Round/정산 상태도 검증합니다.
 * 현재 Round에 대한 결과가 아직 처리되지 않았으면 settledRound = Round-1,
 * 이미 처리했다면 settledRound = Round입니다. 그 외는 정산 누락/역전으로 판정.
 *
 * @returns {{localScore:number,remoteScore:number,scoreText:string,settledRound:number}}
 */
export const readGameScore = () => {
  const round = readCurrentRound();
  const keys = getGameScoreStorageKeys();
  const localScore = decodeScore(keys.local, LOCAL_SCORE_CODES, 'local score');
  const remoteScore = decodeScore(keys.remote, REMOTE_SCORE_CODES, 'remote score');
  const settledRound = readSettledRound();

  // 5승이 나오면 게임이 끝나야 하므로 6~9점은 유효한 난독화 코드라도 거부합니다.
  // 또한 두 플레이어가 동시에 5승일 수는 없습니다.
  if (localScore > WIN_SCORE || remoteScore > WIN_SCORE ||
      (localScore === WIN_SCORE && remoteScore === WIN_SCORE)) {
    throw corrupt('score range failed.');
  }

  const previousRound = subtractByBits(round.number, 1);
  if (settledRound !== previousRound && settledRound !== round.number) {
    throw corrupt('settled round mismatch.');
  }
  const possibleWins = settledRound;
  if (addByBits(localScore, remoteScore) > possibleWins) {
    throw corrupt('score total failed.');
  }
  if (settledRound === previousRound &&
      (localScore === WIN_SCORE || remoteScore === WIN_SCORE)) {
    throw corrupt('already finished.');
  }

  return { localScore, remoteScore, scoreText: `${localScore} : ${remoteScore}`, settledRound };
};

/**
 * Round 결과를 확정하고 현재 플레이어 관점으로 Local/Remote 승점을 갱신합니다.
 *
 * @param {'fstWin'|'sceWin'|'tie'} _result - 선플레이어가 비교한 원본 결과.
 * @param {boolean} _fst - 내 브라우저가 선플레이어이면 true, 후플레이어이면 false.
 * @param {string} [_receivedRound] - 후플레이어가 받은 완료 Round의 Public Key 토큰.
 * @returns {{status:'nextRound'|'gameOver',reason:'fiveWins'|'lastRound'|null,
 *   winner:'local'|'remote'|'tie'|null,fiveWinPlayer:'local'|'remote'|null,
 *   localScore:number,remoteScore:number,
 *   scoreText:string,scored:'local'|'remote'|null,completedRound:string}}
 *
 * 처리 순서:
 *   선: comparePointNum() → updateGameScore(result, true)
 *      → status가 nextRound인 경우 advanceGameRound(true).
 *   후: 결과 + Public 완료 Round 수신 → updateGameScore(result, false, receivedRound)
 *      → status가 nextRound인 경우 advanceGameRound(false, receivedRound).
 *
 * tie는 점수 변경 없이 이번 Round 정산 마커만 갱신합니다.
 */
export default (_result, _fst, _receivedRound) => {
  if (_result !== 'fstWin' && _result !== 'sceWin' && _result !== 'tie') {
    throw corrupt('result failed.');
  }
  if (typeof _fst !== 'boolean') throw corrupt('player failed.');

  const round = readCurrentRound();
  const completedRound = getRoundValueForPeer();
  if (_fst) {
    if (_receivedRound !== undefined) throw corrupt('unexpected received round.');
  } else if (typeof _receivedRound !== 'string' || _receivedRound !== completedRound) {
    throw corrupt('remote round mismatch.');
  }

  const scores = readGameScore();
  if (scores.settledRound === round.number) throw corrupt('round already settled.');

  // fstWin이라면 _fst=true일 때 Local 승리 / _fst=false일 때 Remote 승리.
  // sceWin은 반대입니다. tie에서는 어느 쪽도 증가하지 않습니다.
  const scored = _result === 'tie'
    ? null
    : ((_result === 'fstWin') === _fst ? 'local' : 'remote');

  const localScore = scored === 'local'
    ? addByBits(scores.localScore, 1)
    : scores.localScore;
  const remoteScore = scored === 'remote'
    ? addByBits(scores.remoteScore, 1)
    : scores.remoteScore;

  const fiveWins = localScore === WIN_SCORE || remoteScore === WIN_SCORE;
  const lastRound = round.number === LAST_ROUND;
  const gameOver = fiveWins || lastRound;
  let winner = null;
  if (gameOver) {
    // 9Round에서도 4:4 등 동점일 수 있으므로 'tie'를 별도 지원합니다.
    winner = localScore === remoteScore ? 'tie'
      : localScore > remoteScore ? 'local' : 'remote';
  }

  const keys = getGameScoreStorageKeys();
  const oldLocal = storageMethod('s', 'GET_ITEM', keys.local);
  const oldRemote = storageMethod('s', 'GET_ITEM', keys.remote);
  const oldSettled = storageMethod('s', 'GET_ITEM', markerKey());

  // 여러 키를 SET_ITEM으로 갱신하므로 중간 저장 실패 시 이전 문자열을 복원합니다.
  // 이미 검증한 정해진 키만 사용하며, 저장소 접근은 항상 storageMethod()로 합니다.
  try {
    if (scored === 'local') {
      storageMethod('s', 'SET_ITEM', keys.local, findCharCode(LOCAL_SCORE_CODES[localScore]));
    } else if (scored === 'remote') {
      storageMethod('s', 'SET_ITEM', keys.remote, findCharCode(REMOTE_SCORE_CODES[remoteScore]));
    }
    // tie에서도 기록: 같은 Round 결과를 두 번 처리해 점수가 중복되는 것을 방지.
    storageMethod('s', 'SET_ITEM', markerKey(), encodeSettledRound(round.number));
  } catch (error) {
    try {
      storageMethod('s', 'SET_ITEM', keys.local, oldLocal);
      storageMethod('s', 'SET_ITEM', keys.remote, oldRemote);
      storageMethod('s', 'SET_ITEM', markerKey(), oldSettled);
    } catch (rollbackError) {
      throw corrupt('storage rollback failed.');
    }
    throw error;
  }

  return {
    status: gameOver ? 'gameOver' : 'nextRound',
    reason: fiveWins ? 'fiveWins' : lastRound ? 'lastRound' : null,
    winner,
    fiveWinPlayer: fiveWins ? winner : null,
    localScore,
    remoteScore,
    scoreText: `${localScore} : ${remoteScore}`,
    scored,
    completedRound,
  };
};
