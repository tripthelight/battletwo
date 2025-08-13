import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { result, resultStorage } = _data;
    const { valRemoteBetUser, valRemoteBetUserFirst } = resultStorage;
    const params = {
      compair: true,
      result: result,
    };

    // 내가 먼저 X 버튼을 누르고 대기 상태
    const keyTieWait = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
    if (window.sessionStorage.getItem(keyTieWait) === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
      request('responseCompairResultBetting', params);
      return;
    }

    const keyLocalBetUser = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const keyLocalBetUserFirst = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
    const valLocalBetUser = window.sessionStorage.getItem(keyLocalBetUser);
    const valLocalBetUserFirst = window.sessionStorage.getItem(keyLocalBetUserFirst);

    switch (result) {
      case 'start': // 상대 peer가 높음 ********************************
        /** betUser *************************************************** */
        if (valRemoteBetUser === 'true' && valLocalBetUser === 'false') {
          // 정상
          request('responseCompairResultBetting', params);
        } else {
          if (valRemoteBetUser !== 'true') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUser data 조작' });
          }
          if (valLocalBetUser !== 'false') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }

        /** betUserFirst ********************************************** */
        if (valRemoteBetUserFirst === 'true' && valLocalBetUserFirst === 'false') {
          // 정상
          request('responseCompairResultBetting', params);
        } else {
          if (valRemoteBetUserFirst !== 'true') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUserFirst data 조작' });
          }
          if (valLocalBetUserFirst !== 'false') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }
        break;
      case 'end': // 상대 peer가 낮음 **********************************
        /** betUser *************************************************** */
        if (valRemoteBetUser === 'false' && valLocalBetUser === 'true') {
          // 정상
          request('responseCompairResultBetting', params);
        } else {
          if (valRemoteBetUser !== 'false') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUser data 조작' });
          }
          if (valLocalBetUser !== 'true') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }

        /** betUserFirst ********************************************** */
        if (valRemoteBetUserFirst === 'false' && valLocalBetUserFirst === 'true') {
          // 정상
          request('responseCompairResultBetting', params);
        } else {
          if (valRemoteBetUserFirst !== 'false') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUserFirst data 조작' });
          }
          if (valLocalBetUserFirst !== 'true') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }
        break;
      case 'tie': // 같음 *********************************************
        /** betUser *************************************************** */
        if (valRemoteBetUser === '' && valLocalBetUser === '') {
          console.log('비김 1');
          // 정상
          request('responseCompairResultBetting', params);
          return;
        } else {
          if (valRemoteBetUser !== '') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUser data 조작' });
          }
          if (valLocalBetUser !== '') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }

        /** betUserFirst ********************************************** */
        if (valRemoteBetUserFirst === '' && valLocalBetUserFirst === '') {
          console.log('비김 2');
          // 정상
          request('responseCompairResultBetting', params);
          return;
        } else {
          if (valRemoteBetUserFirst !== '') {
            params.compair = false;
            params.person = 'local';
            // 상대가 storage data를 조작
            request('responseCompairResultBetting', params);
            errorManagement({ errCase: 'foul', message: '상대가 sessionStorage betUserFirst data 조작' });
          }
          if (valLocalBetUserFirst !== '') {
            params.compair = false;
            params.person = 'remote';
            // 내가 storage data를 조작
            request('responseCompairResultBetting', params);
            // 상대가 나에게 opponentFouls를 보냄
          }
        }
        break;
      default:
        break;
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'requestCompairResultBetting() 함수를 못탐' });
  });
};
