import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';

export default function (_num) {
  try {
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw { message: 'cardNum length 0' };
    };
    const decrypted = arrNumbs.find(n => bcrypt.compareSync(n.toString(), _num));
    if (decrypted === null) throw { message: 'card num encrypte error.' };
    const cardNum = findCardNum(decrypted);
    return cardNum;
  } catch (error) {
    throw {
      errCase: error && error.errCase ? error.errCase : 'cardNum',
      message: error && error.message ? error.message : 'card number not found'
    };
  }
};
