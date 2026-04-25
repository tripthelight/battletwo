import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1000 } from "@/client/js/functions/variable";
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

  // const SESS_ORDER_NUM = window.sessionStorage.getItem(findRandomName(1));
  const SESS_ORDER_NUM = storageMethod('s', 'GET_ITEM', findRandomName(1));
  const SESS_ORDER_NUM_LIST = JSON.parse(SESS_ORDER_NUM);
  // const SESS_RANDOM_NUM = window.sessionStorage.getItem(findRandomName(2));
  const SESS_RANDOM_NUM = storageMethod('s', 'GET_ITEM', findRandomName(2));
  const SESS_RANDOM_NUM_LIST = JSON.parse(SESS_RANDOM_NUM);

  // const CLICK_USER = window.sessionStorage.clickUser;
  // if (CLICK_USER && CLICK_USER === "false") return;
  const encryptKey1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (encryptVal1 && encryptVal1 === "false") return;
  // 내 차례일 때 board animation
  // if (CLICK_USER && CLICK_USER === "true") {
  if (encryptVal1 && encryptVal1 === "true") {
    boardActive(true);
  }
  const BTN = document.querySelectorAll(".btn");
  // if (!BTN.length !== 16) errorComn("btn length not found");
  let imgEl = new Object();
  let back = new Object();
  const LOOP_RETURN = () => {
    for (let k = 0; k < BTN.length; k++) {
      if (BTN[k].classList.contains("active")) return true;
    }
    return false;
  };
  const EVENt_RETURN = (_target) => {
    if (_target.classList.contains("active")) return true;
    return false;
  };
  const CLICK_USER_CHK = () => {
    // const CLICK_USER = window.sessionStorage.clickUser;
    // if (CLICK_USER && CLICK_USER === "false") return true;

    const encryptKey1_1 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
    const encryptVal1_1 = storageMethod('s', 'GET_ITEM', encryptKey1_1);
    if (encryptVal1_1 && encryptVal1_1 === "false") return true;
    return false;
  };

  for (let j = 0; j < BTN.length; j++) {
    BTN[j].addEventListener("click", (e) => {
      // if (gameStateChk("gameover")) return;
      if (gameStateChk(findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]))) return; // gameover
      if (LOOP_RETURN()) return;
      if (EVENt_RETURN(e.target)) return;
      if (CLICK_USER_CHK()) return;

      /**
       * 1. 카드를 클릭하는 순간 clickUser: false
       */
      playerCardAcitveClass("remove");
      // window.sessionStorage.setItem("clickUser", false);
      storageMethod('s', 'GET_ITEM', encryptKey1, false);
      boardActive(false);

      const COMPARE_NUM = compareSync(SESS_RANDOM_NUM_LIST, findIndex(e.target));
      const ORDER_NUM = SESS_ORDER_NUM_LIST[COMPARE_NUM];

      const CARD_URL = CARD_LIST[ORDER_NUM];
      back = document.createElement("span");
      imgEl = new Image();

      back.classList.add("back");
      imgEl.src = CARD_URL;
      back.appendChild(imgEl);
      BTN[j].appendChild(back);
      waitImgLoad(imgEl)
        .then(() => {
          // STEP 1
          /**
           * ---------------
           * ----- 즉시 ---->
           *
           * 터치해서 flip된 카드와 프로필 이미지 왼쪽의 이미지가 같은지 체크
           * session 저장 우선 해야됨
           * 상대에게 보내야 할 것들 ---------------------------
             * rns[5] 스토리지명에 있는 EN_ARR[1]
             * 스토리지의 pn
             * 내가 뭘 눌렀는지(ORDER_NUM)
           *
           *
           * ---------------
           * ----- 1초 후에 ---->
           * 같으면 : player profile 아이콘을 왼쪽으로 한 칸 이동
           * 다르면 :
            - player card 리스트 모두, 오른쪽으로 한 칸 이동
            - 동시에 player profile 아이콘, 오른쪽으로 한 칸 이동
            - player card 리스트 마지막 카드가 깨짐
            - player card 리스트 2번째 카드 생성 후 레일에 위치


           * ---------------
           * ----- 6초 후에 ---->
           * 즉싲 저장했던 session pn을 상대방에게 보냄
          */
          // 1. 터치해서 flip된 카드와 프로필 이미지 왼쪽의 이미지가 같은지 체크
          // const ACTIVE_NUM = activeNumCheck();
          const SAME_STATE = sameCardCheck(ORDER_NUM, MAKE_USER_CARD);
          // console.log("SAME_STATE :: ", SAME_STATE);
          let playerChangeNum = 0;
          if (SAME_STATE) {
            // 세션 저장 -------------------
            // player active number 변경: -1
            playerChangeNum = clickAfterSess(true);
          } else {
            // 다르면 : 세션 저장 -
            // player active number 변경: +1
            playerChangeNum = clickAfterSess(false);
          }

          // 2. 안내 팝업이 있으면 삭제
          removeInfoPop();

          BTN[j].classList.add("active");
          BTN[j].classList.add("flip");
          setTimeout(() => {
            // STEP 2
            if (SAME_STATE) {
              // 1. player profile 아이콘을 왼쪽으로 한 칸 이동
              movePlayerIcon(playerChangeNum.num, true, ORDER_NUM, j);
            } else {
              // 0. 틀렸을 때 테두리 빨간 표시
              failRedEffect();
              // 1. player profile 아이콘을 오른쪽으로 한 칸 이동
              movePlayerIcon(playerChangeNum.num, false);

              // 2. player-block의 카드들을 오른쪽으로 한 칸 씩 이동
              movePlayerCards(playerChangeNum.num, playerChangeNum.card1Num, ORDER_NUM, j);
            }

            BTN[j].classList.remove("flip");
            setTimeout(() => {
              // STEP 3
              back.remove();
              BTN[j].classList.remove("active");
            }, timeInterval_1000);
            // }, timeInterval_4000);
          }, timeInterval_1000);
        })
        .catch((error) => {
          errorManager(error, true);
        });
    });
  }
};
