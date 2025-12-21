import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import shuffleArray from '@/client/js/views/game/indianPocker/fns/common/makeCard/shuffleArray';

export default async () => {
  try {
    const arrNumbs = selectCompairNumbers(); // 1 ~ 40 - signalingServer에서 암호화한 carcNum key 리스트
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw { message: 'cardNum length failed.' };
    }

    // 카드 배열을 1 ~ 10까지의 숫자로 섞어서 2세트로 지정
    const shuffleNums = shuffleArray([...arrNumbs, ...arrNumbs]);

    // 2세트 20개의 카드 번호를 암호화
    return shuffleNums.map((item) => {
      return bcrypt.hashSync(item.toString(), 3);
    });
  } catch (error) {
    throw { message: error.message ?? 'encrypt card number failed.' };
  }
};
