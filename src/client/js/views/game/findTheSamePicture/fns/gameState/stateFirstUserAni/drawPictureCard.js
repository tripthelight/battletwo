/**
 * betUser: true인 user의 닉네임이 한글자씩은 다 나와야돼
 * betUser: true인 닉네임에 한 글자씩 class가 붙어야되 - 중복X
 * class는 betUser: true인 user의 닉네임 순서대로 1~n 까지 있어야돼
 */

/**
  1. 16개 중에 firstUser: true 인 user의 글자가 랜덤하게 한 글자씩은 다 들어가야돼
  2. firstUser: true 인 user의 닉네임의 한글자에 0 ~ 16 숫자 사이에 랜덤한 숫자를 하나씩 부여해.
  3. 그 숫자의 판은 class가 순서대로 있어야돼
  3. 위에서 나온 랜덤한 숫자를 뺀 나머지에 닉네임리스트를 한글자씩 랜덤하게 그림판에 뿌려
 */

import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findFirstUser from "@/client/js/views/game/findTheSamePicture/fns/common/findFirstUser";
import userNickCharList from "@/client/js/views/game/findTheSamePicture/fns/common/userNickCharList";
import firstUserRandomNum from "@/client/js/views/game/findTheSamePicture/fns/common/firstUserRandomNum";
import flipAnimation from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateFirstUserAni/flipAnimation";

export default async (_elem) => {
  try {
    // const FIRST_USER = await findFirstUser();
    // const NICK_CHAR_LIST = await userNickCharList();

    const FIRST_USER = "BRAVE";
    const NICKNAME_LIST = '["BRAVE", "CHROME"]';
    const NICKNAME_ARR = JSON.parse(NICKNAME_LIST);
    const NICKNAME_JOIN = NICKNAME_ARR.join("");
    const NICK_CHAR_LIST = NICKNAME_JOIN.split("");

    let pictureCard = new Object();
    let picFront = new Object();
    let picBack = new Object();
    let picTxtArr = [];
    let picTxtCase = "";
    let firstUserData = [];

    const FIRST_USER_CHAR = FIRST_USER.slice(0, 16).split("");
    const RANDOM_NUMS = firstUserRandomNum(FIRST_USER_CHAR);

    for (let i = 0; i < FIRST_USER_CHAR.length; i++) {
      firstUserData.push({
        num: RANDOM_NUMS[i],
        char: FIRST_USER_CHAR[i],
        class: "active-" + i,
        active: i,
      });
    }

    for (let i = 0; i < 16; i++) {
      pictureCard = document.createElement("li");
      picFront = document.createElement("span");
      picBack = document.createElement("span");
      picFront.classList.add("front");
      picBack.classList.add("back");

      pictureCard.classList.add("picture-card");
      picTxtCase = NICK_CHAR_LIST[Math.floor(Math.random() * NICK_CHAR_LIST.length)];
      for (let j = 0; j < firstUserData.length; j++) {
        if (i === firstUserData[j].num) {
          picTxtCase = firstUserData[j].char;
          pictureCard.classList.add("active");
          // pictureCard.classList.add(firstUserData[j].class); // 닉네임 순서대로 class 부여
          pictureCard.setAttribute("data-active", firstUserData[j].active); // 닉네임 순서대로 acitve data 부여
        }
      }
      picTxtArr.push(picTxtCase);
      picBack.innerHTML = picTxtCase;

      pictureCard.appendChild(picFront);
      pictureCard.appendChild(picBack);

      window.sessionStorage.setItem("picTxt", JSON.stringify(picTxtArr));
      _elem.appendChild(pictureCard);
    }

    // flip animation
    flipAnimation();

    LOADING_EVENT.hide();
    // ==============================================
    // const EL = document.createElement("div");
    // EL.innerHTML = FIRST_USER;
    // EL.style.cssText = "position: fixed;left: 0;top: 0;";
    // const GAME_SCENE = document.getElementById("gameScene");
    // if (GAME_SCENE) GAME_SCENE.appendChild(EL);
  } catch (error) {
    throw throwObj(error?.errCase ?? 'errorComn', error?.message ?? `not found first user : ${error}`);
  }
};
