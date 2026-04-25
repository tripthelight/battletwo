import storageMethod from '@/client/js/module/storage/storageMethod';
import findRandomName from "@/client/js/views/game/findTheSamePicture/fns/common/findRandomName";
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';

import enemyFail from "@/client/js/views/game/findTheSamePicture/fns/common/enemyFail";
import enemySucess from "@/client/js/views/game/findTheSamePicture/fns/common/enemySucess";
import flipEnemyChoiceCard from "@/client/js/views/game/findTheSamePicture/fns/common/flipEnemyChoiceCard";

export default (_enemyClickData) => {
  const DATA = {
    clickBoardNum: _enemyClickData.clickBoardNum,
    clickNum: _enemyClickData.clickNum,
    enemyActiveIndex: _enemyClickData.playerActiveIndex,
    en: _enemyClickData.pn,
    round: _enemyClickData.round,
    state: _enemyClickData.state,
  };
  // console.log("DATA :: ", DATA);
  // window.sessionStorage.setItem("clickUser", true);

  // storage 먼저 즉시 수정
  // sendEnemyDataStorage(DATA);

  // 상대방이 선택한 카드 뒤집기
  const FLIP_DATA = {
    clickBoardNum: DATA.clickBoardNum,
    clickNum: DATA.clickNum,
  };

  // 상대방이 뒤집은 카드를 먼저 뒤집고 다음 STEP 실행
  flipEnemyChoiceCard(FLIP_DATA)
    .then(() => {
      if (DATA.state) {
        // 상대가 맞는 카드를 뒤집었을 경우
        const WIN_DATA = {
          clickBoardNum: DATA.clickBoardNum,
          clickNum: DATA.clickNum,
          enemyActiveIndex: DATA.enemyActiveIndex,
        };
        enemySucess(WIN_DATA);
      } else {
        // 상대가 틀린 카드를 뒤집었을 경우
        // 라운드 플러스
        // window.sessionStorage.setItem("round", DATA.round);

        const encryptKey1 = findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]); // round
        storageMethod('s', 'SET_ITEM', encryptKey1, DATA.round);

        const FAIL_DATA = {
          clickBoardNum: DATA.clickBoardNum,
          clickNum: DATA.clickNum,
          en: DATA.en,
          enemyActiveIndex: DATA.enemyActiveIndex,
        };
        enemyFail(FAIL_DATA);
      }
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
