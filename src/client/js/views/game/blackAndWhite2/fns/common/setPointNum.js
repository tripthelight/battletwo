import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode'; // 사용 Point 선플레이어: Private Key 기반 CRC32
import findCharDecCode from '@/client/js/functions/findCharDecCode'; // 사용 Point 후플레이어: Public Key 기반 CRC32
import setRoundPoints from '@/client/js/views/game/blackAndWhite2/fns/common/setRoundPoints';
import checkAvailablePoint, { isPointDigit, splitPointByBits } from '@/client/js/views/game/blackAndWhite2/fns/common/checkAvailablePoint';
import findRemainingPoint from '@/client/js/views/game/blackAndWhite2/fns/common/findRemainingPoint';
import { readEncodedRemainingPoint, writeEncodedRemainingPoint } from '@/client/js/views/game/blackAndWhite2/fns/common/pointStorage';
import { readPointIndicatorLevel, readEncodedPointIndicator, restoreEncodedPointIndicator, updatePointIndicator } from '@/client/js/views/game/blackAndWhite2/fns/common/pointIndicator';
import { preparePointColor, readEncodedPointColor, writeEncodedPointColor } from '@/client/js/views/game/blackAndWhite2/fns/common/pointColor';

/**
 * 실제 sessionStorage에 저장된 '내 잔여 Point'를 검증하고 사용 Point를 난독화합니다.
 *
 * [중요: 두 종류의 결과]
 * 1) 정상 선택: {status:'ok', encodedPoint, indicatorValue, colorValue} 객체 반환.
 * 2) 보유 포인트 초과: 예외를 던지지 않고 status가 'insufficientPoints'인 객체 반환.
 * 3) 키 누락/잔액 문자열 변조/Round 조작 등: throwObj('dataManipulation', ...)로 예외 전파.
 *
 * [Private/Public Key 역할]
 * 두 플레이어 모두 자신의 sessionStorage 잔액은 Private Key로 난독화하여 저장합니다.
 * 이번에 사용할 Point만 선플레이어 Private Key, 후플레이어 Public Key로 처리합니다.
 *
 * [다섯 번째 인자]
 * 이전 코드 호환을 위해 선택 사항으로 남겼습니다.
 * 전달되면 sessionStorage 값과 반드시 일치해야 합니다. '전달값만' 믿지 않으므로
 * 임의로 99에 대응하는 다른 문자열을 넣어 잔액 검사를 우회하지 못하게 합니다.
 * 이 인자를 생략하면 저장된 값을 자동 사용합니다. (새 코드에서 권장)
 *
 * @param {number} _l - 이번에 사용할 Point의 십의 자리 (0~9)
 * @param {number} _r - 이번에 사용할 Point의 일의 자리 (0~9)
 * @param {string} _rnd - Private Key 기반 현재 Round 식별자
 * @param {boolean} _fst - true: 선플레이어 | false: 후플레이어
 * @param {string} [_encodedRemainingPoint] - 선택적: 저장된 잔액과 대조할 문자열
 * @returns {{status:'ok',encodedPoint:string,indicatorValue:string|null,colorValue:string}|
 *           {status:'insufficientPoints',requested:number,remaining:number,shortage:number}}
 * @throws {object} throwObj로 만든 dataManipulation 예외 (공통 에러 처리기로 전달 필요)
 */
export default (_l, _r, _rnd, _fst, _encodedRemainingPoint) => {
  const point = setRoundPoints().get(_rnd);

  if (!point) {
    throw throwObj('dataManipulation', 'setPointNum.js - round failed.');
  }

  if (!isPointDigit(_l)) {
    throw throwObj(
      'dataManipulation',
      `setPointNum.js - round ${point.round} point left number failed.`,
    );
  }

  if (!isPointDigit(_r)) {
    throw throwObj(
      'dataManipulation',
      `setPointNum.js - round ${point.round} point right number failed.`,
    );
  }

  if (typeof _fst !== 'boolean') {
    throw throwObj('dataManipulation', 'setPointNum.js - player failed.');
  }

  // 절대 _encodedRemainingPoint만으로 잔액을 판정하지 않습니다.
  // key가 삭제/변조되었거나 value가 비었다면 readEncodedRemainingPoint()가 즉시 예외 처리합니다.
  const storedEncodedRemaining = readEncodedRemainingPoint();

  // 다섯 번째 인자와 실제 저장값이 다르면, 저장소를 우회하려는 입력으로 취급합니다.
  // undefined는 인자를 생략한 것이므로 정상입니다. null 또는 잘못된 문자열은 거부합니다.
  if (_encodedRemainingPoint !== undefined && _encodedRemainingPoint !== storedEncodedRemaining) {
    throw throwObj('dataManipulation', 'setPointNum.js - remaining point mismatch.');
  }

  // 저장된 value는 두 플레이어 모두 '나의 Private Key'로 만들어졌습니다.
  // 따라서 사용 Point의 _fst와 관계없이 세 번째 인자는 true입니다.
  // CRC32는 역복호화 불가능: 00~99 후보 중 해시가 유일하게 일치하는 숫자를 찾습니다.
  const remaining = findRemainingPoint(storedEncodedRemaining, point, true);

  // 실제 저장된 값이 임의의 문자이거나 현재 Round/Private Key로 만든 값이 아니면
  // 잔액 부족 안내가 아니라 비정상 데이터 조작 오류를 발생시킵니다.
  if (remaining === null) {
    throw throwObj('dataManipulation', 'setPointNum.js - remaining point failed.');
  }

  // 포인트 값뿐 아니라 저장된 표시등의 현재 층도 검증합니다.
  // 이 검증은 잔액 부족 결과를 내기 전에도 수행합니다.
  readPointIndicatorLevel(remaining);

  // 기존 복잡한 비트연산의 숫자 검증/덧셈/뺄셈 로직을 그대로 재사용합니다.
  const result = checkAvailablePoint(_l, _r, remaining);

  if (!result.available) {
    // 정상 사용자가 잔액을 넘겨 입력한 것과, 데이터 조작은 다른 상황입니다.
    // 전자는 throw 하지 않고 UI가 팝업으로 안내할 수 있도록 반환값을 구분합니다.
    if (result.reason === 'insufficientPoints') {
      return {
        status: 'insufficientPoints',
        requested: result.used,
        remaining: result.remainingBefore,
        shortage: result.shortage,
      };
    }

    throw throwObj('dataManipulation', 'setPointNum.js - remaining point failed.');
  }

  // 숫자 배열을 그대로 연결합니다. '+'는 배열을 문자열로 만들기 때문에 사용하지 않습니다.
  const codes = point.left[_l].concat(point.right[_r]);

  // 사용 포인트는 기존 Key 규칙대로 먼저 생성합니다. 여기서 실패하면 저장값은 불변입니다.
  const encodedPoint = _fst ? findCharCode(codes) : findCharDecCode(codes);

  // 차감된 잔액은 *현재 Round*의 숫자 코드로 다시 변환하여 개인 Private Key로 저장합니다.
  // 선/후플레이어 여부와 무관하게 자신의 sessionStorage는 Private Key 값만 사용합니다.
  // 0~99 잔액을 기존 공통 비트연산 함수로 자리별 숫자로 복원합니다.
  const after = result.remainingAfter;
  const digits = splitPointByBits(after);
  if (!digits) throw throwObj('dataManipulation', 'setPointNum.js - remaining point failed.');
  const encodedRemainingAfter = findCharCode(
    point.left[digits.left].concat(point.right[digits.right]),
  );

  // Round별 흑/백 정보: Private Key 저장값과 Public Key 전달값을 쓰기 전에 준비합니다.
  // 00~09는 검정, 10~99는 흰색. 표시등 변화와 관계없이 매 정상 선택마다 생성됩니다.
  const color = preparePointColor(point.round, result.used);

  // sessionStorage의 세 키는 일괄 트랜잭션 API가 없으므로 쓰기 중 예외가 발생하면
  // 최선의 복원을 수행합니다. 저장값/표시등의 일치성 검사 후에만 쓰기를 시작합니다.
  const oldIndicator = readEncodedPointIndicator();
  const oldColor = readEncodedPointColor();
  try {
    writeEncodedRemainingPoint(encodedRemainingAfter);
    const indicatorValue = updatePointIndicator(remaining, after);
    // 잔액/표시등 저장이 성공한 뒤 색상값을 마지막으로 저장합니다.
    writeEncodedPointColor(color.encodedStorageValue);

    return {
      status: 'ok',
      encodedPoint,
      // 단계가 변하지 않았다면 null. 변경 시에는 Public Key 난독화 문자열입니다.
      indicatorValue,
      // 상대에게는 Public Key 기반 흑/백 값을 전달합니다.
      colorValue: color.colorValue,
    };
  } catch (error) {
    try {
      writeEncodedRemainingPoint(storedEncodedRemaining);
      restoreEncodedPointIndicator(oldIndicator);
      // 과거 저장값이 있던 경우만 복원합니다. 첫 입력 전에는 색상 키가 없으므로
      // 삭제 API가 명시되지 않은 현재 storageMethod 계약상 원복할 수 없습니다.
      // 쓰기 후 오류라면 상위 오류 처리기가 게임을 중단해야 합니다.
      if (oldColor !== null) writeEncodedPointColor(oldColor);
    } catch (rollbackError) {
      throw throwObj('dataManipulation', 'setPointNum.js - storage rollback failed.');
    }
    throw error;
  }
};
