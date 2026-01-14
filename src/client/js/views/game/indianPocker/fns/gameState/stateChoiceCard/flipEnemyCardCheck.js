import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import drawResultCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawResultCardInfo';
import cardCompare from '@/client/js/views/game/indianPocker/fns/common/compareCard/cardCompare';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_eNum, _pNum) => {
  try {
    const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
    const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
    const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const encryptKey2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

    // ————————————————————————————————————————————————————————————————————————————————————————————

    // 내 카드와 상대 카드 비교
    cardCompare(_pNum, _eNum)
      .then(result => {
        switch (Number(result)) {
          case 0:
            drawResultCardInfo('end');
            storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2);
            storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_2);
            break;
          case 1:
            drawResultCardInfo('start');
            storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1);
            storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_1);
            break;
          case 2:
            drawResultCardInfo('tie');
            break;
          default:
            throw { message: 'flipEnemyCardCheck _eNum, _pNum failed.' };
        }
      })
      .catch(err => {
        throw { message: err.message ?? 'select card bit' };
      });



    // ————————————————————————————————————————————————————————————————————————————————————————————

    /* if (_eNum > _pNum) {
      drawResultCardInfo('end');
      storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_2);
      storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_2);
    } else if (_eNum < _pNum) {
      drawResultCardInfo('start');
      storageMethod('s', 'SET_ITEM', encryptKey1, encryptVal_1);
      storageMethod('s', 'SET_ITEM', encryptKey2, encryptVal_1);
    } else if (_eNum === _pNum) {
      drawResultCardInfo('tie');
    } else {
      throw throwObj('errorComn', 'flipEnemyCardCheck _eNum, _pNum failed.');
    }; */
  } catch (error) {
    console.log('error : ', error);
    throw throwObj(
      error?.errCase ?? 'errorComn',
      'flipEnemyCardCheck error.'
    );
  };
};
