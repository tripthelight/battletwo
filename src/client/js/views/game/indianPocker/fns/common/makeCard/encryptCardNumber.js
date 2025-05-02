import shuffleArray from '@/client/js/views/game/indianPocker/fns/common/makeCard/shuffleArray';
import encryption from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryption';

export default () => {
  let cNums = [];

  // 카드 배열을 0 ~ 10까지의 숫자로 2세트로 지정
  shuffleArray(
    Array(20)
      .fill()
      .map((item, index) => (index > 9 ? index - 9 : index + 1)),
  ).map((item) =>
    encryption(item.toString(), 3)
      .then((_nums) => cNums.push(_nums))
      .catch((error) => console.log(new Error('암호화 에러 :: ' + error))),
  );

  // 카드 배열을 임의로 지정한 숫자로 지정
  // const ARR_10 = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  // const ARR_DREW = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  // const ARR_1_10 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
  // const ARR_1_9 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9];
  // shuffleArray(ARR_DREW).map((item) => {
  //   encryption(item.toString(), 3)
  //     .then((_nums) => {
  //       cNums.push(_nums);
  //     })
  //     .catch((error) => {
  //       console.log(new Error("암호화 에러 :: " + error));
  //     });
  // });

  return cNums;
};
