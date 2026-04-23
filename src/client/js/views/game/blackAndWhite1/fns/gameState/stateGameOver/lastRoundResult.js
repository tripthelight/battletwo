import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import lastRoundState from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundState";
import lastRoundShow from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateGameOver/lastRoundShow";
import {
  loadRoundResults,
  RESULT_NUM
} from '@/client/js/views/game/blackAndWhite1/fns/common/roundResultStorage';

export default () => {
  try {
    const resultObj = loadRoundResults();
    if (resultObj.length === 0) {
      throw throwObj('sessionStorageLoss', 'lastRoundResult - result value failed.');
    }

    console.log("전체결과 ::::::::: ", resultObj);


    const resultCase = {
      win: 0,
      die: 0,
      drew: 0,
    };

    for (let i = 0; i < resultObj.length; i++) {
      const r = dec(resultObj[i].result);
      if (r === RESULT_NUM.win()) {
        resultCase.win += 1;
      } else if (r === RESULT_NUM.lose()) {
        resultCase.die += 1;
      } else if (r === RESULT_NUM.drew()) {
        resultCase.drew += 1;
      };
    };

    const result = lastRoundState(resultCase.win, resultCase.die, resultCase.drew);
    lastRoundShow(result);

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'lastRoundResult.js error'
    );
  }


  /*
  const RESULT_VALUE = window.sessionStorage.getItem("result");
  const RESULT_ARR = JSON.parse(RESULT_VALUE);
  let win = 0;
  let die = 0;
  let drew = 0;
  for (let i = 0; i < RESULT_ARR.length; i++) {
    if (RESULT_ARR[i].result === "win") {
      win += 1;
    } else if (RESULT_ARR[i].result === "die") {
      die += 1;
    } else if (RESULT_ARR[i].result === "drew") {
      drew += 1;
    }
  }
  const result = lastRoundState(win, die, drew);
  lastRoundShow(result);
  */
};
