import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResultCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawResultCardInfo';

export default (_eNum, _pNum) => {
  if (_eNum > _pNum) {
    drawResultCardInfo('end');
    storageMethod('s', 'SET_ITEM', 'betUser', false);
    storageMethod('s', 'SET_ITEM', 'betUserFirst', false);
  } else if (_eNum < _pNum) {
    drawResultCardInfo('start');
    storageMethod('s', 'SET_ITEM', 'betUser', true);
    storageMethod('s', 'SET_ITEM', 'betUserFirst', true);
  } else if (_eNum == _pNum) {
    drawResultCardInfo('tie');
  } else {
    return errorManagement({ errCase: 'errorComn', message: 'flipEnemyCardCheck 함수에서 _eNum, _pNum 을 못받았습니다.' });
  }
};
