import errorManager from '@/client/js/module/errorHandler/errorManager';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import drawResultCardInfo from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/drawResultCardInfo';
import cardCompare from '@/client/js/views/game/indianPocker/fns/common/compareCard/cardCompare';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default (_eNum, _pNum) => {
  try {
    const encryptKey1 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const encryptKey2 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

    // 내 카드와 상대 카드 비교
    cardCompare(_pNum, _eNum)
      .then(result => {
        // TEST: 같은카드 테스트
        // return drawResultCardInfo('tie');

        switch (Number(result)) {
          case 0: // 내 카드가 낮음
            drawResultCardInfo('end');
            // betUser === false
            storageMethod('s', 'SET_ITEM',
              encryptKey1, // betUser
              X.enc(decodeTF(_t([120, 111, 98, 116, 110]))) // "xobtn" : false
            );
            // betUserFirst === false
            storageMethod('s', 'SET_ITEM',
              encryptKey2, // betUserFirst
              X.enc(decodeTF(_t([106, 103, 118, 101, 97]))) // "jgvea" : false
            );
            break;
          case 1: // 내 카드가 높음
            drawResultCardInfo('start');
            // betUser === true
            storageMethod('s', 'SET_ITEM',
              encryptKey1, // betUser
              X.enc(decodeTF(_t([99, 119, 114, 117]))) // "cwru" : true
            );
            // betUserFirst === true
            storageMethod('s', 'SET_ITEM',
              encryptKey2, // betUserFirst
              X.enc(decodeTF(_t([107, 102, 112, 97]))) // "kfpa" : true
            );
            break;
          case 2: // 같은 카드
            drawResultCardInfo('tie');
            break;
          default:
            throw throwObj('cardNum', 'Select card compare failed.');
        };
      })
      .catch(error => {
        errorManager(error, false);
      });

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'flipEnemyCardCheck error.'
    );
  };
};
