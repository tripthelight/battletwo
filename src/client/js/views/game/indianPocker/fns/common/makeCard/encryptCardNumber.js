import { selectCompairNumbers } from '@/client/store/encryptionStore';
import { errorManagement } from '@/client/js/module/errorManagement';
import shuffleArray from '@/client/js/views/game/indianPocker/fns/common/makeCard/shuffleArray';
import encryption from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryption';

export default async  () => {
  const arrNumbs = selectCompairNumbers();
  if (!arrNumbs.length) {
    throw { message: 'cardNum length 0' };
  };

  /* let cNums = [];
  // 카드 배열을 1 ~ 10까지의 숫자로 2세트로 지정
  shuffleArray(arrNumbs.concat(arrNumbs)).map((item) =>
    encryption(item.toString(), 3)
      .then((_nums) => cNums.push(_nums))
      .catch((error) => errorManagement({ errCase: 'cardNum', message: error })),
  );
  resolve(cNums); */

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

  /*
  const arrNumbs = selectCompairNumbers();
  if (!arrNumbs.length) return errorManagement({ errCase: 'cardNum', message: 'cardNum length 0' });

  let cNums = [];
  // 카드 배열을 1 ~ 10까지의 숫자로 2세트로 지정
  shuffleArray(arrNumbs.concat(arrNumbs)).map((item) =>
    encryption(item.toString(), 3)
      .then((_nums) => cNums.push(_nums))
      .catch((error) => errorManagement({ errCase: 'cardNum', message: error })),
  );
  */

  // 카드 배열을 0 ~ 10까지의 숫자로 2세트로 지정
  /*
  shuffleArray(
    Array(20)
      .fill()
      .map((item, index) => (index > 9 ? index - 9 : index + 1)),
  ).map((item) =>
    encryption(item.toString(), 3)
      .then((_nums) => cNums.push(_nums))
      .catch((error) => console.log(new Error('암호화 에러 :: ' + error))),
  );
  */

  // 카드 배열을 임의로 지정한 숫자로 지정
  /*
  const ARR_10 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  const ARR_DREW = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const ARR_1_10 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  const ARR_MORE_1_10 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 10, 10, 10];
  const ARR_1_9 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
  shuffleArray(ARR_MORE_1_10).map((item) => {
    encryption(item.toString(), 3)
      .then((_nums) => {
        cNums.push(_nums);
      })
      .catch((error) => {
        console.log(new Error('암호화 에러 :: ' + error));
      });
  });
  */

  /*
  return cNums;
  */
};
