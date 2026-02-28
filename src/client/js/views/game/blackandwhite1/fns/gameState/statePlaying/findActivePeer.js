// import waitEnemy from "../common/waitEnemy.js";
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

/**
 * @param {boolean} _state active user를 찾을 경우 true | active가 아닌 user를 찾을 경우 false
 * @returns {string} active user이거나 active user가 아닌 peer의 nick name code
 */
export default (_state) => {
  const encryptKey2 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2); // firstUser code
  const encryptKey3 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
  const encryptVal3 = storageMethod("s", "GET_ITEM", encryptKey3); // enemyNick code
  const encryptVal4 = storageMethod("l", "GET_ITEM", "localPlayer"); // local peer nick code

  if (_state) {
    // active user인 PEER의 nick name code를 리턴
    return encryptVal2;
  } else {
    // active user가 아닌 PEER의 nick name code를 리턴
    return encryptVal2 === encryptVal4 ? encryptVal3 : encryptVal3;
  };
};
