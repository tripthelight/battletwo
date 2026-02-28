// import waitEnemy from "../common/waitEnemy.js";
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

/**
 * @param {boolean} _state active user를 찾을 경우 true | active가 아닌 user를 찾을 경우 false
 * @returns {string} active user이거나 active user가 아닌 peer의 nick name code
 */
export default (_state) => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  const encryptKey2 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
  const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
  const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer"); // local peer nick

  console.log("remote Nick ################ ", encryptVal2);
  console.log("local Nick ################# ", encryptVal3);

  if (_state) {
    // active user인 PEER의 nick name code를 리턴
    return encryptVal1;
  } else {
    // active user가 아닌 PEER의 nick name code를 리턴
    if (encryptVal1 === encryptVal3) {
      // 내가 active user -> 상대 nick code 리턴
      return encryptVal2;
    } else {
      // 상대가 active user -> 내 nick code 리턴
      return encryptVal3;
    }
  };
};
