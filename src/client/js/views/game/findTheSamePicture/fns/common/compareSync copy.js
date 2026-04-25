import bcrypt from "bcryptjs";

export default (_numList, _num) => {
  for (let j = 0; j < _numList.length; j++) {
    // console.log("_numList[j].toString() ::::: ", _numList[j].toString());
    // console.log("_num.toString() :::::::::::: ", _num.toString());
    if (bcrypt.compareSync(_num.toString(), _numList[j].toString())) {
      return j;
    }
  }
};
