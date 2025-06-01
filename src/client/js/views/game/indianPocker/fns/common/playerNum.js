import { selectCompairNumbers } from '@/client/store/encryptionStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import bcrypt from 'bcryptjs';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';

// export default (_arr, _user) => {
export default (_num) => {
  console.log('_num >>>>>>>>>>>>> ', _num);

  const arrNumbs = selectCompairNumbers();
  if (!arrNumbs.length) return errorManagement({ errCase: 'cardNum', message: 'cardNum length 0' });

  /*
  for (let i = 0; i < _arr.length; i++) {
    if (_arr[i].host == _user) {
      // for (let j = 1; j < 11; j++) {
      //   if (bcrypt.compareSync(j.toString(), _arr[i].num)) {
      //     return j;
      //   }
      // }
      for (let j = 0; j < arrNumbs.length; j++) {
        if (bcrypt.compareSync(arrNumbs[j], _arr[i].num)) {
          return findCardNum(arrNumbs[j]);
        }
      }
    }
  }
  */

  for (let i = 0; i < arrNumbs.length; i++) {
    if (bcrypt.compareSync(arrNumbs[i], _num)) {
      return findCardNum(arrNumbs[i]);
    }
  }
};
