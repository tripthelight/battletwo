import CryptoJS from 'crypto-js';
import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

const enemyBeforeCubeKey = () => (
  findCharCode([87, 81, 90, 80, 77, 76, 65, 84, 75, 67]) // enemyBeforeCube
);

const privateKey = () => {
  const key = KEY?.prk ?? null;
  if (!key) {
    throw throwObj('errorComn', 'enemyBeforeCube - decrypt key failed.');
  }
  return key;
};

export const hasEnemyBeforeCube = () => {
  const value = storageMethod('s', 'GET_ITEM', enemyBeforeCubeKey());
  return value !== null && value !== '';
};

export const loadEnemyBeforeCube = () => {
  const value = storageMethod('s', 'GET_ITEM', enemyBeforeCubeKey());
  if (value === null || value === '') return null;

  const decrypted = CryptoJS.AES
    .decrypt(value, privateKey())
    .toString(CryptoJS.enc.Utf8);

  if (decrypted === '') {
    throw throwObj('sessionStorageLoss', 'enemyBeforeCube - decrypt value failed.');
  }

  return decrypted;
};

export const saveEnemyBeforeCube = (cubeCode) => {
  if (!cubeCode) return;

  const encrypted = CryptoJS.AES.encrypt(cubeCode, privateKey()).toString();
  storageMethod('s', 'SET_ITEM', enemyBeforeCubeKey(), encrypted);
};

export const clearEnemyBeforeCube = () => {
  const key = enemyBeforeCubeKey();
  const value = storageMethod('s', 'GET_ITEM', key);
  if (value === null || value === '') return;

  storageMethod('s', 'EMPTY_VALUE', key);
};
