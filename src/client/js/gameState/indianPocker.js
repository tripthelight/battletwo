import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateChoiceCard from '@/client/js/gameState/indianPocker/gameStateChoiceCard';
import gameStateBasicBet from '@/client/js/gameState/indianPocker/gameStateBasicBet';
import gameStateGameOver from '@/client/js/gameState/indianPocker/gameStateGameOver';
import gameStatePlaying from '@/client/js/gameState/indianPocker/gameStatePlaying';

export default {
  waitEnemy: () => {
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88])); // waitEnemy
  },
  choiceCard: () => {
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])); // choiceCard
    gameStateChoiceCard();
  },
  basicBet: (reloadState) => {
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]));
    gameStateBasicBet(reloadState);
  },
  playing: () => {
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]));
    gameStatePlaying();
  },
  gameOver: () => {
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]));
    gameStateGameOver();
  },
};
