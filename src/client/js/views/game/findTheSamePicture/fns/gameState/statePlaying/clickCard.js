import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1, timeInterval_1000 } from "@/client/js/functions/variable";
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import findIndex from "@/client/js/views/game/findTheSamePicture/fns/common/findIndex";
import { CARD_LIST } from "@/client/js/views/game/findTheSamePicture/fns/common/variable";
import compareSync from "@/client/js/views/game/findTheSamePicture/fns/common/compareSync";
import errorManager from '@/client/js/module/errorHandler/errorManager';
import sameCardCheck from "@/client/js/views/game/findTheSamePicture/fns/common/sameCardCheck";
import makeUserCard from "@/client/js/views/game/findTheSamePicture/fns/common/makeUserCard/makeUserCard";
import clickAfterSess from "@/client/js/views/game/findTheSamePicture/fns/common/clickAfterSess";
import movePlayerIcon from "@/client/js/views/game/findTheSamePicture/fns/common/movePlayerIcon";
import removeInfoPop from "@/client/js/views/game/findTheSamePicture/fns/common/removeInfoPop";
import movePlayerCards from "@/client/js/views/game/findTheSamePicture/fns/common/movePlayerCards";
import waitImgLoad from "@/client/js/views/game/findTheSamePicture/fns/common/waitImgLoad";
import boardActive from "@/client/js/views/game/findTheSamePicture/fns/common/boardActive";
import playerCardAcitveClass from "@/client/js/views/game/findTheSamePicture/fns/common/playerCardAcitveClass";
import failRedEffect from "@/client/js/views/game/findTheSamePicture/fns/common/failRedEffect";
import gameStateChk from "@/client/js/views/game/findTheSamePicture/fns/common/gameStateChk";
import findCharCode from '@/client/js/functions/findCharCode';

export default async () => {
  const MAKE_USER_CARD = await makeUserCard();
  const SESS_ORDER_NUM = storageMethod('s', 'GET_ITEM', findRandomName(1));
  const SESS_ORDER_NUM_LIST = JSON.parse(SESS_ORDER_NUM);
  const SESS_RANDOM_NUM = storageMethod('s', 'GET_ITEM', findRandomName(2));
  const SESS_RANDOM_NUM_LIST = JSON.parse(SESS_RANDOM_NUM);

  const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (encryptVal1 && encryptVal1 === "false") return;
  if (encryptVal1 && encryptVal1 === "true") {
    boardActive(true);
  }

  const BTN = document.querySelectorAll(".btn");
  let imgEl = new Object();
  let back = new Object();
  const LOOP_RETURN = () => {
    for (let k = 0; k < BTN.length; k++) {
      if (BTN[k].classList.contains("active")) return true;
    }
    return false;
  };
  const EVENT_RETURN = (_target) => {
    if (_target.classList.contains("active")) return true;
    return false;
  };
  const CLICK_USER_CHK = () => {
    const encryptKey1_1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
    const encryptVal1_1 = storageMethod('s', 'GET_ITEM', encryptKey1_1);
    if (encryptVal1_1 && encryptVal1_1 === "false") return true;
    return false;
  };

  for (let j = 0; j < BTN.length; j++) {
    if (BTN[j].dataset.clickBound === "true") continue;
    BTN[j].dataset.clickBound = "true";

    BTN[j].addEventListener("click", (e) => {
      const TARGET_BTN = e.currentTarget;

      if (gameStateChk(findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]))) return; // gameover
      if (LOOP_RETURN()) return;
      if (EVENT_RETURN(TARGET_BTN)) return;
      if (CLICK_USER_CHK()) return;

      playerCardAcitveClass("remove");
      storageMethod('s', 'SET_ITEM', encryptKey1, false);
      boardActive(false);

      const COMPARE_NUM = compareSync(SESS_RANDOM_NUM_LIST, findIndex(TARGET_BTN));
      const ORDER_NUM = SESS_ORDER_NUM_LIST[COMPARE_NUM];

      const CARD_URL = CARD_LIST[ORDER_NUM];
      back = document.createElement("span");
      imgEl = new Image();

      back.classList.add("back");
      imgEl.src = CARD_URL;
      back.appendChild(imgEl);
      TARGET_BTN.appendChild(back);
      waitImgLoad(imgEl)
        .then(() => {
          const SAME_STATE = sameCardCheck(ORDER_NUM, MAKE_USER_CARD);
          let playerChangeNum = 0;
          if (SAME_STATE) {
            playerChangeNum = clickAfterSess(true);
          } else {
            playerChangeNum = clickAfterSess(false);
          }

          removeInfoPop();

          TARGET_BTN.classList.add("active");
          TARGET_BTN.classList.add("flip");
          setTimeout(() => {
            if (SAME_STATE) {
              movePlayerIcon(playerChangeNum.num, true, ORDER_NUM, j);
            } else {
              failRedEffect();
              movePlayerIcon(playerChangeNum.num, false);
              movePlayerCards(playerChangeNum.num, playerChangeNum.card1Num, ORDER_NUM, j);
            }

            TARGET_BTN.classList.remove("flip");
            setTimeout(() => {
              back.remove();
              TARGET_BTN.classList.remove("active");
            }, timeInterval_1000);
          }, timeInterval_1000);
        })
        .catch((error) => {
          errorManager(error, true);
        });
    });
  }
};
