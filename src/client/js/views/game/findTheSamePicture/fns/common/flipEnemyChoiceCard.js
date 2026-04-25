import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1000 } from "@/client/js/functions/variable";
import errorManager from '@/client/js/module/errorHandler/errorManager';
import compareSync from "@/client/js/views/game/findTheSamePicture/fns/common/compareSync";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import { CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import waitImgLoad from "@/client/js/views/game/findTheSamePicture/fns/common/waitImgLoad";

export default (_data) => {
  return new Promise((resolve, reject) => {
    // const SESS_ORDER_NUM = window.sessionStorage.getItem(findRandomName(1));
    const SESS_ORDER_NUM = storageMethod('s', 'GET_ITEM', findRandomName(1));
    const SESS_ORDER_NUM_LIST = JSON.parse(SESS_ORDER_NUM);
    // const SESS_RANDOM_NUM = window.sessionStorage.getItem(findRandomName(2));
    const SESS_RANDOM_NUM = storageMethod('s', 'GET_ITEM', findRandomName(2));
    const SESS_RANDOM_NUM_LIST = JSON.parse(SESS_RANDOM_NUM);

    const BTN = document.querySelectorAll(".btn");
    const ACTIVE_BTN = BTN[_data.clickBoardNum];
    let imgEl = new Image();
    let back = new Object();

    const COMPARE_NUM = compareSync(SESS_RANDOM_NUM_LIST, _data.clickBoardNum);
    const ORDER_NUM = SESS_ORDER_NUM_LIST[COMPARE_NUM];

    const CARD_URL = CARD_LIST[ORDER_NUM];
    back = document.createElement("span");

    back.classList.add("back");
    imgEl.src = CARD_URL;
    back.appendChild(imgEl);
    ACTIVE_BTN.appendChild(back);

    waitImgLoad(imgEl)
      .then(() => {
        ACTIVE_BTN.classList.add("active");
        ACTIVE_BTN.classList.add("flip");
        setTimeout(() => {
          ACTIVE_BTN.classList.remove("flip");
          // 카드를 열고 뒤집기 바로 직전에 다음 STEP 실행
          resolve();
          setTimeout(() => {
            back.remove();
            ACTIVE_BTN.classList.remove("active");
          }, timeInterval_1000);
        }, timeInterval_1000);
      })
      .catch((error) => {
        errorManager(error, true);
      });
  });
};
