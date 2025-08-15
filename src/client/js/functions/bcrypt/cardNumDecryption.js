import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';

export default function (_num) {
  try {
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw {
        message: 'local cardNum length 0',
        sendMsg: 'remote cardNum length 0'
      };
    };
    const decrypted = arrNumbs.find(n => bcrypt.compareSync(n.toString(), _num));
    if (decrypted === null || decrypted === undefined) {
      throw {
        message: 'local card num encrypt error.',
        sendMsg: 'remote card num encrypt error.'
      };
    };
    const cardNum = findCardNum(decrypted);
    return cardNum;
  } catch (error) {
    throw {
      errCase: error?.errCase ?? 'cardNum',
      message: error?.message ?? 'local card number not found',
      sendMsg: error?.sendMsg ?? 'remote card number not found'
    };
  };
};
