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
  }

  // betUser, betUserFirst 검증 (tie일 경우 빈값)
  booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

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
