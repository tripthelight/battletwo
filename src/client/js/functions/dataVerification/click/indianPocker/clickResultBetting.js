import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
import findCharCode from '@/client/js/functions/findCharCode';

/**
 * clickResultBetting
 * 두 peer 모두 선플레이어 결정 카드를 선택 후 안내팝업의 X 버튼 클릭
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @param {string} result 선플레이어 결과 - [start: 내가 높음 | end: 내가 낮음 | tie: 같은 카드]
 * @returns
 */
export default async (storageKeys, result) => {
  const allKeys = Object.keys(sessionStorage);
  const setKeys = new Set(allKeys);
  const allExist = storageKeys.every((key) => setKeys.has(key));
  if (allExist) {
    // local player 모든 key가 있음
    // betUser, betUserFirst를 상대 peer와 검증
    const keyRemoteBetUser = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const keyRemoteBetUserFirst = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
    const valRemoteBetUser = window.sessionStorage.getItem(keyRemoteBetUser);
    const valRemoteBetUserFirst = window.sessionStorage.getItem(keyRemoteBetUserFirst);
    request('requestCompairResultBetting', { result: result, resultStorage: { valRemoteBetUser, valRemoteBetUserFirst } });

    // // 이 후 단계 진행
    // LOADING_EVENT.show();
    // if (result === 'start' || result === 'end') socketNextStepEvent();
    // if (result === 'tie') againChoiceCard();
  } else {
    // local player 모든 key가 없음
    const message = '내가 sessionStorage 삭제';
    request('opponentFouls', { message: message });
    // errorManagement({ errCase: 'sessionStorageLoss', message: 'resultBetting click event 에서 storage안에 key가 모두 없습니다.' });
    throw { errCase: 'sessionStorageLoss', message: 'resultBetting click event 에서 storage안에 key가 모두 없습니다.' };
  }
};
