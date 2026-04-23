import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateChoiceFirstPlayer from '@/client/js/gameState/findTheSamePicture/gameStateChoiceFirstPlayer';
import gameStateFirstUserAni from '@/client/js/gameState/findTheSamePicture/gameStateFirstUserAni';
import gameStatePlaying from '@/client/js/gameState/findTheSamePicture/gameStatePlaying';
import gameStateGameOver from '@/client/js/gameState/findTheSamePicture/gameStateGameOver';

export default {
  waitEnemy: () => {
    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([89, 73, 74, 69, 67, 85, 65, 84, 81, 77])); // waitEnemy
  },
  choiceFirstPlayer: () => {
    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75])); // choiceFirstPlayer
    gameStateChoiceFirstPlayer();
  },
  firstUserAni: () => {
    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89])); // firstUserAni
    gameStateFirstUserAni();
  },
  playing: () => {
    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79])); // playing
    gameStatePlaying();
  },
  gameOver: () => {
    const encryptKey = findCharCode([87, 67, 76, 82, 72, 74, 68, 66, 69, 73]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87])); // gameOver
    gameStateGameOver();
  },
};
