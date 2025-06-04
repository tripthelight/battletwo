import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';

/**
 * choiceCardClick
 * @property {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @returns null
 */
export default (storageKeys) => {
  const allKeys = Object.keys(sessionStorage);
  const setKeys = new Set(allKeys);
  const allExist = storageKeys.every((key) => setKeys.has(key));
  if (allExist) {
    // local player 모든 key가 있음
  } else {
    // local player 모든 key가 없음
    const message = '내가 sessionStorage 삭제';
    request('opponentFouls', { message: message });
    errorManagement({ errCase: 'sessionStorageLoss', message: 'choiceCardClick event 에서 storage안에 key가 모두 없습니다.' });
  }
};
