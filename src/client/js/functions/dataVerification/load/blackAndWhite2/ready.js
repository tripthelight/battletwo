import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

// import { pointNums } from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import setPointNum from '@/client/js/views/game/blackAndWhite2/fns/common/setPointNum';
import comparePointNum from '@/client/js/views/game/blackAndWhite2/fns/common/comparePointNum';
import advanceGameRound from '@/client/js/views/game/blackAndWhite2/fns/common/advanceGameRound';

export const READY_HANDLER = {
  // gameState : ready 에서 reload 한 경우
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    };

    //
  },
  // gameState : ready 에 처음 입장
  handleInitialLoad(storageKeys) {
    // 모든 sessionStorage key를 순회하면서 필요한 data insert
    for (const key of storageKeys) {
      const val = window.sessionStorage.getItem(key);
      if (val === null) {
        // sessionStorage에 key가 없을 경우 빈문자열 삽입
        storageMethod('s', 'SET_ITEM', key, '');
      } else {
        storageMethod('s', 'SET_ITEM', key, val);
      }
    };

    // ready 단계에서 필요한 data insert 후 다음 단계 진행
    //

    // 1라운드
    const round = findCharCode([
      74, 90, 87, 85, 82, 81, 78, 70, 84, 65
    ]);

    // 총 보유 포인트: 20
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([88, 82, 71, 75, 87, 65, 67, 86, 80, 66])
      , findCharCode([86, 78, 75, 89, 72].concat([86, 83, 75, 73, 76])) // 초기 Point - 99
      // , findCharCode([70, 72, 67, 71, 76].concat([69, 68, 76, 71, 65])) // 테스트 Point - 20
    );

    // 현재 라운드: 1
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([71, 72, 87, 84, 69, 74, 70, 82, 66, 78]),
      round
    );

    // 현재 표시등:
    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([67, 81, 75, 89, 76, 87, 65, 68, 90, 71])
      , findCharCode([70, 80, 65, 67, 69, 82, 81, 86, 78, 84]) // 초기 기본값 5층 (80~99)
      // , findCharCode([77, 83, 81, 70, 69, 90, 78, 66, 82, 80]) // 테스트 2층 (20~39)
    );

    try {
      const testPointFirst = setPointNum(1, 1, round, true);
      const testPointSecond = setPointNum(1, 2, round, false);

      console.log('선플레이어:', testPointFirst);
      console.log('후플레이어:', testPointSecond);

      if (
        testPointFirst.status === 'insufficientPoints' ||
        testPointSecond.status === 'insufficientPoints'
      ) {
        console.log('보유 포인트 부족');
      } else if (
        testPointFirst.status === 'ok' &&
        testPointSecond.status === 'ok'
      ) {
        const compare = comparePointNum(
          testPointFirst.encodedPoint,
          testPointSecond.encodedPoint,
          round
        );

        console.log('승패 결과:', compare);

        // 동일한 브라우저에서 테스트하므로
        // Round 변경은 한 번만 실행합니다.
        const step = advanceGameRound(true);

        console.log('Round 변경 결과:', step);

        if (step.status === 'nextRound') {
          console.log('다음 Round:', step.nextRound);
        } else if (step.status === 'gameOver') {
          console.log('게임 종료');
        }
      }
    } catch (error) {
      console.error('데이터 검증 실패:', error);
      throw error;
    }
  },
};
