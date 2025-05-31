import bcrypt from 'bcryptjs';
import { timeInterval_1 } from '@/client/js/functions/variable';
import findCharCode from '@/client/js/functions/findCharCode';

export default (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { _numRes, CARD_NUM_ARR } = data;

      // const CARD_NUM = window.sessionStorage.cardNum;
      // if (!CARD_NUM) return;
      // const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
      // sessionStorage cardNum key 찾기
      // const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
      // const decryptVal = window.sessionStorage.getItem(encryptKey);
      // const CARD_NUM_ARR = JSON.parse(decryptVal);
      if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return reject(new Error('cardNum세션을 못받음'));

      // resolve(
      //   CARD_NUM_ARR.filter((item) => {
      //     return bcrypt.compareSync(_numRes.toString(), item);
      //   }),
      // );
      resolve({
        _index: CARD_NUM_ARR.filter((item) => bcrypt.compareSync(_numRes.toString(), item)),
        CARD_NUM_ARR: CARD_NUM_ARR,
      });
    }, timeInterval_1);
  });
};
