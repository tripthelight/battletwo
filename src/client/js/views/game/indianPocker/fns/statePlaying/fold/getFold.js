import flipPlayerCardComn from "../../common/flipPlayerCardComn.js";
import flipPlayerCard from "../../common/flipPlayerCard.js";
import playerNumRes from "../../common/playerNumRes.js";
import BattingZoneMovePlayerBlock from "../../common/BattingZoneMovePlayerBlock.js";
import BettingZoneMoveComn from "../../common/BettingZoneMoveComn.js";
import foldSendResultComn from "../../common/foldSendResultComn.js";
import { bottomSheet } from "../../../../../components/bottomSheet.js";
import { text } from "../../../common/language.js";
import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from "../../../../../js/common/variable.js";
import EnemyBlockMovePlayerBlock from "../../common/EnemyBlockMovePlayerBlock.js";
import errorComn from "../../../common/errorComn.js";
import setSessionDelete from "../../sessions/setSessionDelete.js";
import cardHideAnimationComn from "../../common/cardHideAnimationComn.js";
import { GET_ROUND_END } from "../../statePlaying/roundEnd/getRoundEnd.js";
import resultTxtInnerHtml from "../../common/resultTxtInnerHtml.js";

export const GET_FOLD = {
  receivefold: (_data) => {
    let promise = new Promise((resolve, reject) => {
      resolve(_data);
    });
    promise
      .then((_data) => {
        flipPlayerCardComn(flipPlayerCard, playerNumRes());
        GET_FOLD.roundResultDisplay();
        BattingZoneMovePlayerBlock("win").then((_state) => {
          BettingZoneMoveComn(_state).then((_stateNext) => {
            const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const ENEMY_BET = window.sessionStorage.coinsEnemyBet;
            window.sessionStorage.setItem("coinsPlayer", Number(COINS_PLAYER) + Number(PLAYER_BET) + Number(ENEMY_BET));
            foldSendResultComn();
            window.sessionStorage.setItem("betUser", true);
            if (_data.penalty) {
              // 상대 카드가 10일 때
              bottomSheet.show(text.indianpocker.benefit, timeInterval_5000);
              EnemyBlockMovePlayerBlock().then((_result) => {
                foldSendResultComn();
                GET_FOLD.redrawCoinsEnemy();
                GET_FOLD.nextRound();
              });
            } else {
              GET_FOLD.nextRound();
            }
          });
        });
      })
      .catch((error) => {
        return errorComn(error);
      });
  },
  redrawCoinsEnemy: () => {
    const COINS_ENEMY_RES = window.sessionStorage.coinsEnemy;
    const ENEMY_COINS = document.querySelector(".coins-enemy");
    const ENEMY_COINS_LI = ENEMY_COINS.querySelectorAll("li");
    if (ENEMY_COINS_LI.length > 0) for (let i = 0; i < ENEMY_COINS_LI.length; i++) ENEMY_COINS_LI[i].remove();
    for (let j = 0; j < Number(COINS_ENEMY_RES); j++) ENEMY_COINS.appendChild(document.createElement("li"));
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector(".betting-zone");
    if (!BETTING_ZONE) return errorComn("fold 에서 .betting-zone 엘리먼트가 없습니다.");
    let txtArr = ["OPPONENT", "FOLD", "NEXT"];
    let resultEl = document.createElement("div");
    resultEl.classList.add("round-result");
    resultEl.innerHTML = txtArr[0];
    BETTING_ZONE.appendChild(resultEl);
    setTimeout(resultTxtInnerHtml, timeInterval_1000, resultEl, txtArr, 1);
    setTimeout(resultTxtInnerHtml, timeInterval_2000, resultEl, txtArr, 2);
    setTimeout(() => {
      resultEl.remove();
    }, timeInterval_3201);
  },
  nextRound: () => {
    const D_ARR = ["coinsEnemyBet", "coinsPlayerBet", "coinsEnemyExtBet", "coinsPlayerExtBet", "betCoin", "betCoinPos", "extFirstBet", "drewReady", "drewState"];
    setSessionDelete("sessionStorage", D_ARR);
    setTimeout(() => {
      cardHideAnimationComn();
      setTimeout(() => {
        GET_ROUND_END.getWinnerCoinNext("win");
        setTimeout(() => {
          GET_ROUND_END.goNextRound("win");
        }, timeInterval_1);
      }, timeInterval_1);
    }, timeInterval_1);
  },
};
