import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
    // TODO: 처음 진입인지 처음 진입 후 한 번 이상 옯겼는지 분기점 필요
    // 저음 진입이면 012345678 기본 순서이므로 이 순서에서 옮기는 큐브의 index를 기점으로 012345678 수정 필요
    // 큐브의 innerHTML로 숫자를 지정하면 사용자가 html 수정 할 수 있어서 안됨
    const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);


    const CUBE = document.querySelector(".cube");
    if (CUBE) {
      const CUBE_LIST = CUBE.querySelectorAll("li");
      const playerNumOrder = [];
      // START 버튼을 누르는 순간 큐브에 있는 숫자들의 순서로 배열 생성
      for (let i = 0; i < CUBE_LIST.length; i++) {
        playerNumOrder.push(CUBE_LIST[i].innerHTML);
      };

      // console.log("saveSessionStorage.js cube >>>>>>>>>>>>>>> ", JSON.stringify(playerNumOrder));

      // ["0", "1", "2", "3", "4", "5", "6", "7", "8"] 배열을 "012345678" 로 변경
      // ["0", "1", "2", "3", "4", "5", "6", "7", "8"]는 예시
      const orderStr = playerNumOrder.join("");
      const PVK = KEY?.prk ?? null; // private key
      if (!PVK) {
        throw throwObj('errorComn', 'saveSessionStorage - order decrypt key failed.');
      };
      // "012345678"를 AES 양방향 대칭키 암호화
      // "012345678" 는 예시
      const hash = CryptoJS.AES.encrypt(orderStr, PVK).toString();

      console.log("encrypted hash >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", hash);

      // 암호화된 playerNumOrder - "012345678" - 를 복호화
      // "012345678" 은 예시
      const bytes = CryptoJS.AES.decrypt(hash, PVK);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);

      console.log("decrypted hash >>>>>>>>>>>>>>>>>>>>>>>>>> ", decrypted);

      storageMethod("s", "SET_ITEM",
        findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]), // playerNumOrder
        JSON.stringify(playerNumOrder)
      );
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'saveSessionStorage.js error'
    );
  }
};
