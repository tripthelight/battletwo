import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_gameState) => {
  // const GAME_STATE = window.sessionStorage.gameState;
  // if (!GAME_STATE) throw throwObj('sessionStorageLoss', "gameStateChk.js - gameState failed.");
  // if (_gameState === GAME_STATE) return true;

  const encryptKey1 = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "gameStateChk.js - gameState failed.");
  if (_gameState === encryptVal1) return true;
  return false;
};
