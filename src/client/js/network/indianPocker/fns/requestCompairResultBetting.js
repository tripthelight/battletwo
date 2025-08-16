import booleanCheck from '@/client/js/functions/validation/booleanCheck';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default async (_data) => {
  try {
    const {
      result,
      resultStorage: { valRemoteBetUser, valRemoteBetUserFirst },
    } = _data;

    const params = { compair: true, result };

    // 1) 내가 먼저 X 버튼 눌러 대기하는 특수 케이스 선처리
    const TIE_WAIT_FLAG = booleanCheck([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]); // tieWait
    const TIE_WAIT_EXPECT = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]);
    if (TIE_WAIT_FLAG === TIE_WAIT_EXPECT) {
      request('responseCompairResultBetting', params);
      return;
    }

    // 2) 로컬 저장값 읽기
    const valLocalBetUser = booleanCheck([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]); // betUser
    const valLocalBetUserFirst = booleanCheck([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]); // betUserFirst

    // 3) 기대값 테이블(중복 제거)
    const CODE_TRUE = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]);
    const CODE_FALSE = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]);

    const EXPECT = {
      start: {
        remote: { betUser: true, betUserFirst: true },
        local: { betUser: CODE_TRUE, betUserFirst: CODE_TRUE },
        recvDesc: '상대 peer가 높음',
        sendDesc: '내가 높음',
      },
      end: {
        remote: { betUser: false, betUserFirst: false },
        local: { betUser: CODE_FALSE, betUserFirst: CODE_FALSE },
        recvDesc: '내가 높음',
        sendDesc: '상대 peer가 높음',
      },
      tie: {
        remote: { betUser: '', betUserFirst: '' },
        local: { betUser: '', betUserFirst: '' },
        recvDesc: '같은 카드',
        sendDesc: '같은 카드',
      },
    };

    const ctx = EXPECT[result];
    if (!ctx) {
      throw {
        errCase: 'foul',
        message: '모두 카드 선택 > 상대가 알림팝업의 X 버튼 클릭 > 내가 받음 > 결과 error',
        sendMsg: '모두 카드 선택 > 내가 알림팝업의 X 버튼 클릭 > 상대가 받음 > 결과 error',
      };
    }

    const PREFIX_RECV = '모두 카드 선택 > 상대가 알림팝업의 X 버튼 클릭 > 내가 받음 > ';
    const PREFIX_SEND = '모두 카드 선택 > 내가 알림팝업의 X 버튼 클릭 > 상대가 받음 > ';

    const assertPair = (keyName, remote, local, expectRemote, expectLocal) => {
      // 전부 정상이면 통과
      if (remote === expectRemote && local === expectLocal) return;

      // 원인별로 정확히 지정
      if (remote !== expectRemote) {
        throw {
          errCase: 'foul',
          message: `${PREFIX_RECV}${ctx.recvDesc} > 상대 peer가 ${keyName} key 조작`,
          sendMsg: `${PREFIX_SEND}${ctx.sendDesc} > 내가 ${keyName} key 조작`,
        };
      }
      // remote가 맞으면 local만 문제
      throw {
        errCase: 'foul',
        message: `${PREFIX_RECV}${ctx.recvDesc} > 내가 ${keyName} key 조작`,
        sendMsg: `${PREFIX_SEND}${ctx.sendDesc} > 상대 peer가 ${keyName} key 조작`,
      };
    };

    // 4) 두 쌍 검증(순서대로 실패 지점 명확화)
    assertPair('betUser',       valRemoteBetUser,       valLocalBetUser,       ctx.remote.betUser,       ctx.local.betUser);
    assertPair('betUserFirst',  valRemoteBetUserFirst,  valLocalBetUserFirst,  ctx.remote.betUserFirst,  ctx.local.betUserFirst);

    // 5) 문제 없으면 응답 전송
    request('responseCompairResultBetting', params);
  } catch (error) {
    console.log('drawResultCardInfo.js onclick error : ');
    errorManager(error, true);
  };
};
