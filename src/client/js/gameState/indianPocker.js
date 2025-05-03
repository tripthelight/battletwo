import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateBasicBet from '@/client/js/gameState/indianPocker/gameStateBasicBet';
import gameStateGameOver from '@/client/js/gameState/indianPocker/gameStateGameOver';

export default {
  waitEnemy: () => {
    storageMethod('s', 'SET_ITEM', 'gameState', 'waitEnemy');
  },
  choiceCard: () => {
    storageMethod('s', 'SET_ITEM', 'gameState', 'choiceCard');
  },
  basicBet: () => {
    storageMethod('s', 'SET_ITEM', 'gameState', 'basicBet');
    gameStateBasicBet();
  },

  gameOver: () => {
    storageMethod('s', 'SET_ITEM', 'gameState', 'gameOver');
    gameStateGameOver();
  },
};
