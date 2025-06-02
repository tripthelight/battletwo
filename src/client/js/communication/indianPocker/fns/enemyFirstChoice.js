import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import flipEnemyFirstCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyFirstCard';

export default (_num) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_num);
  });
  promise
    .then((_number) => {
      // storageMethod('s', 'SET_ITEM', 'enemyFirstNumber', _number);

      const encryptKey = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
      storageMethod('s', 'SET_ITEM', encryptKey, _number);

      setTimeout(flipEnemyFirstCard, timeInterval_1);
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyFirstChoice()의 num을 받지 못했습니다.' });
    });
};
