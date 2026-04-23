import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import activeUserCheckRound from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound";
import setGameOrderRoundCheck from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck";
import setBlink from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink";
import drawInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare";

/**
 * 한 라운드 종료 후 진입
 * @param {string} res 난독화된 라운드 결과 "win" | "die" | "drew"
 */
export default (res) => {
  try {
    const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
    const encryptVal3 = storageMethod("l", "GET_ITEM", "localPlayer");

    // const encryptKey2 = findCharCode([74, 65, 88, 72, 66, 84, 83, 67, 69, 85]); // userOrder
    // const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);
    // const USER_ORDER = JSON.parse(encryptVal2);
    // const USER_LIST = USER_ORDER.map(s => s.split(",")); // [["", "", "", ""], ["", "", "", ""]] 형태

    const encryptKey2 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
    const encryptVal2 = storageMethod("s", "GET_ITEM", encryptKey2);

    const encryptKey4 = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick
    const encryptVal4 = storageMethod("s", "GET_ITEM", encryptKey4);
    const isKnownUser = (user) => user && (user === encryptVal3 || user === encryptVal4);

    if (!encryptVal3 || !encryptVal4) {
      throw throwObj('sessionStorageLoss', 'setGameOrderRound - player value failed.');
    }

    // let fUser = "";
    // let sUser = "";
    switch (dec(res)) {
      case dec(enc(encryptNumOfStr(_t([101, 101, 119, 101, 101, 101, 101, 98])))): // "eeweeeeb" : 1 : win
        storageMethod("s", "SET_ITEM", encryptKey1, encryptVal3); // activeUser -> local Nick
        storageMethod("s", "SET_ITEM", encryptKey2, encryptVal3); // firstUser -> local Nick
        break;
      case dec(enc(encryptNumOfStr(_t([119, 119, 101, 119, 119, 119, 119, 101])))): // "wwewwwwe" : 0 : die
        storageMethod("s", "SET_ITEM", encryptKey1, encryptVal4); // activeUser -> enemyNick
        storageMethod("s", "SET_ITEM", encryptKey2, encryptVal4); // firstUser -> enemyNick
        break;
      case dec(enc(encryptNumOfStr(_t([119, 119, 119, 119, 101, 119, 119, 112])))): // "wwwwewwp" : 2 : drew
        if (!encryptVal2) {
          throw throwObj('sessionStorageLoss', 'setGameOrderRound - firstUser value failed.');
        }
        if (!isKnownUser(encryptVal2)) {
          throw throwObj('dataManipulation', 'setGameOrderRound - firstUser data failed.');
        }
        storageMethod("s", "SET_ITEM", encryptKey1, encryptVal2); // activeUser -> same first user
        storageMethod("s", "SET_ITEM", encryptKey2, encryptVal2); // firstUser -> keep same first user
        // storageMethod("s", "SET_ITEM", encryptKey1, fUser);

        // if (encryptVal3 == USER_LIST[0]) {
        //   fUser = encryptVal3;
        //   for (let i = 0; i < USER_LIST.length; i++) {
        //     if (USER_LIST[i] !== encryptVal3) {
        //       sUser = USER_LIST[i];
        //       break;
        //     }
        //   }
        // } else {
        //   sUser = encryptVal3;
        //   for (let i = 0; i < USER_LIST.length; i++) {
        //     if (USER_LIST[i] !== encryptVal3) {
        //       fUser = USER_LIST[i];
        //       break;
        //     }
        //   }
        // }
        // storageMethod("s", "SET_ITEM", encryptKey1, fUser);
        break;
      default: throw throwObj('dataManipulation', 'setGameOrderRound - round result data failed.');
    };

    // storageMethod("s", "SET_ITEM",
    //   encryptKey2, // userOrder
    //   JSON.stringify([fUser, sUser])
    // );
    if (!setGameOrderRoundCheck()) return;

    activeUserCheckRound();
    drawInnerSquare();
    setBlink();
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'setGameOrderRound.js error'
    );
  }
};
