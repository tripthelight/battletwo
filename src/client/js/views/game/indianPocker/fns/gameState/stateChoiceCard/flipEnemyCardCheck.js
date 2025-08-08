import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResultCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawResultCardInfo';

export default (_eNum, _pNum) => {
  const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
  const encryptKey2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

  if (_eNum > _pNum) {
    drawResultCardInfo('end');
    // storageMethod('s', 'SET_ITEM', 'betUser', false);
    // storageMethod('s', 'SET_ITEM', 'betUserFirst', false);
    storageMethod('s', 'SET_ITEM', encryptKey1, false);
    storageMethod('s', 'SET_ITEM', encryptKey2, false);
  } else if (_eNum < _pNum) {
    drawResultCardInfo('start');
    // storageMethod('s', 'SET_ITEM', 'betUser', true);
    // storageMethod('s', 'SET_ITEM', 'betUserFirst', true);
    storageMethod('s', 'SET_ITEM', encryptKey1, true);
    storageMethod('s', 'SET_ITEM', encryptKey2, true);
  } else if (_eNum === _pNum) {
    drawResultCardInfo('tie');
  } else {
    // return errorManagement({ errCase: 'errorComn', message: 'flipEnemyCardCheck 함수에서 _eNum, _pNum 을 못받았습니다.' });
    throw { errCase: 'errorComn', message: 'flipEnemyCardCheck 함수에서 _eNum, _pNum 을 못받았습니다.' }
  }
};
