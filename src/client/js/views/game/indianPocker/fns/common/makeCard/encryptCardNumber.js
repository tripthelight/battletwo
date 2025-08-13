import { selectCompairNumbers } from '@/client/store/encryptionStore';
import shuffleArray from '@/client/js/views/game/indianPocker/fns/common/makeCard/shuffleArray';
import encryption from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryption';

export default async  () => {
  const arrNumbs = selectCompairNumbers();
  if (!arrNumbs.length) {
    throw { message: 'cardNum length 0' };
  };

  // 카드 배열을 1 ~ 10까지의 숫자로 2세트로 지정
  const rawCardNumbers = shuffleArray([...arrNumbs, ...arrNumbs]);

  const encryptedCardNumbers = await Promise.all(
    rawCardNumbers.map((item) =>
      encryption(item.toString(), 3).catch((error) => {
        // errorManagement({ errCase: 'cardNum', message: error });
        return null; // 실패한 항목은 null로 표시
      })
    )
  );

  // null이 포함되어 있는지 확인
  const hasError = encryptedCardNumbers.some((v) => v === null);
  if (hasError) {
    throw { message: 'One or more encryption failed' };
  }

  return encryptedCardNumbers;
};
