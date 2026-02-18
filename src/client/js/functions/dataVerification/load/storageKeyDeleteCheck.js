/**
 * reload 했을 경우 모든 key가 있는지 먼저 체크
 * @param {*} storageKeys gameState에 필요한 sessionStorage key 배열
 * @returns {boolean} 정상 true
 */
export default function (storageKeys) {
  let result = false;
  let idx = 0;
  for (const key of storageKeys) {
    if (window.sessionStorage.getItem(key) === null) {
      result = true;
      break;
    };
    idx++;
  };
  return result;
};
