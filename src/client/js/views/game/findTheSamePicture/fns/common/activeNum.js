import userActiveNum from "@/client/js/views/game/findTheSamePicture/fns/common/userActiveNum";

export default () => {
  let pNum = userActiveNum("p");
  let eNum = userActiveNum("n");
  let activeArr = [];
  let hasPNum;
  let hasENum;
  for (let k = 0; k < 16; k++) {
    if (k === pNum) {
      activeArr.push(10);
    } else if (k === eNum) {
      activeArr.push(10);
    } else {
      activeArr.push(Math.floor(Math.random() * 20));
    }
  }
  return activeArr;
};
