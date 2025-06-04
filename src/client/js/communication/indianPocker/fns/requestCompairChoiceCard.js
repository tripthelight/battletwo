import { request } from '@/client/js/communication/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { remoteStorage } = _data;

    const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    const compairRemote = remoteStorage.encryptVal1 !== encryptVal2;
    const compairLocal = remoteStorage.encryptVal2 !== encryptVal1;

    const encryptKey3 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const encryptKey4 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);

    const getCompairBet = (remote, local) => {
      if (remote !== '') {
        if (!(remote === 'true' || remote === 'false')) {
          // remote player가 data 조작
          return true;
        }
      }
      if (local !== '') {
        if (!(local === 'true' || local === 'false')) {
          // local player가 data 조작
          return true;
        }
      }
      if (remote === 'true' && local !== 'false') {
        // local player가 data 조작
        return true;
      } else if (remote === 'false' && local !== 'true') {
        // local player가 data 조작
        return true;
      }

      if (local === 'true' && remote !== 'false') {
        // remote player가 data 조작
        return true;
      } else if (local === 'false' && remote !== 'true') {
        // remote player가 data 조작
        return true;
      }
      return false;
    };

    const compairBetUser = getCompairBet(remoteStorage.encryptVal3, encryptVal3);
    const compairBetUserFirst = getCompairBet(remoteStorage.encryptVal4, encryptVal4);

    if (compairRemote || compairLocal || compairBetUser || compairBetUserFirst) {
      let message = '';

      // playerFirstNumber / enemyFirstNumber
      if (compairRemote || compairLocal) {
        // 상대 선택 카드와 내 enemy 선택 카드 비교
        if (compairRemote) {
          message = '상대 선택 카드와 내 enemy 선택 카드 다름';
        }
        // 상대 enemy 선택 카드와 내 선택 카드 비교
        if (compairLocal) {
          message = '상대 enemy 선택 카드와 내 선택 카드 다름';
        }
      }

      // betUser / betUserFirst
      if (compairBetUser || compairBetUserFirst) {
        // 상대 betUser와 내 betUser 비교
        if (compairBetUser) {
          message = '상대 betUser와 내 betUser 검증 실패';
        }

        // 상대 betUser와 내 betUser 비교
        if (compairBetUserFirst) {
          message = '상대 betUserFirst와 내 betUserFirst 검증 실패';
        }
      }

      errorManagement({ errCase: 'foul', message });
      request('opponentFouls', { message });
    } else {
      // data 검증에 성공하여 PASS
      request('responseCompairChoiceCard', { result: true });
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'requestCompairChoiceCard() 함수를 못탐 : ' + error });
  });
};
