export default (array) => {
  // true or false 선택
  const randomBool = Math.random() < 0.5;
  const rand = (Math.random() * array.length) | 0;
  // true면 카드리스트 중 랜덤한 1개 선택값 리턴
  // false면 false 리턴
  return randomBool ? array[rand] : false;
};
