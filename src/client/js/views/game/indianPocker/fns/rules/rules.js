export default {
  CALL: () => {},
  ALLIN_OLD: () => {
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    const AI_CP = COINS_PLAYER && Number(COINS_PLAYER) > 0 ? Number(COINS_PLAYER) : 0;
    const AI_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) > 0 ? Number(COINS_PLAYER_BET) : 0;
    const AI_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) > 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const AI_CE = COINS_ENEMY && Number(COINS_ENEMY) > 0 ? Number(COINS_ENEMY) : 0;
    const AI_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) > 0 ? Number(COINS_ENEMY_BET) : 0;
    const AI_CEEB = COINS_ENEMY_EXT_BET && Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;
    let aiResD = 0;
    let aiResA = 0;
    let aiResS = 0;

    if (AI_CE > AI_CP) {
      if (AI_CEEB > AI_CPEB) {
        aiResD = 0;
        aiResA = AI_CP;
        aiResS = AI_CP + AI_CPEB;
      } else if (AI_CEEB < AI_CPEB) {
        if (AI_CE + AI_CEEB < AI_CPEB) {
          aiResD = AI_CPEB - AI_CE + AI_CEEB;
          aiResA = 0;
          aiResS = AI_CE + AI_CEEB;
        } else if (AI_CE + AI_CEEB > AI_CPEB) {
          if (AI_CE + AI_CEEB - AI_CPEB > AI_CP) {
            aiResD = 0;
            aiResA = AI_CP;
            aiResS = AI_CP + AI_CPEB;
          } else if (AI_CE + AI_CEEB - AI_CPEB < AI_CP) {
            aiResD = 0;
            aiResA = AI_CE + AI_CEEB - AI_CPEB;
            aiResS = AI_CE + AI_CEEB - AI_CPEB + AI_CPEB;
          } else if (AI_CE + AI_CEEB - AI_CPEB === AI_CP) {
            aiResD = 0;
            aiResA = AI_CP;
            aiResS = AI_CP + AI_CPEB;
          }
        } else if (AI_CE + AI_CEEB === AI_CPEB) {
          aiResD = 0;
          aiResA = 0;
          aiResS = AI_CPEB;
        }
      } else if (AI_CEEB === AI_CPEB) {
        aiResD = 0;
        aiResA = AI_CP;
        aiResS = AI_CP + AI_CPEB;
      }
    } else if (AI_CE < AI_CP) {
      if (AI_CEEB > AI_CPEB) {
        if (AI_CE + AI_CEEB < AI_CPEB) {
          // 이런 경우는 없음
          console.log("이런 경우는 없음");
        } else if (AI_CE + AI_CEEB > AI_CPEB) {
          if (AI_CE + AI_CEEB - AI_CPEB < AI_CP) {
            // 여기 이상함
            // aiResD = 0;
            // aiResA = AI_CE + AI_CEEB - AI_CPEB;
            // aiResS = AI_CE + AI_CEEB - AI_CPEB + AI_CPEB;
            if (AI_CEB === AI_CPB) {
              aiResD = 0;
              aiResA = 0;
              aiResS = AI_CEEB - AI_CPEB;
            } else if (AI_CEB > AI_CPB) {
              aiResD = 0;
              aiResA = AI_CEB - AI_CPB;
              aiResS = AI_CEB - AI_CPB + AI_CPEB;
            } else if (AI_CEB < AI_CPB) {
              aiResD = AI_CPB - AI_CEB;
              aiResA = 0;
              aiResS = Number(AI_CPEB) - Number(AI_CPB - AI_CEB);
            }
          } else if (AI_CE + AI_CEEB - AI_CPEB > AI_CP) {
            aiResD = 0;
            aiResA = AI_CP;
            aiResS = AI_CP + AI_CPEB;
          } else if (AI_CE + AI_CEEB - AI_CPEB === AI_CP) {
            aiResD = 0;
            aiResA = AI_CE + AI_CEEB - AI_CPEB;
            aiResS = AI_CE + AI_CEEB - AI_CPEB + AI_CPEB;
          }
        } else if (AI_CE + AI_CEEB === AI_CPEB) {
          // 이런 경우는 없음
          console.log("이런 경우는 없음");
        }
      } else if (AI_CEEB < AI_CPEB) {
        if (AI_CE + AI_CEEB < AI_CPEB) {
          aiResD = AI_CPEB - Number(AI_CE + AI_CEEB);
          aiResA = 0;
          aiResS = AI_CE + AI_CEEB;
        } else if (AI_CE + AI_CEEB > AI_CPEB) {
          aiResD = 0;
          aiResA = AI_CE + AI_CEEB - AI_CPEB;
          aiResS = Number(AI_CE + AI_CEEB - AI_CPEB) + AI_CPEB;
        } else if (AI_CE + AI_CEEB === AI_CPEB) {
          aiResD = 0;
          aiResA = AI_CE + AI_CEEB - AI_CPEB;
          aiResS = Number(AI_CE + AI_CEEB - AI_CPEB) + AI_CPEB;
        }
      } else if (AI_CEEB === AI_CPEB) {
        aiResD = 0;
        aiResA = AI_CE;
        aiResS = AI_CE + AI_CPEB;
      }
    } else if (AI_CE === AI_CP) {
      if (AI_CEEB > AI_CPEB) {
        aiResD = 0;
        aiResA = AI_CP;
        aiResS = AI_CP + AI_CPEB;
      } else if (AI_CEEB < AI_CPEB) {
        if (AI_CE + AI_CEEB < AI_CPEB) {
          if (AI_CPEB - AI_CE + AI_CEEB < AI_CP) {
            aiResD = AI_CPEB - AI_CE + AI_CEEB;
            aiResA = 0;
            aiResS = AI_CPEB - Number(AI_CPEB - Number(AI_CE + AI_CEEB));
          } else if (AI_CPEB - AI_CE + AI_CEEB > AI_CP) {
            aiResD = AI_CPEB - AI_CE + AI_CEEB;
            aiResA = 0;
            aiResS = AI_CPEB - Number(AI_CPEB - Number(AI_CE + AI_CEEB));
          } else if (AI_CPEB - AI_CE + AI_CEEB === AI_CP) {
            aiResD = AI_CPEB - AI_CE + AI_CEEB;
            aiResA = 0;
            aiResS = AI_CPEB - Number(AI_CPEB - Number(AI_CE + AI_CEEB));
          }
        } else if (AI_CE + AI_CEEB > AI_CPEB) {
          if (AI_CE + AI_CEEB - AI_CPEB < AI_CP) {
            aiResD = 0;
            aiResA = AI_CE + AI_CEEB - AI_CPEB;
            aiResS = Number(AI_CE + AI_CEEB - AI_CPEB) + AI_CPEB;
          } else if (AI_CE + AI_CEEB - AI_CPEB > AI_CP) {
            // 이런 경우는 없음
            console.log("이런 경우는 없음");
          } else if (AI_CE + AI_CEEB - AI_CPEB === AI_CP) {
            // 이런 경우는 없음
            console.log("이런 경우는 없음");
          }
        } else if (AI_CE + AI_CEEB === AI_CPEB) {
          aiResD = 0;
          aiResA = 0;
          aiResS = AI_CPEB;
        }
      } else if (AI_CEEB === AI_CPEB) {
        aiResD = 0;
        aiResA = AI_CP;
        aiResS = AI_CP + AI_CPEB;
      }
    }
    return {
      RES: aiResA,
      RES_SEND: aiResS,
      RES_DELETE: aiResD,
    };
  },
  ALLIN: () => {
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;
    const AI_CP = COINS_PLAYER && Number(COINS_PLAYER) > 0 ? Number(COINS_PLAYER) : 0;
    const AI_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) > 0 ? Number(COINS_PLAYER_BET) : 0;
    const AI_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) > 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const AI_CE = COINS_ENEMY && Number(COINS_ENEMY) > 0 ? Number(COINS_ENEMY) : 0;
    const AI_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) > 0 ? Number(COINS_ENEMY_BET) : 0;
    const AI_CEEB = COINS_ENEMY_EXT_BET && Number(COINS_ENEMY_EXT_BET) > 0 ? Number(COINS_ENEMY_EXT_BET) : 0;
    const CALL_COUNT = AI_CEB - Number(AI_CPB - AI_CPEB);
    let min1 = Number(AI_CE);
    let min2 = Number(AI_CP + AI_CPEB) - Number(CALL_COUNT);
    let minValue = Math.min(Number(min1), Number(min2));
    let aiResS = minValue + CALL_COUNT;
    let aiResD = AI_CPEB - aiResS > 0 ? AI_CPEB - aiResS : 0;
    let aiResA = aiResS - Number(AI_CPEB - aiResD);
    return {
      RES: aiResA,
      RES_SEND: aiResS,
      RES_DELETE: aiResD,
    };
  },
};
