import storageMethod from '@/client/js/module/storage/storageMethod';

export default {
  waitEnemy: () => {
    storageMethod('s', 'SET_ITEM', 'gameState', 'waitEnemy');
  },
};
