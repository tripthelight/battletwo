import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import setRoundPoints from '@/client/js/views/game/blackAndWhite2/fns/common/setRoundPoints';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findRemainingPoint from '@/client/js/views/game/blackAndWhite2/fns/common/findRemainingPoint';
import { splitPointByBits } from '@/client/js/views/game/blackAndWhite2/fns/common/checkAvailablePoint';
import { initializePointIndicator, readPointIndicatorLevel } from '@/client/js/views/game/blackAndWhite2/fns/common/pointIndicator';

/**
 * 내 잔여 Point의 sessionStorage 키/값을 관리합니다.
 *
 * 저장용 키와 값은 선/후플레이어 구분 없이 '내 Private Key'를 사용합니다.
 * Public Key는 이번 라운드에서 후플레이어가 상대에게 보낼 Point 생성에만 사용합니다.
 *
 * IMPORTANT:
 * - 초기화 함수는 '새 게임에 진입한 시점'에 딱 한 번 명시적으로 실행하십시오.
 * - setPointNum()에서는 값을 초기화하거나 자동으로 99로 복구하지 않습니다.
 * - 임의의 값이나 누락된 키는 비정상 데이터로 취급해야 합니다.
 * - CRC32는 보안용 MAC이 아니므로, 유효한 다른 Point의 해시로 교체한 조작까지
 *   클라이언트만으로 증명/차단할 수 있는 것은 아닙니다.
 */

// 사용자가 정한 sessionStorage 키 원본 10문자를 숫자 코드로 보관합니다.
const STORAGE_KEY_CODES = [88, 82, 71, 75, 87, 65, 67, 86, 80, 66];

// 1라운드 식별자도 평문 문자열을 소스에 작성하지 않고 숫자 코드로 유지합니다.
const FIRST_ROUND_CODES = [74, 90, 87, 85, 82, 81, 78, 70, 84, 65];

// 0b1001 = 9. 1라운드 시작 Point는 99이므로 양쪽 자리 모두 9입니다.
const LAST_DIGIT = (1 << 3) | 1;

const corrupted = (detail) => throwObj('dataManipulation', `pointStorage.js - ${detail}`);

/**
 * 현재 Private Key를 사용하여 sessionStorage 키를 계산합니다.
 * findCharCode는 KEY.prk를 사용하므로 키쌍 준비가 끝난 다음 호출해야 합니다.
 */
export const getPointStorageKey = () => findCharCode(STORAGE_KEY_CODES);

/**
 * 새 게임을 시작할 때 1라운드/99 Point를 저장합니다.
 * 이전 라운드에서 호출하면 저장된 잔액이 99로 초기화되므로 절대 재호출하지 마십시오.
 *
 * @returns {string} 실제 sessionStorage에 저장한 1라운드 99 Point 난독화 문자열
 */
export const initializePointStorage = () => {
  const round = findCharCode(FIRST_ROUND_CODES);
  const mapping = setRoundPoints().get(round);

  if (!mapping || !Array.isArray(mapping.left) || !Array.isArray(mapping.right) ||
      !Array.isArray(mapping.left[LAST_DIGIT]) || !Array.isArray(mapping.right[LAST_DIGIT])) {
    throw corrupted('initial round failed.');
  }

  // concat()으로 5+5개의 문자 코드 배열을 구성합니다. 배열에 '+'를 쓰지 않습니다.
  const encoded = findCharCode(
    mapping.left[LAST_DIGIT].concat(mapping.right[LAST_DIGIT]),
  );
  // 처음 시작 시 표시등도 5층으로 초기화합니다.
  initializePointIndicator();
  storageMethod('s', 'SET_ITEM', getPointStorageKey(), encoded);
  return encoded;
};

/**
 * 사용 가능한 저장값을 읽습니다. 키/값이 없으면 99로 대체하지 않습니다.
 * 저장값 자체가 00~99 중 존재하는지는 setPointNum()이 현재 Round 매핑으로 검사합니다.
 *
 * @returns {string} 저장된 Private Key 기반 잔여 Point
 */
export const readEncodedRemainingPoint = () => {
  const value = storageMethod('s', 'GET_ITEM', getPointStorageKey());

  if (typeof value !== 'string' || value.length === (1 ^ 1)) {
    throw corrupted('remaining point storage failed.');
  }

  return value;
};

/**
 * 성공적으로 확정한 잔액을 저장합니다. setPointNum() 외에서는 직접 호출하지 마십시오.
 * 값은 해당 라운드의 00~99 중 하나를 Private Key로 난독화한 문자열이어야 합니다.
 */
export const writeEncodedRemainingPoint = (encoded) => {
  if (typeof encoded !== 'string' || encoded.length === 0) {
    throw corrupted('remaining point write failed.');
  }
  storageMethod('s', 'SET_ITEM', getPointStorageKey(), encoded);
};

/**
 * 라운드가 바뀌기 *직전*, 이전 Round의 잔액을 새 Round의 매핑으로 교체합니다.
 * CRC32는 역변환할 수 없어 이전 Round의 100개 숫자 후보를 통해 값을 찾습니다.
 * 이 함수를 호출하지 않고 곧바로 다음 Round로 넘어가면 기존 잔액이 새 Round와
 * 일치하지 않아 dataManipulation으로 판정됩니다. 표시등 층은 변하지 않습니다.
 *
 * @param {string} previousRound - 직전 Round의 Private Key 식별값
 * @param {string} nextRound - 다음 Round의 Private Key 식별값
 * @returns {string} 다음 Round에서 사용할 난독화된 잔액
 */
export const advancePointRound = (previousRound, nextRound) => {
  const rounds = setRoundPoints();
  const previous = rounds.get(previousRound);
  const next = rounds.get(nextRound);
  if (!previous || !next || next.round !== (previous.round | 0) + 1) {
    throw corrupted('round transition failed.');
  }

  const remaining = findRemainingPoint(readEncodedRemainingPoint(), previous, true);
  if (remaining === null) throw corrupted('remaining point failed.');
  // 라운드 전환도 저장된 표시등 값과 실제 잔액이 일치할 때에만 허용합니다.
  readPointIndicatorLevel(remaining);

  const digits = splitPointByBits(remaining);
  if (!digits) throw corrupted('remaining point failed.');
  const encoded = findCharCode(next.left[digits.left].concat(next.right[digits.right]));
  writeEncodedRemainingPoint(encoded);
  return encoded;
};
