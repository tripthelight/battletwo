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
    throw {
      errCase: 'sessionStorageLoss',
      message: 'local peer sessionStorage key failed from choiceCardClick event.',
      sendMsg: 'remote peer sessionStorage key failed from choiceCardClick event.'
    };
  }
};
