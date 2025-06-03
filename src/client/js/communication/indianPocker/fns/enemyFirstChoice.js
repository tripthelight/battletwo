import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';
import storageKeys from '@/client/js/module/storeageUsage/storageKeys';
import storeageUsage from '@/client/js/module/storeageUsage/storeageUsage';
import storageMethod from '@/client/js/module/storage/storageMethod';
import flipEnemyFirstCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyFirstCard';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      // sessionStorage 모든 key check
      storeageUsage({
        storageArea: 's',
        storageKeys: storageKeys({
          p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
          p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
        }),
      });

      const { eNum, pNum } = _data;
      // storageMethod('s', 'SET_ITEM', 'enemyFirstNumber', eNum);

      const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
      const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
      const encryptVal = window.sessionStorage.getItem(encryptKey2);

      // 상대가 먼저 선택한 카드가 있는데,
      if (pNum !== '' && encryptVal !== '' && Number(encryptVal) !== Number(pNum)) {
        const message = '내가 선택한 카드 번호 sessionStorage value 조작';
        request('opponentFouls', { subject: 'local', message: message });
      }

      if (window.sessionStorage.getItem(encryptKey1) !== '') {
        // 상대가 sessionStorage 조작
        const message = '상대가 sessionStorage 조작';
        request('opponentFouls', { subject: 'remote', message: message });
        errorManagement({ errCase: 'foul', message: message });
      }

      storageMethod('s', 'SET_ITEM', encryptKey1, eNum);
      setTimeout(flipEnemyFirstCard, timeInterval_1);
    })
    .catch((err) => {
      return errorManagement({ errCase: 'errorComn', message: 'enemyFirstChoice()의 num을 받지 못했습니다.' });
    });
};
