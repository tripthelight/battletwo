import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';

export default {
  waitEnemy: () => {
    // storageMethod('s', 'SET_ITEM', 'gameState', 'waitEnemy');
    const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]);
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]));
  },
};
