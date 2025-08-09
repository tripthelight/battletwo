import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import findCardNum from '@/client/js/views/game/indianPocker/fns/common/findCardNum';
import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/network/indianPocker/request';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';
import storageMethod from '@/client/js/module/storage/storageMethod';
import flipEnemyFirstCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyFirstCard';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      // sessionStorage 모든 key check
      const sessionStorageKeys = storageKeys({
        p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
        p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
      });
      const allKeys = Object.keys(sessionStorage);
      const setKeys = new Set(allKeys);
      const allExist = sessionStorageKeys.every((key) => setKeys.has(key));
      if (!allExist) {
        // local player 모든 key가 없음
        const message = 'remote player가 sessionStorage 삭제';
        request('opponentFouls', { message: message });
        errorManagement({ errCase: 'sessionStorageLoss', message: '상대가 선택한 카드를 받는 단계에서 local player의 storage안에 key가 모두 없습니다.' });
        return;
      }

      const { eNum, pNum } = _data;
      // storageMethod('s', 'SET_ITEM', 'enemyFirstNumber', eNum);

      const arrNumbs = selectCompairNumbers();
      const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
      const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
      const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
      const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

      // 암호화된 상대가 선택한 카드 검증 encryptVal1 -> 암호 hash, eNum -> 숫자
      const compairRemote = eNum !== '' && encryptVal1 !== '' && eNum !== findCardNum(arrNumbs.find(item => bcrypt.compareSync(item.toString(), encryptVal1)));
      // 암호화된 내가 선택한 카드 검증 encryptVal2 -> 암호 hash, pNum -> 숫자
      const compairLocal = pNum !== '' && encryptVal2 !== '' && pNum !== findCardNum(arrNumbs.find(item => bcrypt.compareSync(item.toString(), encryptVal2)));
      if (compairRemote || compairLocal) {
        let message = '';
        // 상대가 먼저 선택한 카드와 내 enemy card 비교
        if (compairRemote) {
          message = '상대가 먼저 선택한 카드와 내 enemy card 다름';
        }
        // 내가 먼저 선택한 카드와 상대 enemy card 비교
        if (compairLocal) {
          message = '내가 먼저 선택한 카드와 상대 enemy card 다름';
        }
        request('opponentFouls', { message });
        errorManagement({ errCase: 'foul', message });
      } else {
        // 상대 peer가 선택한 카드 번호 암호화
        const remoteNumIdx = arrNumbs[eNum - 1];
        const encryptRemoteNum = bcrypt.hashSync(remoteNumIdx.toString(), 3);

        storageMethod('s', 'SET_ITEM', encryptKey1, encryptRemoteNum);

        flipEnemyFirstCard({ pNum, eNum });
      }
    })
    .catch((err) => {
      console.log('err ====> ', err);

      return errorManagement({ errCase: 'errorComn', message: 'enemyFirstChoice()의 num을 받지 못했습니다.', errorDetails: err });
    });
};
