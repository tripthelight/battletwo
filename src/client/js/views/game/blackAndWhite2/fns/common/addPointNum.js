import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import roundPoints from '@/client/js/views/game/blackAndWhite2/fns/common/roundPoints';

/**
 * 선플레이어가 입력한 Point를 난독화해서 SessionStorage에 저장하기 위한 난독화 문자열을 리턴
 * @param {number} _l - 10의 자리 숫자 (0~9)
 * @param {number} _r - 1의 자리 숫자 (0~9)
 * @param {string} _rnd - 현재 Round 식별 문자열
 * @param {boolean} _fst - 선/후 Player 여부 - true: 선플레이어 | false: 후플레이어
 * @returns {string} 왼쪽 5자리 문자 + 오른쪽 5자리 문자
 */
export default (_l, _r, _rnd, _fst) => {
  const ROUND_POINTS = roundPoints();
  const point = ROUND_POINTS.get(_rnd);

  if (!point) {
    throw throwObj('dataManipulation', 'findPointNum.js - round failed.');
  }

  if (!Number.isInteger(_l) || _l < 0 || _l > 9) {
    throw throwObj(
      'dataManipulation',
      `findPointNum.js - round ${point.round} point left number failed.`,
    );
  }

  if (!Number.isInteger(_r) || _r < 0 || _r > 9) {
    throw throwObj(
      'dataManipulation',
      `findPointNum.js - round ${point.round} point right number failed.`,
    );
  }

  // console.log("left >>>>>>>> ", point.left[_l]);
  // console.log("right >>>>>>>> ", point.right[_r]);

  const sum = point.left[_l] + point.right[_r];
  // `선` 플레이어 인 경우, Private Key로 난독화 하는 `findCharCode` 사용
  // `후` 플레이어 인 경우, Public Key로 난독화 하는 `findCharDecCode` 사용
  return _fst ? findCharCode(sum) : findCharDecCode(sum);
};
