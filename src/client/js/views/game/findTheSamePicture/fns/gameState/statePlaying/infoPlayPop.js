import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

import { COOKIE_DECIDE_DAY, CHECK_COOKIE_NAME } from "@/client/js/module/cookie";
import { bottomSheet } from "@/client/components/popup/bottomSheet/bottomSheet";
import drawModal from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawModal";
import activeContainerClass from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/activeContainerClass";
import { text } from '@/client/js/functions/language';

import X from '@/client/js/module/crypts/bool-obf';

import { deobfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';

import _t from '@/client/js/module/crypts/textDE';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';

export default () => {
  // 쿠키가 있을 경우 실행 안함
  const COOKIE_NAME = "infoPlayPop";
  if (CHECK_COOKIE_NAME(COOKIE_NAME)) return;

  const INFO_POP_BG = document.querySelectorAll(".info-play-pop-bg");
  if (INFO_POP_BG.length > 0) return;
  const BOARD = document.querySelector(".board");
  if (!BOARD) throw throwObj('elementLoss', "infoPlayPop.js - .board element failed.");
  const PLAYER_BLOCK = document.querySelector(".player-block");
  if (!PLAYER_BLOCK) throw throwObj('elementLoss', "infoPlayPop.js - .player-block element failed.");
  const PLAYER_CARD_LIST = PLAYER_BLOCK.querySelector("ul");
  if (!PLAYER_CARD_LIST) throw throwObj('elementLoss', "infoPlayPop.js - .player-block ul element failed.");
  const PLAYER_CARDS = PLAYER_CARD_LIST.querySelectorAll("li");
  if (!PLAYER_CARDS || PLAYER_CARDS.length < 1) throw throwObj('elementLoss', "infoPlayPop.js - .player-block ul length element failed.");
  const PLAYER_ICON = document.querySelector(".player-icon");
  if (!PLAYER_ICON) throw throwObj('elementLoss', "infoPlayPop.js - .player-icon element failed.");

  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) throw throwObj('elementLoss', "infoPlayPop.js - #container element failed.");

  // const ROUND = window.sessionStorage.round;
  // if (!ROUND) throw throwObj('sessionStorageLoss', "infoPlayPop.js - round failed.");
  const encryptKey1 = findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]); // round
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "infoPlayPop.js - round failed.");
  const decryptVal1 = deobfuscateInt32(encryptVal1);

  // const FIRST_USER = window.sessionStorage.clickUser;
  // if (!FIRST_USER) errorComn("clickUser not found");
  const encryptKey2 = findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]); // clickUser
  const encryptVal2 = storageMethod('s', 'GET_ITEM', encryptKey2);
  if (!encryptVal2) throw throwObj('sessionStorageLoss', "infoPlayPop.js - clickUser failed.");

  const makeCompairNum = (arr) => dec(enc(encryptNumOfStr(_t(arr))));
  const COMPAIR_NUMS = [
    makeCompairNum([101, 119, 119, 101, 101, 101, 101, 98]), // "ewweeeeb" : 1
    makeCompairNum([119, 119, 101, 101, 119, 119, 101, 112]), // "wweewwep" : 2
    makeCompairNum([119, 101, 119, 101, 101, 101, 119, 99]), // "weweeewc" : 3
  ];

  // if (Number(ROUND) > 3) return;
  if (
    decryptVal1
    >
    COMPAIR_NUMS[2] // 3
  ) return;

  // if (Number(ROUND) === 1 || Number(ROUND) === 2) {
  if (
    decryptVal1 === COMPAIR_NUMS[0] // 1
    ||
    decryptVal1 === COMPAIR_NUMS[1] // 2
  ) {
    // 1라운드 firset User
    // if (FIRST_USER === "true") {
    if (X.dec(encryptVal2)) {
      // container addClass active-
      activeContainerClass(PLAYER_CARDS);

      // draw BG
      CONTAINER.classList.add("info-play-pop");

      // draw modal
      drawModal(CONTAINER, PLAYER_BLOCK);
    } else {
      bottomSheet.show(text.findsamepicture.wait, 5000);
    }
  }
  // if (Number(ROUND) === 3) {
  if (
    decryptVal1 === COMPAIR_NUMS[2] // 3
  ) {
    // 3라운드 부터는 쿠키 생성해서 팝업 안보이게 함
    COOKIE_DECIDE_DAY(COOKIE_NAME);
  }
};
