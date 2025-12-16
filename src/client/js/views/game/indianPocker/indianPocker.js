import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import reload from '@/client/js/module/reload';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import getCookies from '@/client/js/module/cookies/getCookies';
import delCookies from '@/client/js/module/cookies/delCookies';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import storageMethod from '@/client/js/module/storage/storageMethod';
import waitRefresh from '@/client/js/module/reload/waitRefresh';

import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import { enc, dec } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { GRS } from '@/client/js/module/crypts/generateRandomString';
import { connectSignaling } from '@/client/js/module/webRTC/connectSignaling';
import deliverToGame from '@/client/js/module/webRTC/reliable/indianPoker/deliverToGame';
import handleEnvelope from '@/client/js/module/webRTC/reliable/indianPoker/handleEnvelope';

LOADING_EVENT.show();
const GAME_NAME = 'indianPocker';

async function startGame() {
  // =========== START GAME ===========

  await makeCard();

  indianPockerGameState.choiceCard();

  LOADING_EVENT.hide();
}

async function init() {
  connectSignaling(false, { deliverToGame, handleEnvelope, startGame, gameName: GAME_NAME });
}

window.addEventListener('pageshow', init);

/*
// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {
    LOADING_EVENT.show();

    // await waitRefresh();

    const GAME_NAME = 'indianPocker';

    // 새로고침 트리거
    if (reload) {
      // 아직 연결 안되어 대기중에 새로고침하면 여기를 탐
      // 이전에 두 Peer가 연결되었다가 새로고침한 peer는 여기를 탐
      // 게임 중, sessionStorage를 모두 지우고, cookie도 지우고 새로고침 하면 처음부터 새로운 Peer와 재연결 - 게임 나감 처리로 간주
      if (getCookies(GAME_NAME)) {
        if (sessionStorage.length === 0) {
          throw { errCase: 'sessionStorageLoss', message: 'reload sessionStorageLoss failed.' };
        };
      } else {
        if (sessionStorage.length > 0) {
          throw { errCase: 'cookies', message: 'reload cookies failed.' };
        };
      };
      // await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      delCookies(GAME_NAME);
    };

    // 아예 처음 진입했거나,
    // 새로고침 했는데,
    // window.sessionStorage.length가 0보다 크고,
    // gc_at 쿠키가 있으면 이 단계로 진입

    await rtcPeer(GAME_NAME);

    // webRTC 연결 후,
    // gameState가 있으면 이 단계로 진입

    await makeCard();

    if (reload) {
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);

      switch (decryptVal) {
        case findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]): // waitEnemy
        case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]): // choiceCard
          indianPockerGameState.choiceCard();
          break;
        case findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]): // basicBet
          indianPockerGameState.basicBet();
          break;
        default:
          throw throwObj('sessionStorageLoss', 'reload gameState not found');
      };
    } else {
      // 처음 진입해서 상대 peer 와 연결 대기 중 새로고침 안하고
      // 처음 연결 되면
      // choiceCard 단계로 진입
      indianPockerGameState.choiceCard();
    };

    // console.log('────────────────');
    // console.log('betUser :::::::: ', findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]));
    // console.log('betUserFirst ::: ', findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]));
    // console.log('true ::::::::::: ', findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]));
    // console.log('false :::::::::: ', findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]));
    // console.log('────────────────');

    // const t1 = X.enc(decodeTF('smra'));
    // console.log('encrypt true ::::: ', t1);
    // console.log('decrypt true ::::: ', X.dec(t1));
    // const f1 = X.enc(decodeTF('joben'));
    // console.log('encrypt false ::::: ', f1);
    // console.log('decrypt false ::::: ', X.dec(f1));

    // console.log('[e w] shuffle : ', GRS(['w','e'], 4)); // ex) 'ewwe'

    // const numZero6 = encryptNumOfStr(GRS([_t([119]), _t([101])],parseInt(_t([54])))); // ex) "ewewwe" : 0
    // console.log('numZero6 : ', numZero6);
    // const numZero4 = encryptNumOfStr(GRS([_t([101])],parseInt(_t([52])))); // ex) "eeee" : 0
    // console.log('numZero4 : ', numZero4);
    // const numZero2 = encryptNumOfStr(GRS([_t([101]), _t([119])],parseInt(_t([50])))); // ex) "ew" : 0
    // console.log('numZero2 : ', numZero2);

    const num1 = encryptNumOfStr(GRS([_t([101])],parseInt(_t([53]))) + _t([98])); // ex) "wewr" : 1
    console.log('num1 : ', num1);

  } catch (error) {
    console.log('error indianPocker.js >>>>>>>>>>>> ');
    errorManager(error, false);
  };
};
*/

/*
function ec(str) {
  let encoder = new TextEncoder();
  let uint8Array = encoder.encode(str);
  return uint8Array;
};
ec('    ');

function dc(arr) {
  let uint8Array = new Uint8Array(arr);
  let decoder = new TextDecoder().decode(uint8Array);
  return decoder;
};
dc([     ]);
*/

/* window.onbeforeunload = function() {
  const cnt = window.localStorage.getItem('refresh');
  if (cnt === null) {
    storageMethod('l', 'SET_ITEM', 'refresh', 1);
  } else if (cnt !== null && parseInt(cnt) > 0) {
    storageMethod('l', 'SET_ITEM', 'refresh', parseInt(cnt) + 1);
  };
}; */

/* import { connectWithStartupDebounce } from '@/client/js/module/reload/startup-ws';

const WS_URL = `${process.env.SOCKET_HOST}:${process.env.RTC_PORT}`;

// SharedWorker 지원 여부 확인
const supportsSharedWorker = 'SharedWorker' in window;

async function connectViaSharedWorker() {
  const worker = new SharedWorker(new URL('@/client/js/module/reload/shared-ws.worker.js', import.meta.url), { type: 'module' });
  const port = worker.port;
  port.start();

  port.postMessage(JSON.stringify({ type: 'init', url: WS_URL, quietMs: 800 }));

  port.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    // 예: 상태 UI 반영
    if (msg.type === 'ws:open') { console.log('ws:open'); }
    if (msg.type === 'ws:message') { console.log('ws:message'); }
  };

  // 페이지 → 서버로 보내기
  function send(data) {
    port.postMessage(JSON.stringify({ type: 'send', data }));
  }

  return { send };
};

async function connectClient() {
  if (supportsSharedWorker) {
    try { return await connectViaSharedWorker(); }
    catch {}
  }

  // 폴백 1: 시작 디바운스 단독 사용
  const ws = await connectWithStartupDebounce(WS_URL);
  return {
    send: (data) => { if (ws.readyState === WebSocket.OPEN) ws.send(data); },
  };
}

connectClient().then(client => {
  console.log('connectClient then');

  // 예시: 시그널링 전송
  // client.send(JSON.stringify({ type: 'register', nickname: 'foo' }));
});
 */
