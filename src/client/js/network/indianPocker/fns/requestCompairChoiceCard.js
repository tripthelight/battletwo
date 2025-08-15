import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { request } from '@/client/js/network/indianPocker/request';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    const { remoteStorage, tieWait } = _data;

    // 같은 카드였던 상태에서 상대 peer가 팝업 x 버튼을 먼저 누르고 대기 상태 일 경우
    if (tieWait) {
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: true });
      return;
    }

    // 같은 카드였던 상태에서 내가 팝업 x 버튼을 먼저 누르고 대기 상태 일 경우
    const bRes = booleanCheck([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]);  // tieWait
    if (bRes === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) { // true
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: true });
      return;
    }

    const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    const compairCard = (_card) => {
      if (_card === '') return null;
      return cardNumDecryption(_card);
    };

    const compairRemote = remoteStorage.encryptVal1 !== compairCard(encryptVal2); // remote
    const compairLocal = remoteStorage.encryptVal2 !== compairCard(encryptVal1); // local

    const getCompairBet = (remote, local) => {
      if (typeof remote !== 'boolean') {
        if (!(remote === true || remote === false)) {
          console.log('1 --------------------- ');

          // remote player가 data 조작
          return true;
        };
      };
      if (local !== '') {
        if (!(
          local === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) || // true
          local === findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])) // false
        ) {
          console.log('2 --------------------- ');
          // local player가 data 조작
          return true;
        };
      };
      if (remote === true && local !== findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])) {
        console.log('3 --------------------- ');
        // local player가 data 조작
        return true;
      } else if (remote === false && local !== findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
        console.log('4 --------------------- ');
        // local player가 data 조작
        return true;
      };
      if (local === true && remote !== findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78])) {
        console.log('5 --------------------- ');
        // remote player가 data 조작
        return true;
      } else if (local === false && remote !== findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75])) {
        console.log('6 --------------------- ');
        // remote player가 data 조작
        return true;
      }
      return false;

      /* if (remote !== '') {
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
      return false; */
    };

    console.log('상대 betUser :::::::: ', remoteStorage.encryptVal3);
    console.log('상대 betUserFirst ::: ', remoteStorage.encryptVal4);


    const compairBetUser = getCompairBet(remoteStorage.encryptVal3, booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88])); // betUser
    const compairBetUserFirst = getCompairBet(remoteStorage.encryptVal4, booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78])); // betUserFirst

    if (compairRemote || compairLocal || compairBetUser || compairBetUserFirst) {
      const message = {
        compair: {
          local: '상대 enemy 선택 카드와 내 선택 카드 다름',
          remote: '상대 선택 카드와 내 enemy 선택 카드 다름',
        },
        bat: {
          user: '상대 betUser와 내 betUser 검증 실패',
          first: '상대 betUserFirst와 내 betUserFirst 검증 실패',
        },
      };

      function msgState(peer) {
        if (peer !== 'local' && peer !== 'remote') {
          throw { errCase: 'errorComn', message: 'select card parameter error.' };
        }

        // peer에 따라 compair 메시지만 스왑
        const compairMsg = peer === 'local'
          ? { remote: message.compair.remote, local: message.compair.local }
          : { remote: message.compair.local,  local: message.compair.remote };

        const checks = [
          [() => compairRemote, compairMsg.remote],
          [() => compairLocal,  compairMsg.local],
          [() => compairBetUser, message.bat.user],
          [() => compairBetUserFirst, message.bat.first],
        ];

        for (const [cond, msg] of checks) {
          if (cond()) return msg;
        }
        return null; // 해당 없음
      }

      // 사용 예
      const localMsg = msgState('local');
      if (localMsg) {
        throw {
          errCase: 'foul',
          message: localMsg,
          sendMsg: localMsg
        };
      };

      const remoteMsg = msgState('remote');
      if (remoteMsg) {
        throw {
          errCase: 'foul',
          message: remoteMsg,
          sendMsg: remoteMsg
        };
      };

    } else {
      // data 검증에 성공하여 PASS
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: false });
    }
  }).catch(async (error) => {
    console.log('error : ', error);
    console.log('requestCompairChoiceCard.js onclick error : ');

    const { request } = await import('@/client/js/network/indianPocker/request');
    request('opponentFouls', { message: error?.sendMsg ?? 'remote player error' });

    const { default: eventHanlerErrorComn } = await import('@/client/js/module/eventHanlerErrorComn');
    const safe = (error && typeof error === 'object') ? error : {};
    eventHanlerErrorComn({
      errCase: 'errorComn',
      errorDetails: error,
      ...safe
    });
  });
};
