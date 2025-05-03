import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import flipEnemyFirstCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyFirstCard';

export default (_num) => {
  let promise = new Promise((resolve, reject) => {
    resolve(_num);
  });
  promise
    .then((_number) => {
      storageMethod('s', 'SET_ITEM', 'enemyFirstNumber', _number);
      setTimeout(flipEnemyFirstCard, timeInterval_1);
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyFirstChoice()의 num을 받지 못했습니다.' });
    });
};
