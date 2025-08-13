import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';

/**
 * choiceCardClick
 * @param {Array<string>} storageKeys gameState에 필요한 sessionStorage key list
 * @returns null
 */
export default (storageKeys) => {
  const allKeys = Object.keys(sessionStorage);
  const setKeys = new Set(allKeys);
  const allExist = storageKeys.every((key) => setKeys.has(key));
  if (allExist) {
    // local player 모든 key가 있음
  } else {
    // local player 모든 key가 없음 or key 조작
    request('opponentFouls', { message: '상대 peer가 sessionStorage 조작' });
    // errorManagement({ errCase: 'sessionStorageLoss', message: 'choiceCardClick event 에서 storage안에 key가 모두 없습니다.' });
    throw { errCase: 'sessionStorageLoss', message: 'choiceCardClick event 에서 storage안에 key가 모두 없습니다.' };
  }
};
