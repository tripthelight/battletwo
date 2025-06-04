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

    if (remoteStorage.encryptVal1 !== encryptVal2 || remoteStorage.encryptVal2 !== encryptVal1) {
      let message = '';

      // 상대 선택 카드와 내 enemy 선택 카드 비교
      if (remoteStorage.encryptVal1 !== encryptVal2) {
        message = '상대 선택 카드와 내 enemy 선택 카드 다름';
      }
      // 상대 enemy 선택 카드와 내 선택 카드 비교
      if (remoteStorage.encryptVal2 !== encryptVal1) {
        message = '상대 enemy 선택 카드와 내 선택 카드 다름';
      }
      errorManagement({ errCase: 'foul', message });
      request('opponentFouls', { message });
    } else {
      // data 검증에 성공하여 PASS
      request('responseCompairChoiceCard', { result: true });
    }

    /*
    if (encryptVal1 === '' && remoteStorage.encryptVal2 !== '') {
      // 상대가 sessionStorage 조작
      const message = '상대가 sessionStorage 조작';
      request('opponentFouls', { subject: 'remote', message: message });
      errorManagement({ errCase: 'foul', message: message });
    }
    if (encryptVal2 === '' && remoteStorage.encryptVal1 !== '') {
      // 상대가 sessionStorage 조작
      const message = '상대가 sessionStorage 조작';
      request('opponentFouls', { subject: 'remote', message: message });
      errorManagement({ errCase: 'foul', message: message });
    }
    */
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'requestCompairChoiceCard() 함수를 못탐 : ' + error });
  });
};
