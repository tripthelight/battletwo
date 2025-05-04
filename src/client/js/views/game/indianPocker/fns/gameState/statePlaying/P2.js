import bcrypt from 'bcryptjs';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default (_enum) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const CARD_NUM = window.sessionStorage.cardNum;
      if (!CARD_NUM) return;
      const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
      if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return reject(new Error('cardNum세션을 못받음'));
      resolve(
        CARD_NUM_ARR.filter((item) => {
          return bcrypt.compareSync(_enum.toString(), item);
        }),
      );
    }, timeInterval_1);
  });
};
