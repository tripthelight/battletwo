export default (_char) => {
  const sameNum = (n) => {
    for (let i = 0; i < randomNums.length; i++) {
      if (n === randomNums[i]) {
        return true;
      }
    }
    return false;
  };

  let randomNums = [];
  let i = 0;
  while (i < _char.length) {
    let n = Math.floor(Math.random() * 16);
    if (!sameNum(n)) {
      randomNums.push(n);
      i++;
    }
  }

  return randomNums;
};
