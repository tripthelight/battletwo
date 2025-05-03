import { timeInterval_1, timeInterval_1000, timeInterval_2000, timeInterval_3201, timeInterval_5000 } from "../../../../../js/common/variable.js";
import { bottomSheet } from "../../../../../components/bottomSheet.js";
import { text } from "../../../common/language.js";
import flipPlayerCardComn from "../../common/flipPlayerCardComn.js";
import flipPlayerCard from "../../common/flipPlayerCard.js";
import BattingZoneMoveEnemyBlock from "../../common/BattingZoneMoveEnemyBlock.js";
import BettingZoneMoveComnFold from "../../common/BettingZoneMoveComnFold.js";
import PlayerBlockMoveEnemyBlock from "../../common/PlayerBlockMoveEnemyBlock.js";
import errorComn from "../../../common/errorComn.js";
import resultTxtInnerHtml from "../../common/resultTxtInnerHtml.js";
import setSessionDelete from "../../sessions/setSessionDelete.js";
import pcDraggableCheck from "../../common/pcDraggableCheck.js";
import { GET_ROUND_END } from "../roundEnd/getRoundEnd.js";
import cardHideAnimationComn from "../../common/cardHideAnimationComn.js";

export const SET_FOLD = {
  setFold: (_num) => {
    let promise = new Promise((resolve, reject) => {
      resolve(_num);
    });
    promise
      .then((_numRes) => {
        window.sessionStorage.setItem("betUser", false);
        window.sessionStorage.removeItem("drewState");
        flipPlayerCardComn(flipPlayerCard, _numRes);
        // 1. YOU FOLD NEXT 문구 출력
        // 2. 배팅이 끝난 코인은 enemy block으로 이동
        // 3. player의 추가 배팅이 있으면 player block으로 이동
        SET_FOLD.roundResultDisplay();
        BattingZoneMoveEnemyBlock("fold").then((_state) => {
          BettingZoneMoveComnFold().then(() => {
            // window.sessionStorage.setItem("coinsEnemy", Number(window.sessionStorage) + _numRes);
            const COINS_ENEMY = window.sessionStorage.coinsEnemy;
            const COINS_PLAYER = window.sessionStorage.coinsPlayer;
            const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
            const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
            const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
            const FOLD_CE = COINS_ENEMY && Number(COINS_ENEMY) >= 0 ? Number(COINS_ENEMY) : 0;
            const FOLD_CP = COINS_PLAYER && Number(COINS_PLAYER) >= 0 ? Number(COINS_PLAYER) : 0;
            const FOLD_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) >= 0 ? Number(COINS_ENEMY_BET) : 0;
            const FOLD_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) >= 0 ? Number(COINS_PLAYER_BET) : 0;
            const FOLD_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) >= 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
            const RES_E = Number(FOLD_CEB + FOLD_CPB - FOLD_CPEB);
            window.sessionStorage.setItem("coinsEnemy", FOLD_CE + RES_E);
            window.sessionStorage.setItem("coinsPlayer", FOLD_CP + FOLD_CPEB);
            if (_num === 10) {
              bottomSheet.show(text.indianpocker.penalty, timeInterval_5000);
              PlayerBlockMoveEnemyBlock().then(() => {
                SET_FOLD.foldPenaltySessionModify(true);
              });
            } else {
              SET_FOLD.foldPenaltySessionModify(false);
            }
          });
        });
      })
      .catch((error) => {
        return errorComn(error);
      });
  },
  roundResultDisplay: () => {
    const BETTING_ZONE = document.querySelector(".betting-zone");
    if (!BETTING_ZONE) return errorComn("fold 에서 .betting-zone 엘리먼트가 없습니다.");
    let txtArr = ["YOU", "FOLD", "NEXT"];
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
  foldPenaltySessionModify: (_statePenalty) => {
    const P_COINS = Number(window.sessionStorage.coinsPlayer);
    const E_COINS = Number(window.sessionStorage.coinsEnemy);
    const COINS_ENEMY = document.querySelector(".coins-enemy");
    if (!COINS_ENEMY) errorComn("fold ani 완료 후 .coins-enemy 엘리먼트가 없습니다");
    const COINS_PLAYER = document.querySelector(".coins-player");
    if (!COINS_PLAYER) errorComn("fold ani 완료 후 .coins-player 엘리먼트가 없습니다");
    const COINS_ENEMY_LI = COINS_ENEMY.querySelectorAll("li");
    const COINS_PLAYER_LI = COINS_PLAYER.querySelectorAll("li");
    if (COINS_ENEMY_LI.length > 0) for (let i = 0; i < COINS_ENEMY_LI.length; i++) COINS_ENEMY_LI[i].remove();
    if (Number(E_COINS) > 0) for (let i = 0; i < Number(E_COINS); i++) COINS_ENEMY.appendChild(document.createElement("li"));
    if (COINS_PLAYER_LI.length > 0) for (let i = 0; i < COINS_PLAYER_LI.length; i++) COINS_PLAYER_LI[i].remove();
    if (Number(P_COINS) > 0) for (let i = 0; i < Number(P_COINS); i++) COINS_PLAYER.appendChild(document.createElement("li"));
    const D_ARR = ["coinsEnemyBet", "coinsPlayerBet", "coinsEnemyExtBet", "coinsPlayerExtBet", "betCoin", "betCoinPos", "extFirstBet", "drewReady", "drewState"];
    setSessionDelete("sessionStorage", D_ARR);
    pcDraggableCheck("coins-player", false);
    setTimeout(
      () => {
        GET_ROUND_END.getWinnerCoinNext("die");
        cardHideAnimationComn();
        setTimeout(GET_ROUND_END.goNextRound, timeInterval_1);
      },
      _statePenalty ? timeInterval_1000 : 0
    );
  },
};
