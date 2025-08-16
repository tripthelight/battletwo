import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';

export default function (_idx) {
  try {
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw { message: 'cardNum length 0' };
    };
    const hash = arrNumbs[_idx];
    return bcrypt.hashSync(hash.toString(), 3);
  } catch (error) {
    throw {
      errCase: error?.errCase ?? 'cardNum',
      message: error?.message ?? 'local peer card number not crypt',
      sendMsg: error?.sendMsg ?? 'remote peer card number not crypt'
    };
  }
};
