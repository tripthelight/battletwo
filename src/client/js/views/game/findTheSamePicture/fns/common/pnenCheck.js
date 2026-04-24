export default (_arr) => {
  return new Promise((resolve, reject) => {
    // pn과 en의 1번째 배열은 겹치면 안됨
    // 겹치지 않는 arrShuffle 배열을 미리 정하고, 이후 STEP 진행
    let arr = [];
    let randomPicNum = 0;
    for (let i = 0; i < 20; i++) {
      randomPicNum = Math.floor(Math.random() * 16);
      if (i < 16) {
        if (arr.indexOf(randomPicNum) === -1) {
          arr.push(randomPicNum);
        } else {
          i--;
        }
      } else {
        arr.push(randomPicNum);
      }
    }
    let arrShuffle = arr.sort(() => Math.random() - 0.5);
    if (_arr) {
      if (arrShuffle[1] === _arr[1]) {
        do {
          // console.log("_arr[1] :::::::: ", _arr[1]);
          // console.log("arrShuffle[1] :: ", arrShuffle[1]);

          arrShuffle[1] = Math.floor(Math.random() * 16);
        } while (arrShuffle[1] === _arr[1]);
      }
    }
    resolve(arrShuffle);
  });
};
