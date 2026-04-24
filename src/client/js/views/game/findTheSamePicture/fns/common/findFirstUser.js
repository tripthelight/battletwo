import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import findNickname from '@/client/js/functions/findNickname';

export default () => {
  return new Promise((resolve, reject) => {
    const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
    const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
    if (!encryptVal1)  reject("not found clickUser");
    const encryptKey2 = findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]); // nicknameList
    const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
    if (!encryptVal2)  reject("not found nickname list");
    const MY_NICKNAME = findNickname('localPlayer');
    if (!MY_NICKNAME) reject("not found nickname");
    const NICKNAME_LIST_ARR = JSON.parse(encryptVal2);
    for (let i = 0; i < NICKNAME_LIST_ARR.length; i++) {
      if (encryptVal1 === "true") {
        resolve(MY_NICKNAME);
      } else {
        resolve(
          NICKNAME_LIST_ARR.filter((item) => {
            return item !== MY_NICKNAME;
          }).join("")
        );
      }
    }
  });
};
