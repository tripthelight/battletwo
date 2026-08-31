import '@/client/assets/scss/game/findTheSamePicture/common';
import '@/client/js/common/common';

import {
  connectSignaling,
} from '@/client/js/module/webRTC/connectSignaling';

import {
  deliverToGame,
  handleEnvelope,
} from '@/client/js/network/findTheSamePicture/response';

import {
  request,
} from '@/client/js/network/findTheSamePicture/request';

const GAME_NAME = 'findTheSamePicture';

/**
 * WebRTC/DataChannel 연결이 완전히 준비된 뒤
 * Find Same Picture의 현재 프로토타입 입력을 활성화한다.
 */
async function startGame() {
  console.log('[findTheSamePicture] Peer READY. Game start.');

  // 기존 프로토타입 동작을 그대로 유지한다.
  // 로컬 body 클릭을 상대 Peer에게 전달한다.
  document.body.onclick = () => {
    request('bodyClick');
  };
}

/**
 * Find Same Picture는 현재 서버 생성 storage/keypair가 필요하지 않다.
 * Peer READY 직후 바로 startGame()으로 진입한다.
 */
function init() {
  connectSignaling(
    false,
    {
      deliverToGame,
      handleEnvelope,
      startGame,
      gameName: GAME_NAME,
      requiresStorage: false,
    },
  );
}

window.addEventListener(
  'pageshow',
  () => {
    init();
  },
);
