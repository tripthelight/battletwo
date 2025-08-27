import findCharCode from '@/client/js/functions/findCharCode';
import { dec } from '@/client/js/module/crypts/obf8lower';

export default {
  CALL: () => {},
  ALLIN_OLD: () => {
    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsPlayer value number

    // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayerBet value number

    // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const encryptKey3 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const decryptVal3 = encryptVal3 !== null && encryptVal3 !== '' ? dec(encryptVal3) : 0; // coinsPlayerExtBet value number

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const encryptKey4 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsEnemy value number

    // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const encryptKey5 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0; // coinsEnemyBet value number

    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;

    // const AI_CP = COINS_PLAYER && Number(COINS_PLAYER) > 0 ? Number(COINS_PLAYER) : 0;
    const AI_CP = encryptVal1 !== null && encryptVal1 !== '' && Number(decryptVal1) > 0 ? Number(decryptVal1) : 0;

    // const AI_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) > 0 ? Number(COINS_PLAYER_BET) : 0;
    const AI_CPB = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2) > 0 ? Number(decryptVal2) : 0;

    // const AI_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) > 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const AI_CPEB = encryptVal3 !== null && encryptVal3 !== '' && Number(decryptVal3) > 0 ? Number(decryptVal3) : 0;

    // const AI_CE = COINS_ENEMY && Number(COINS_ENEMY) > 0 ? Number(COINS_ENEMY) : 0;
    const AI_CE = encryptVal4 !== null && encryptVal4 !== '' && Number(decryptVal4) > 0 ? Number(decryptVal4) : 0;

    // const AI_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) > 0 ? Number(COINS_ENEMY_BET) : 0;
    const AI_CEB = encryptVal5 !== null && encryptVal5 !== '' && Number(decryptVal5) > 0 ? Number(decryptVal5) : 0;

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
    // const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    const encryptKey1 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsPlayer value number

    // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet;
    const encryptKey2 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsPlayerBet value number

    // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet;
    const encryptKey3 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const decryptVal3 = encryptVal3 !== null && encryptVal3 !== '' ? dec(encryptVal3) : 0; // coinsPlayerExtBet value number

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    const encryptKey4 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsEnemy value number

    // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet;
    const encryptKey5 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0; // coinsEnemyBet value number

    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet;

    // const AI_CP = COINS_PLAYER && Number(COINS_PLAYER) > 0 ? Number(COINS_PLAYER) : 0;
    const AI_CP = encryptVal1 !== null && encryptVal1 !== '' && Number(decryptVal1) > 0 ? Number(decryptVal1) : 0;

    // const AI_CPB = COINS_PLAYER_BET && Number(COINS_PLAYER_BET) > 0 ? Number(COINS_PLAYER_BET) : 0;
    const AI_CPB = encryptVal2 !== null && encryptVal2 !== '' && Number(decryptVal2) > 0 ? Number(decryptVal2) : 0;

    // const AI_CPEB = COINS_PLAYER_EXT_BET && Number(COINS_PLAYER_EXT_BET) > 0 ? Number(COINS_PLAYER_EXT_BET) : 0;
    const AI_CPEB = encryptVal3 !== null && encryptVal3 !== '' && Number(decryptVal3) > 0 ? Number(decryptVal3) : 0;

    // const AI_CE = COINS_ENEMY && Number(COINS_ENEMY) > 0 ? Number(COINS_ENEMY) : 0;
    const AI_CE = encryptVal4 !== null && encryptVal4 !== '' && Number(decryptVal4) > 0 ? Number(decryptVal4) : 0;

    // const AI_CEB = COINS_ENEMY_BET && Number(COINS_ENEMY_BET) > 0 ? Number(COINS_ENEMY_BET) : 0;
    const AI_CEB = encryptVal5 !== null && encryptVal5 !== '' && Number(decryptVal5) > 0 ? Number(decryptVal5) : 0;

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
