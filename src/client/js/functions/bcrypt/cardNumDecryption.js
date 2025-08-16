import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default function (_num) {
  try {
    const arrNumbs = selectCompairNumbers();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw throwObj('cardNum', 'cardNum length 0');
    };
    const decrypted = arrNumbs.find(n => bcrypt.compareSync(n.toString(), _num));
    if (decrypted === null || decrypted === undefined) {
      throw throwObj('cardNum', 'card num encrypt error.');
    };
    const cardNum = findCardNum(decrypted);
    return cardNum;
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'cardNum',
      error?.message ?? 'card number not found'
    );
  };
};
