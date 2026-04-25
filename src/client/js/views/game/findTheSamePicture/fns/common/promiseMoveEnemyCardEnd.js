import { timeInterval_1001 } from "@/client/js/functions/variable";

export default (_data) => {
  return new Promise((resolve, reject) => {
    // 새로 추가된 이미지 animation
    _data.newCard.style.bottom = 0;
    _data.newCard.style.opacity = 1;
    setTimeout(resolve, timeInterval_1001, _data);
  });
};
