import bcrypt from 'bcryptjs';
import { timeInterval_1 } from '@/client/js/functions/variable';

export default (_enum) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      resolve(
        NUMS.filter((item) => {
          return bcrypt.compareSync(item.toString(), _enum);
        }),
      );
    }, timeInterval_1);
  });
};
