import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import NumToCube from '@/client/js/views/game/blackAndWhite1/fns/common/NumToCube';

export default (num, index) => {
  try {
    // const PVK = KEY?.prk ?? null; // private key
    // if (!PVK) throw throwObj('errorComn', 'beforePlayerNum - order decrypt key failed.');
    // const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
    // const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
    // const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
    // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
    // if (decrypted === "") throw throwObj('sessionStorageLoss', 'beforePlayerNum - order decrypt value failed.');
    // const playerNumOrder = [...decrypted].map(Number);
    // console.log("playerNumOrder >>>>>>>> ", playerNumOrder);

    // const N_ENC = [
    //   NumToCube(0),
    //   NumToCube(1),
    //   NumToCube(2),
    //   NumToCube(3),
    //   NumToCube(4),
    //   NumToCube(5),
    //   NumToCube(6),
    //   NumToCube(7),
    //   NumToCube(8),
    // ];
    // const N_DEC = [
    //   cubeToNum(N_ENC[0]),
    //   cubeToNum(N_ENC[1]),
    //   cubeToNum(N_ENC[2]),
    //   cubeToNum(N_ENC[3]),
    //   cubeToNum(N_ENC[4]),
    //   cubeToNum(N_ENC[5]),
    //   cubeToNum(N_ENC[6]),
    //   cubeToNum(N_ENC[7]),
    //   cubeToNum(N_ENC[8]),
    // ];
    // console.log("암호화된 숫자 0~8 >>>>>>>> ", N_ENC);
    // console.log("복호화된 숫자 0~8 >>>>>>>> ", N_DEC);
    // console.log("내가 선택한 큐브 숫자 >>>>> ", num);

    // window.sessionStorage.setItem("beforePlayerNum", num);
    storageMethod("s", "SET_ITEM",
      findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]), // beforePlayerNum
      NumToCube(num) // 0 ~ 8 난독화 숫자 코드
    );
    request("beforePlayerNumber", { index })
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'beforePlayerNum.js error'
    );
  }
};
