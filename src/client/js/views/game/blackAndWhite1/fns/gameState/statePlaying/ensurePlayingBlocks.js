import CryptoJS from 'crypto-js';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import deviceStateStore from '@/client/store/deviceStateStore';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import evenOdd from '@/client/js/views/game/blackAndWhite1/fns/common/evenOdd';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * 새로고침으로 사라진 playing 단계의 기본 Cube DOM을 복원한다.
 *
 * 정상 진입에서는 ready/waitEnemyShuffle 단계에서 이미 생성된 DOM을 그대로 사용한다.
 * setOrder/playing 단계에서 document가 새로 만들어진 경우에만 sessionStorage의
 * playerNumOrder를 기준으로 enemy-block / player-block / ul.cube를 재생성한다.
 *
 * 상대 Cube 목록은 여기서 직접 만들지 않는다.
 * enterPlaying()의 다음 단계인 showEnemyCube()가 저장된 emenyCube를 이용해 생성한다.
 *
 * @returns {boolean} DOM을 새로 복원했으면 true, 기존 DOM을 사용하면 false
 */
export default function ensurePlayingBlocks() {
  const gameScene = document.getElementById('gameScene');
  if (!gameScene) {
    throw throwObj('elementLoss', 'ensurePlayingBlocks - gameScene failed.');
  }

  const enemyBlock = gameScene.querySelector('.enemy-block');
  const playerBlock = gameScene.querySelector('.player-block');
  const cube = playerBlock?.querySelector('ul.cube') ?? null;

  // 정상 진입: 기존 DOM을 그대로 사용한다.
  if (enemyBlock && playerBlock && cube) return false;

  // 부분적으로만 남은 비정상 DOM은 중복 생성을 막기 위해 정리 후 원자적으로 복원한다.
  enemyBlock?.remove();
  playerBlock?.remove();

  const privateKey = KEY?.prk ?? null;
  if (!privateKey) {
    throw throwObj('errorComn', 'ensurePlayingBlocks - order decrypt key failed.');
  }

  const playerNumOrderKey = findCharCode([
    85, 86, 68, 74, 69, 77, 89, 80, 66, 75,
  ]); // playerNumOrder

  const encryptedOrder = storageMethod('s', 'GET_ITEM', playerNumOrderKey);
  if (!encryptedOrder) {
    throw throwObj('sessionStorageLoss', 'ensurePlayingBlocks - playerNumOrder failed.');
  }

  const bytes = CryptoJS.AES.decrypt(encryptedOrder, privateKey);
  const decryptedOrder = bytes.toString(CryptoJS.enc.Utf8);

  if (!decryptedOrder || !/^[0-8]+$/.test(decryptedOrder)) {
    throw throwObj('sessionStorageLoss', 'ensurePlayingBlocks - order decrypt value failed.');
  }

  const playerNumOrder = [...decryptedOrder].map(Number);

  // blackAndWhite1의 Cube 번호는 0~8이고 같은 번호가 중복될 수 없다.
  if (
    playerNumOrder.length > 9 ||
    new Set(playerNumOrder).size !== playerNumOrder.length
  ) {
    throw throwObj('sessionStorageLoss', 'ensurePlayingBlocks - playerNumOrder value failed.');
  }

  const newEnemyBlock = document.createElement('div');
  const newPlayerBlock = document.createElement('div');
  const newCube = document.createElement('ul');

  newEnemyBlock.classList.add('enemy-block');
  newPlayerBlock.classList.add('player-block');
  newCube.classList.add('cube', 'start');

  const deviceState = deviceStateStore.getState().deviceStateState.deviceState;

  for (const num of playerNumOrder) {
    const cubeItem = document.createElement('li');
    cubeItem.textContent = String(num);
    evenOdd(cubeItem);

    // activeUserCheck()가 실제 Turn을 확인한 뒤 필요한 Player에게만 true로 바꾼다.
    if (deviceState === 'pc') {
      cubeItem.setAttribute('draggable', 'false');
    }

    newCube.appendChild(cubeItem);
  }

  newPlayerBlock.appendChild(newCube);

  gameScene.appendChild(newEnemyBlock);
  gameScene.appendChild(newPlayerBlock);

  return true;
}
