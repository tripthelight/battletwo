import findCharCode from '@/client/js/functions/findCharCode';
import X from '@/client/js/module/crypts/bool-obf';
import cardNumDecryption from '@/client/js/functions/bcrypt/cardNumDecryption';
// import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import { request } from '@/client/js/network/indianPocker/request';
import compairBoolStr from '@/client/js/functions/validation/compairBoolStr';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    const { remoteStorage, tieWait } = _data;

    // 같은 카드였던 상태에서 상대 peer가 팝업 x 버튼을 먼저 누르고 대기 상태 일 경우
    if (tieWait) {
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: true });
      return;
    }

    // 같은 카드였던 상태에서 내가 팝업 x 버튼을 먼저 누르고 대기 상태 일 경우
    const encryptKey3 = findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    if (encryptVal3 !== '' && X.dec(encryptVal3)) { // tieWait === true
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: true });
      return;
    };

    const encryptKey1 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
    const encryptKey2 = findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]); // enemyFirstNumber
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

    const compairCard = (_card) => {
      if (_card === '') return null;
      return cardNumDecryption(_card);
    };

    const compairRemote = encryptVal2 !== "" && remoteStorage.encryptVal1 !== encryptVal2; // remote
    const compairLocal = encryptVal1 !== "" && remoteStorage.encryptVal2 !== encryptVal1; // local
    // const compairBetUser = compairBoolStr(remoteStorage.encryptVal3, booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88])); // betUser
    const encryptKey4 = findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const encryptVal4 = storageMethod("s", "GET_ITEM", encryptKey4);
    const compairBetUser = compairBoolStr(remoteStorage.encryptVal3, X.dec(encryptVal4)); // betUser
    // const compairBetUserFirst = compairBoolStr(remoteStorage.encryptVal4, booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78])); // betUserFirst
    const encryptKey5 = findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst
    const encryptVal5 = storageMethod("s", "GET_ITEM", encryptKey5);
    const compairBetUserFirst = compairBoolStr(remoteStorage.encryptVal4, X.dec(encryptVal5)); // betUserFirst

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
          throw throwObj('errorComn', 'select card parameter error.');
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

      ['local', 'remote'].some(s => {
        const m = msgState(s);
        if (m) throw throwObj('foul', m);
        return false;
      });

    } else {
      // data 검증에 성공하여 PASS
      request('responseCompairChoiceCard', { result: true, tieWaitConfirmed: false });
    }
  } catch (error) {
    errorManager(error, true);
  };
};
