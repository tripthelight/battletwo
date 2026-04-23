import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import initNickName from '@/client/js/functions/initNickName';
import findNickname from '@/client/js/functions/findNickname';
import waitPeer from '@/client/js/functions/waitPeer';
import { connectSignaling, getRL } from '@/client/js/module/webRTC/connectSignaling';
import deliverToGame from '@/client/js/module/webRTC/reliable/indianPoker/deliverToGame';
import handleEnvelope from '@/client/js/module/webRTC/reliable/indianPoker/handleEnvelope';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import makePayload from '@/client/js/views/game/indianPocker/fns/common/makePayload/makePayload';
import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import textDE from '@/client/js/module/crypts/textDE';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import storageMethod from '@/client/js/module/storage/storageMethod';
import {
  beginRoundResultReloadWait,
  ROUND_RESULT_STEP,
} from '@/client/js/network/indianPocker/fns/roundResultReloadSync';




LOADING_EVENT.show();
const GAME_NAME = 'indianPocker';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    waitPeer(2);
    await makeCard();
    let keepLoading = false;
    makePayload(); // 카드 선택 시 보여지는 카드의 svg > path의 number/T payload

    if (getRL(false)) {
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);

      // 새로 고침 후 재연결인 경우
      switch (decryptVal) {
        // case 'waitEnemy':
        case findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]):
          console.log("새로고침 후 : waitEnemy");

          // choiceCard
          indianPockerGameState.choiceCard();
          break;
        // case 'choiceCard':
        case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]):
          console.log("새로고침 후 : choiceCard");
          indianPockerGameState.choiceCard();
          break;
        // case 'basicBet':
        case findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]):
          console.log("새로고침 후 : basicBet");
          indianPockerGameState.basicBet();
          break;
        // case 'playing':
        case findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]):
          console.log("새로고침 후 : playing");
          // playing 중 새로고침 한 사용자
          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]), // playingReloadUser
            X.enc(decodeTF(textDE([99,119,104,117]))) // "cwhu" : true
          );
          const encryptKey1 = findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]); // foldState
          const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
          if (encryptVal1 !== null && encryptVal1 !== "") {
            // 이전 판에서 FOLD animation 실행중 일 때 새로고침 한 경우
            if (X.dec(encryptVal1)) { // foldState : true

              console.log("foldState :::::::::: true");

              // FOLD를 실행한 PLAYER
              const encryptKey2 = findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]); // foldUser
              const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
              if (encryptVal2 !== null && encryptVal2 !== "") {
                if (X.dec(encryptVal2)) { // foldUser : true
                  console.log("foldUser :::::::::: true");

                  // FOLD를 실행한 PLAY가 새고로침
                  keepLoading = true;
                  beginRoundResultReloadWait({
                    reloadState: 'foldLocal',
                    enterNextStep: ({ step }) => {
                      if (step === ROUND_RESULT_STEP.GAME_OVER) {
                        indianPockerGameState.gameOver();
                        return;
                      }

                      if (step === ROUND_RESULT_STEP.BASIC_BET) {
                        indianPockerGameState.basicBet('foldLocal');
                      }
                    },
                  });
                } else { // foldUser : false
                  console.log("foldUser :::::::::: false");

                  // FOLD를 받은 PLAY가 새고로침
                  keepLoading = true;
                  beginRoundResultReloadWait({
                    reloadState: 'foldRemote',
                    enterNextStep: ({ step }) => {
                      if (step === ROUND_RESULT_STEP.GAME_OVER) {
                        indianPockerGameState.gameOver();
                        return;
                      }

                      if (step === ROUND_RESULT_STEP.BASIC_BET) {
                        indianPockerGameState.basicBet('foldRemote');
                      }
                    },
                  });
                }
              }
            } else {
              const encryptKey3 = findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]); // betResulting
              const encryptVal3 = storageMethod('s', 'GET_ITEM', encryptKey3);
              if (encryptVal3 !== null && encryptVal3 !== '' && X.dec(encryptVal3)) keepLoading = true;
              indianPockerGameState.playing();
            }
          } else {
            const encryptKey3 = findCharCode([65, 82, 73, 84, 83, 87, 74, 67, 89, 90]); // betResulting
            const encryptVal3 = storageMethod('s', 'GET_ITEM', encryptKey3);
            if (encryptVal3 !== null && encryptVal3 !== '' && X.dec(encryptVal3)) keepLoading = true;
            indianPockerGameState.playing();
          }
          break;
        // case 'gameOver':
        case findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]):
          console.log("새로고침 후 : gameOver");
          indianPockerGameState.gameOver();
          break;

        default:
          throw throwObj('errorComn', 'refresh gameState failed.');
      }
    } else {
      // choiceCard
      indianPockerGameState.choiceCard();
    }

    if (!keepLoading) LOADING_EVENT.hide();
  } catch (error) {
    errorManager(error, false);
  }
};

// —————————————————————————————————————————————
// INIT ————————————————————————————————————————
// —————————————————————————————————————————————
async function init() {
  await initNickName();
  waitPeer(1, findNickname('localPlayer'));
  connectSignaling(false, { deliverToGame, handleEnvelope, startGame, gameName: GAME_NAME });
}

// —————————————————————————————————————————————
// PAGE SHOW ———————————————————————————————————
// —————————————————————————————————————————————
window.addEventListener('pageshow', async () => {
  // *** 이 파일은 분석하지 말것
  // await init();
});
