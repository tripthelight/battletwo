import CryptoJS from 'crypto-js';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import evenOdd from '@/client/js/views/game/blackAndWhite1/fns/common/evenOdd';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import cubeListStyle from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeListStyle';
import { timeInterval_30 } from '@/client/js/functions/variable';

function loadPlayerNumOrder() {
  const PVK = KEY?.prk ?? null;
  if (!PVK) throw throwObj('errorComn', 'drawPlayingLocalCube - order decrypt key failed.');

  const encryptKey1 = findCharCode([85, 86, 68, 74, 69, 77, 89, 80, 66, 75]); // playerNumOrder
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', 'drawPlayingLocalCube - playerNumOrder key failed.');

  const bytes = CryptoJS.AES.decrypt(encryptVal1, PVK);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  if (decrypted === '') throw throwObj('sessionStorageLoss', 'drawPlayingLocalCube - order decrypt value failed.');
  if (!/^[0-8]{1,9}$/.test(decrypted)) {
    throw throwObj('sessionStorageLoss', 'drawPlayingLocalCube - playerNumOrder value failed.');
  }

  const cubeNums = [...decrypted].map(Number);
  if (new Set(cubeNums).size !== cubeNums.length) {
    throw throwObj('sessionStorageLoss', 'drawPlayingLocalCube - playerNumOrder duplicate value failed.');
  }

  return cubeNums;
}

export default () => {
  try {
    const GAME_SCENE = document.getElementById('gameScene');
    if (!GAME_SCENE) throw throwObj('elementLoss', 'drawPlayingLocalCube - gameScene failed.');

    const cubeNums = loadPlayerNumOrder();

    const ENEMY_BLOCK_EL = document.createElement('div');
    const PLAYER_BLOCK_EL = document.createElement('div');
    const PLAYER_CUBE_LIST_EL = document.createElement('ul');
    ENEMY_BLOCK_EL.classList.add('enemy-block');
    PLAYER_BLOCK_EL.classList.add('player-block');
    PLAYER_CUBE_LIST_EL.classList.add('cube');
    PLAYER_CUBE_LIST_EL.classList.add('ready');
    PLAYER_CUBE_LIST_EL.classList.add('start');
    PLAYER_CUBE_LIST_EL.classList.add('playing');
    PLAYER_CUBE_LIST_EL.classList.add('disabled');

    for (let i = 0; i < cubeNums.length; i++) {
      const PLAYER_CUBES_EL = document.createElement('li');
      PLAYER_CUBES_EL.innerHTML = cubeNums[i];
      evenOdd(PLAYER_CUBES_EL);
      PLAYER_CUBE_LIST_EL.appendChild(PLAYER_CUBES_EL);
    }

    PLAYER_BLOCK_EL.appendChild(PLAYER_CUBE_LIST_EL);
    GAME_SCENE.appendChild(ENEMY_BLOCK_EL);
    GAME_SCENE.appendChild(PLAYER_BLOCK_EL);

    setTimeout(() => {
      if (!PLAYER_CUBE_LIST_EL.isConnected) return;
      cubeListStyle();
      const cubeHeight = PLAYER_CUBE_LIST_EL.clientHeight;
      const result = (PLAYER_BLOCK_EL.clientHeight - cubeHeight) / 2;
      PLAYER_CUBE_LIST_EL.style.transform = `translateY(${result}px)`;
    }, timeInterval_30);
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'drawPlayingLocalCube.js error'
    );
  }
};
