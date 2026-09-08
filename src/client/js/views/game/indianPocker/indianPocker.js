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
import { request } from '@/client/js/network/indianPocker/request';
import {
  RESULT_RELOAD_STATE,
  isResultReloadUser,
} from '@/client/js/network/indianPocker/fns/resultReloadSync';
import { hasGameOverSnapshot } from '@/client/js/views/game/indianPocker/fns/common/gameOverSnapshot';
import {
  markGameHistoryEntry,
  skipRetiredGameHistoryEntry,
} from '@/client/js/module/navigation/gameHistory';

LOADING_EVENT.show();
const GAME_NAME = 'indianPocker';

// —————————————————————————————————————————————
// START GAME ——————————————————————————————————
// —————————————————————————————————————————————
async function startGame() {
  try {
    let keepLoading = false;
    waitPeer(2);
    await makeCard();
    makePayload();

    if (getRL(false)) {
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);

      switch (decryptVal) {
        case findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]): // waitEnemy
          console.log('새로고침 후 : waitEnemy');
          indianPockerGameState.choiceCard();
          break;

        case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]): // choiceCard
          console.log('새로고침 후 : choiceCard');
          indianPockerGameState.choiceCard();
          break;

        case findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]): // basicBet
          console.log('새로고침 후 : basicBet');

          if (isResultReloadUser()) {
            keepLoading = true;
            LOADING_EVENT.show();
            request('requestDoubleReload', RESULT_RELOAD_STATE.BASIC_BET);
          } else {
            indianPockerGameState.basicBet();
          }
          break;

        case findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]): // playing
          console.log('새로고침 후 : playing');
          keepLoading = true;
          LOADING_EVENT.show();

          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]), // playingReloadUser
            X.enc(decodeTF(textDE([99, 119, 104, 117]))), // true
          );

          {
            const encryptKey1 = findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]); // foldState
            const encryptVal1 = window.sessionStorage.getItem(encryptKey1);

            if (encryptVal1 !== null && encryptVal1 !== '') {
              if (X.dec(encryptVal1)) {
                console.log('foldState :::::::::: true');

                const encryptKey2 = findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]); // foldUser
                const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

                if (encryptVal2 !== null && encryptVal2 !== '') {
                  if (X.dec(encryptVal2)) {
                    console.log('foldUser :::::::::: true');
                    indianPockerGameState.basicBet('foldLocal');
                  } else {
                    console.log('foldUser :::::::::: false');
                    indianPockerGameState.basicBet('foldRemote');
                  }
                }
              }
            } else {
              indianPockerGameState.playing();
            }
          }
          break;

        case findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]): // gameOver
          console.log('새로고침 후 : gameOver');
          indianPockerGameState.gameOver();
          break;

        default:
          throw throwObj('errorComn', 'refresh gameState failed.');
      }
    } else {
      indianPockerGameState.choiceCard();
    }

    if (!keepLoading) {
      LOADING_EVENT.hide();
    }
  } catch (error) {
    errorManager(error, false);
  }
}

// —————————————————————————————————————————————
// INIT ————————————————————————————————————————
// —————————————————————————————————————————————
async function init() {
  await initNickName();

  // 완료된 게임은 keypair가 없는 새 document에서도 snapshot으로 결과 화면만 복구한다.
  // Signaling에 재진입하지 않으므로 이미 REPLAY한 이전 Peer의 새 매칭에 영향을 주지 않는다.
  if (hasGameOverSnapshot()) {
    storageMethod('s', 'REMOVE_ITEM', 'reload');
    storageMethod('s', 'REMOVE_ITEM', 'resumeToken');
    storageMethod('s', 'REMOVE_ITEM', 'roomId');
    indianPockerGameState.gameOver({ restore: true });
    return;
  }

  waitPeer(1, findNickname('localPlayer'));
  connectSignaling(false, {
    deliverToGame,
    handleEnvelope,
    startGame,
    gameName: GAME_NAME,
  });
}

// —————————————————————————————————————————————
// PAGE SHOW ———————————————————————————————————
// —————————————————————————————————————————————
markGameHistoryEntry();

window.addEventListener('pageshow', async (event) => {
  if (skipRetiredGameHistoryEntry(event)) return;
  await init();
});
