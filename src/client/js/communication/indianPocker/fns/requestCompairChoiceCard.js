import { request } from '@/client/js/communication/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { remoteStorage } = _data;

    console.log('remoteStorage >???????? ', remoteStorage);

    const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    console.log(encryptVal1);
    console.log(remoteStorage.encryptVal2);
    console.log('===================');
    console.log(encryptVal2);
    console.log(remoteStorage.encryptVal1);

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
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'requestCompairChoiceCard() 함수를 못탐 : ' + error });
  });
};
