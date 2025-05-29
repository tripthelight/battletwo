import bcrypt from 'bcryptjs';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { selectCompairNumbers } from '@/client/store/encryptionStore';

export default (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { _enum, CARD_NUM_ARR } = data;
      const arrNumbs = selectCompairNumbers();
      if (!arrNumbs.length) return errorManagement({ errCase: 'cardNum', message: 'cardNum length 0' });
      resolve(
        {
          _numRes: arrNumbs.filter((item) => bcrypt.compareSync(item.toString(), _enum)),
          CARD_NUM_ARR,
        },
        // arrNumbs.filter((item) => {
        //   return bcrypt.compareSync(item.toString(), _enum);
        // }),
      );

      /*
      const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      resolve(
        NUMS.filter((item) => {
          return bcrypt.compareSync(item.toString(), _enum);
        }),
      );
      */
    }, timeInterval_1);
  });
};
