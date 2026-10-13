import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';

// import { pointNums } from '@/client/store/encryptionStore';
import findCharCode from '@/client/js/functions/findCharCode';
import findCharDecCode from '@/client/js/functions/findCharDecCode';
import setPointNum from '@/client/js/views/game/blackAndWhite2/fns/common/setPointNum';
import comparePointNum from '@/client/js/views/game/blackAndWhite2/fns/common/comparePointNum';
import advanceGameRound from '@/client/js/views/game/blackAndWhite2/fns/common/advanceGameRound';
import updateGameScore, {
  initializeGameScore,
  readGameScore
} from '@/client/js/views/game/blackAndWhite2/fns/common/gameScore';

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
    // 선플레이어 정하기

    const firstUserBool = X.enc(decodeTF(_t([99, 109, 114, 117]))); // "cmru" : true
    console.log('FIRST USER STATE :::::::::: ', firstUserBool);

    /**
     * ========================================================
     * DATA TEST
     * ========================================================
     */
    /*
    // 1 Round
    const round = findCharCode([
      74, 90, 87, 85, 82, 81, 78, 70, 84, 65
    ]);

    try {
      // ① 현재 Round 저장
      storageMethod(
        's',
        'SET_ITEM',
        findCharCode([71, 72, 87, 84, 69, 74, 70, 82, 66, 78]),
        round
      );

      // ② 총 보유 포인트 99 저장
      storageMethod(
        's',
        'SET_ITEM',
        findCharCode([88, 82, 71, 75, 87, 65, 67, 86, 80, 66]),
        findCharCode(
          [86, 78, 75, 89, 72].concat([86, 83, 75, 73, 76])
        )
      );

      // ③ 표시등 5층 저장
      storageMethod(
        's',
        'SET_ITEM',
        findCharCode([67, 81, 75, 89, 76, 87, 65, 68, 90, 71]),
        findCharCode([70, 80, 65, 67, 69, 82, 81, 86, 78, 84])
      );

      // ④ Score 초기화
      initializeGameScore();

      // ⑤ 모든 초기화 완료 후 Score 조회
      console.log('초기 점수:', readGameScore());

      // ⑥ 포인트 입력
      const first = setPointNum(1, 1, round, true);
      const second = setPointNum(1, 2, round, false);

      console.log('선플레이어:', first);
      console.log('후플레이어:', second);

      if (
        first.status === 'insufficientPoints' ||
        second.status === 'insufficientPoints'
      ) {
        console.log('보유 포인트 부족');
      } else if (
        first.status === 'ok' &&
        second.status === 'ok'
      ) {
        // ⑦ 승패 비교
        const compare = comparePointNum(
          first.encodedPoint,
          second.encodedPoint,
          round
        );

        console.log('Round 결과:', compare);

        // ⑧ Score 반영
        const score = updateGameScore(compare, true);

        console.log('Score:', score.scoreText);
        console.log('최종 승자:', score.winner);

        // ⑨ 게임 종료 여부에 따라 분기
        if (score.status === 'gameOver') {
          console.log('게임 종료:', score.reason);
        } else if (score.status === 'nextRound') {
          const step = advanceGameRound(true);

          console.log('Round 변경 결과:', step);
          console.log('다음 Round:', step.nextRound);
        }
      }

    } catch (error) {
      console.error('데이터 검증 실패:', error);
      throw error;
    }
    */
  },
};
