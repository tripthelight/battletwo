import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import CryptoJS from "crypto-js";
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { reactiveState } from "@/client/js/views/game/blackAndWhite1/fns/common/variable";
import disabledSelectInit from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/disabledSelectInit";
import comnPcEnd from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/comnPcEnd";


export default (e) => {
  e.preventDefault();

  const PVK = KEY?.prk ?? null; // private key
  if (!PVK) {
    throw throwObj('errorComn', 'selectDrop - order decrypt key failed.');
  };

  const BLACK_SQUARE = document.querySelector(".black-square");
  if (BLACK_SQUARE.classList.contains("over")) {
    BLACK_SQUARE.classList.remove("over");
  };

  const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);

  const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  // decrypted 가 빈 문자열이면 사용자가 storage value 조작함
  if (decrypted === "") {
    throw throwObj('sessionStorageLoss', 'selectDrop - order decrypt value failed.');
  };

  const playerNumOrder = [...decrypted].map(Number);
  console.log("playerNumOrder >>>>>>>>>>>>>>>> ", playerNumOrder);
  console.log("reactiveState.idxS >>>>>>>>>>>> ", reactiveState.idxS);

  const selectCubeNum = playerNumOrder[reactiveState.idxS];

  // 내가 선택해서 옮긴 큐브의 번호
  console.log("내가 선택해서 옮긴 큐브의 번호 >>>> ", selectCubeNum);

  reactiveState.idxS = null;
  /*
  event.preventDefault();
  const CUBE = document.querySelector(".cube.ready.start");
  const BLACK_SQUARE = document.querySelector(".black-square");
  if (BLACK_SQUARE.classList.contains("over")) {
    BLACK_SQUARE.classList.remove("over");
  }

  const data = event.dataTransfer.getData("Text");
  const NUM_DATA = Number(data); // 내가 선택해서 옮긴 큐브의 번호

  if (NUM_DATA % 2 === 0) {
    BLACK_SQUARE.classList.remove("odd");
    BLACK_SQUARE.classList.add("even");
  } else {
    BLACK_SQUARE.classList.remove("even");
    BLACK_SQUARE.classList.add("odd");
  }
  const NUM_EL = document.createElement("span");
  NUM_EL.innerHTML = NUM_DATA;
  const SPAN_EL = BLACK_SQUARE.querySelectorAll("span");
  if (SPAN_EL.length === 0) {
    BLACK_SQUARE.appendChild(NUM_EL);
    // disabled select
    disabledSelectInit();
    comnPcEnd(CUBE, NUM_DATA);
  };
  // 새로고침 후 진입 시
  if (SPAN_EL.length > 0) {
    for (let i = 0; i < SPAN_EL.length; i++) {
      SPAN_EL[i].remove();
    }
    BLACK_SQUARE.appendChild(NUM_EL);
    // disabled select
    disabledSelectInit();
    comnPcEnd(CUBE, NUM_DATA);
  }
  // event.target.appendChild(document.getElementById(data));
  */
};
