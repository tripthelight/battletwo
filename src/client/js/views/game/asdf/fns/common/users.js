import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 게임중인 2명의 peer nuck name code 배열을 리턴
 * @returns {Array<Array<string>>} [["", "", "", ""], ["", "", "", ""]] 형식의 배열을 리턴
 */
export default () => {
  try {
    const encryptVal1 = storageMethod("l", "GET_ITEM", "localPlayer"); // local peer nick code
    const encryptKey2 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
    const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2); // active peer nick code
    if (!encryptVal1 || !encryptVal2) throw throwObj('errorComn', 'USERS array failed.');

    return ((arr) => {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    })([encryptVal1, encryptVal2]);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'users.js error'
    );
  }
};
