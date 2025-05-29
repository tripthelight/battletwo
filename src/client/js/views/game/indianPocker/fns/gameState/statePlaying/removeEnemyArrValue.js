import validateStore, { updateEnum } from '@/client/store/validateStore';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';
import P1 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P1';
import P2 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P2';
import P3 from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/P3';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_enum) => {
  // element | seeeion 체크
  // const CARD_NUM = window.sessionStorage.cardNum;
  // if (!CARD_NUM) return;
  // const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
  // sessionStorage cardNum key 찾기
  const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (!decryptVal) return;

  // const CARD_NUM_ARR = JSON.parse(decryptVal);
  // if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return;
  if (decryptVal === '') return;

  validateStore.dispatch(updateEnum({ enum: _enum }));

  // 상대 peer에게 내 cardNum을 보내
  request('requestRemoveEnemyCardNum', {
    step: 'encryptCardNum',
    list: decryptVal,
    storeageKey: encryptKey,
  });

  // 이 아래를 message response에서 처리
  /*
  setTimeout(() => {
    P1(_enum)
      .then((_numRes) => {
        return P2(_numRes.join());
      })
      .then((_index) => {
        const NUM = JSON.parse(JSON.stringify(_index));
        return P3(NUM);
      })
      .then((_cardNumList) => {
        // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(_cardNumList));
        storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(_cardNumList));
      })
      .catch((error) => {
        errorManagement({ errCase: 'errorComn', message: 'P1함수 error :: ' });
      });
  }, timeInterval_1);
  */
};
