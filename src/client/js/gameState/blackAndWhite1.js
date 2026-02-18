import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateReady from '@/client/js/gameState/blackAndWhite1/gameStateReady';
import gameStateWaitEnemyShuffle from '@/client/js/gameState/blackAndWhite1/gameStateWaitEnemyShuffle';
import gameStateSetOrder from '@/client/js/gameState/blackAndWhite1/gameStateSetOrder';
import gameStatePlaying from '@/client/js/gameState/blackAndWhite1/gameStatePlaying';
import gameStateGameOver from '@/client/js/gameState/blackAndWhite1/gameStateGameOver';

export default {
  waitEnemy: () => {
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([66, 81, 78, 88, 74, 80, 70, 65, 90, 71])); // waitEnemy
  },
  ready: () => {
    // waitEnemyShuffle를 갔든 PEER가
    // 새로고침 당하면 왜 여기로 오지?
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65])); // ready
    gameStateReady();
  },
  waitEnemyShuffle: () => {
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71])); // waitEnemyShuffle
    gameStateWaitEnemyShuffle();
  },
  setOrder: () => {
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73])); // setOrder
    gameStateSetOrder();
  },
  playing: () => {
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78])); // playing
    gameStatePlaying();
  },
  gameOver: () => {
    const encryptKey = findCharCode([89, 79, 69, 71, 82, 83, 87, 75, 86, 85]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85])); // gameOver
    gameStateGameOver();
  },
};
