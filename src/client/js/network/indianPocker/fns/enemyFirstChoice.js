import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import cardNumEncryption from '@/client/js/functions/bcrypt/cardNumEncryption';
import findCharCode from '@/client/js/functions/findCharCode';
import storageKeys from '@/client/js/functions/dataVerification/storageKeys';
import storageMethod from '@/client/js/module/storage/storageMethod';
import flipEnemyFirstCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/flipEnemyFirstCard';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
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
      throw {
        errCase: 'sessionStorageLoss',
        message: '내가 상대의 선택카드 받을 때, choiceCard 단계에 필요한 sessionStorage key 조작',
        sendMsg: '내가 선택한 카드 보낼 때, 상대가 choiceCard 단계에 필요한 sessionStorage key 조작'
      };
    };

    const { eNum, pNum } = _data;
    const encryptKey1 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    // 암호화된 상대가 선택한 카드 검증 encryptVal1 -> 암호 hash, eNum -> 숫자
    const compairRemote = eNum !== '' && encryptVal1 !== '' && eNum !== cardNumDecryption(encryptVal1);
    // 암호화된 내가 선택한 카드 검증 encryptVal2 -> 암호 hash, pNum -> 숫자
    const compairLocal = pNum !== '' && encryptVal2 !== '' && pNum !== cardNumDecryption(encryptVal2);

    if (compairRemote || compairLocal) {
      throw {
        errCase: 'foul',
        message: '내가 먼저 선택한 카드와 상대 enemy card 다름',
        sendMsg: '상대가 먼저 선택한 카드와 내 enemy card 다름'
      };
    } else {
      // 상대 peer가 선택한 카드 번호 암호화
      const encryptRemoteNum =  cardNumEncryption(eNum - 1);
      storageMethod('s', 'SET_ITEM', encryptKey1, encryptRemoteNum);

      flipEnemyFirstCard({ pNum, eNum });
    };
  } catch (error) {
    console.log('enemyFirstChoice() error : ');
    errorManager(error, true);
  };
};
