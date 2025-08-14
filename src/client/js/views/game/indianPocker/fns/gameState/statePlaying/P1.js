import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { _enum, CARD_NUM_ARR } = data;
      resolve(
        {
          _numRes: cardNumDecryption(_enum),
          CARD_NUM_ARR: CARD_NUM_ARR,
        },
      );
    }, timeInterval_1);
  });
};
