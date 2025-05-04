import { errorManagement } from '@/client/js/module/errorManagement';
import removeEnemyArrValue from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/removeEnemyArrValue';

export default (_num) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_num);
  });
  PROMISE.then((_num) => {
    if (!_num) return errorManagement({ errCase: 'errorComn', message: '_num 을 받지 못했습니다' });
    removeEnemyArrValue(_num);
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enemy에게 카드번호를 못받음 11 :: ' });
  });
};
