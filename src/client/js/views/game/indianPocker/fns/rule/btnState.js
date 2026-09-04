import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import { dec } from '@/client/js/module/crypts/obf8lower';
// import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
// import { timeInterval_1, timeInterval_200 } from '@/client/js/functions/variable';
import { request } from '@/client/js/network/indianPocker/request';
import { comnText } from '@/client/js/functions/language';
// import storageMethod from '@/client/js/module/storage/storageMethod';
import BOTTOM_BUTTONS from '@/client/js/views/game/indianPocker/fns/common/components/bottomButtons';
import INDIANPOCKER_SESSION from '@/client/js/views/game/indianPocker/fns/rule/indianpockerSession';
import { ELEMENT } from '@/client/js/views/game/indianPocker/fns/rule/element';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';
import changeBottomComnText from '@/client/js/views/game/indianPocker/fns/common/changeBottomComnText';
import changeBottomComnDisabled from '@/client/js/views/game/indianPocker/fns/common/changeBottomComnDisabled';

function runButtonAction(action) {
  try {
    const result = action();

    if (result && typeof result.then === 'function') {
      result.catch((error) => {
        errorManager(error, true);
      });
    }
  } catch (error) {
    errorManager(error, true);
  }
}

export const BTN_STATE = {
  SHOW: () => {
    // 하단 버튼 보이기
    if (ELEMENT.CHECK('.bottom-buttons', 'find')) return BTN_STATE.INIT();
    BOTTOM_BUTTONS.main();
    BTN_STATE.INIT();
    BTN_STATE.LAST();
  },
  HIDE: () => {
    // 하단 버튼 삭제
    const BOTTOM_BUTTONS_EL = document.querySelector('.bottom-buttons');
    if (BOTTOM_BUTTONS_EL) BOTTOM_BUTTONS_EL.remove();
  },
  HANDLER: (clickBtn) => {
    runButtonAction(() => {
      request('requestPlayerCardNum', { clickBtn: clickBtn });
    });
  },
  INIT: () => {
    const BTN_FOLD = ELEMENT.CHECK('.fold', 'findCheck');
    const BTN_ALLIN = ELEMENT.CHECK('.all-in', 'findCheck');
    const extFirstBet = INDIANPOCKER_SESSION('EFB');

    if (!extFirstBet) {
      // 첫 배팅일 경우
      const BTN_BETTING = ELEMENT.CHECK('.betting', 'findCheck');
      // disabled
      if (INDIANPOCKER_SESSION('CPEB') > 0 && INDIANPOCKER_SESSION('CPEB') <= INDIANPOCKER_SESSION('CE')) {
        BTN_BETTING.removeAttribute('disabled');
        BTN_BETTING.onclick = () => runButtonAction(() => RULES.BETTING());
      } else {
        BTN_BETTING.setAttribute('disabled', true);
      }
    } else {
      // 처음 이후 추가 배팅일 경우
      const BTN_CALL_RAISE = ELEMENT.CHECK('.call', 'findCheck');
      // // 문구 변경 - CALL | RAISE
      BTN_CALL_RAISE.innerHTML = comnText.call;
      // disabled
      const CP = INDIANPOCKER_SESSION('CP');
      const CPB = INDIANPOCKER_SESSION('CPB');
      const CPEB = INDIANPOCKER_SESSION('CPEB');
      const CE = INDIANPOCKER_SESSION('CE');
      const CEB = INDIANPOCKER_SESSION('CEB');
      const CEEB = INDIANPOCKER_SESSION('CEEB');
      changeBottomComnText(BTN_CALL_RAISE, CPB, CPEB, CEB, CEEB);
      changeBottomComnDisabled(BTN_CALL_RAISE, CP, CPB, CPEB, CE, CEB, CEEB);
      // if (CPB === CEB) BTN_CALL_RAISE.onclick = () => RULES.CALL();
      if (CPB === CEB) BTN_CALL_RAISE.onclick = () => BTN_STATE.HANDLER('call');
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => runButtonAction(() => RULES.RAISE());
    }
    // BTN_ALLIN.onclick = () => RULES.ALLIN();
    BTN_ALLIN.onclick = () => BTN_STATE.HANDLER('allin');
    // BTN_FOLD.onclick = () => RULES.FOLD();
    BTN_FOLD.onclick = () => BTN_STATE.HANDLER('fold');
  },
  CHANGE: () => {
    if (!ELEMENT.CHECK('.bottom-buttons', 'find')) return;
    const extFirstBet = INDIANPOCKER_SESSION('EFB');

    if (!extFirstBet) {
      // 첫 배팅일 경우
      const BTN_BETTING = ELEMENT.CHECK('.betting', 'findCheck');
      // disabled
      if (INDIANPOCKER_SESSION('CPEB') > 0 && INDIANPOCKER_SESSION('CPEB') <= INDIANPOCKER_SESSION('CE')) {
        BTN_BETTING.removeAttribute('disabled');
        BTN_BETTING.onclick = () => runButtonAction(() => RULES.BETTING());
      } else {
        BTN_BETTING.setAttribute('disabled', true);
      }
    } else {
      // 처음 이후 추가 배팅일 경우
      const BTN_CALL_RAISE = ELEMENT.CHECK('.call', 'findCheck');
      // // 문구 변경 - CALL | RAISE
      BTN_CALL_RAISE.innerHTML = comnText.call;
      // disabled
      const CP = INDIANPOCKER_SESSION('CP');
      const CPB = INDIANPOCKER_SESSION('CPB');
      const CPEB = INDIANPOCKER_SESSION('CPEB');
      const CE = INDIANPOCKER_SESSION('CE');
      const CEB = INDIANPOCKER_SESSION('CEB');
      const CEEB = INDIANPOCKER_SESSION('CEEB');
      changeBottomComnText(BTN_CALL_RAISE, CPB, CPEB, CEB, CEEB);
      changeBottomComnDisabled(BTN_CALL_RAISE, CP, CPB, CPEB, CE, CEB, CEEB);
      // if (CPB === CEB) BTN_CALL_RAISE.onclick = () => RULES.CALL();

      if (CPB === CEB) BTN_CALL_RAISE.onclick = () => BTN_STATE.HANDLER('call');
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => runButtonAction(() => RULES.RAISE());
    }

    const BTN_FOLD = ELEMENT.CHECK('.fold', 'findCheck');
    // BTN_FOLD.onclick = () => RULES.FOLD();
    BTN_FOLD.onclick = () => BTN_STATE.HANDLER('fold');
    const BTN_ALLIN = ELEMENT.CHECK('.all-in', 'findCheck');
    // BTN_ALLIN.onclick = () => RULES.ALLIN();
    BTN_ALLIN.onclick = () => BTN_STATE.HANDLER('allin');
  },
  LAST: () => {
    // emeny나 player 중 기본 배팅 후 남은 코인이 없음
    const BOTTOM_BUTTONS_EL = document.querySelector('.bottom-buttons');
    if (!BOTTOM_BUTTONS_EL) return;

    // const COINS_ENEMY = window.sessionStorage.coinsEnemy ?? 0;
    const encryptKey1 = findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]); // coinsEnemy
    const encryptVal1 = window.sessionStorage.getItem(encryptKey1);
    const decryptVal1 = encryptVal1 !== null && encryptVal1 !== '' ? dec(encryptVal1) : 0; // coinsEnemy value number

    // const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet ?? 0;
    const encryptKey2 = findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]); // coinsEnemyBet
    const encryptVal2 = window.sessionStorage.getItem(encryptKey2);
    const decryptVal2 = encryptVal2 !== null && encryptVal2 !== '' ? dec(encryptVal2) : 0; // coinsEnemyBet value number

    // const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet ?? 0;
    const encryptKey3 = findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]); // coinsEnemyExtBet
    const encryptVal3 = window.sessionStorage.getItem(encryptKey3);
    const decryptVal3 = encryptVal3 !== null && encryptVal3 !== '' ? dec(encryptVal3) : 0; // coinsEnemyExtBet value number

    // const COINS_PLAYER = window.sessionStorage.coinsPlayer ?? 0;
    const encryptKey4 = findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]); // coinsPlayer
    const encryptVal4 = window.sessionStorage.getItem(encryptKey4);
    const decryptVal4 = encryptVal4 !== null && encryptVal4 !== '' ? dec(encryptVal4) : 0; // coinsPlayer value number

    // const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet ?? 0;
    const encryptKey5 = findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]); // coinsPlayerBet
    const encryptVal5 = window.sessionStorage.getItem(encryptKey5);
    const decryptVal5 = encryptVal5 !== null && encryptVal5 !== '' ? dec(encryptVal5) : 0; // coinsPlayerBet value number

    // const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet ?? 0;
    const encryptKey6 = findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]); // coinsPlayerExtBet
    const encryptVal6 = window.sessionStorage.getItem(encryptKey6);
    const decryptVal6 = encryptVal6 !== null && encryptVal6 !== '' ? dec(encryptVal6) : 0; // coinsPlayerExtBet value number

    // const C_E = Number(COINS_ENEMY);
    const C_E = Number(decryptVal1);

    // const C_E_B = Number(COINS_ENEMY_BET);
    const C_E_B = Number(decryptVal2);

    // const C_E_E_B = Number(COINS_ENEMY_EXT_BET);
    const C_E_E_B = Number(decryptVal3);

    // const P_E = Number(COINS_PLAYER);
    const P_E = Number(decryptVal4);

    // const P_E_B = Number(COINS_PLAYER_BET);
    const P_E_B = Number(decryptVal5);

    // const P_E_E_B = Number(COINS_PLAYER_EXT_BET);
    const P_E_E_B = Number(decryptVal6);

    if (C_E === 0 || P_E === 0) {
      if (C_E_B === P_E_B) {
        // emeny or player 가 기본 배팅 후 남은 코인이 없음
        const BTN_BATTING = BOTTOM_BUTTONS_EL.querySelector('li button.betting');
        const BTN_CALL = BOTTOM_BUTTONS_EL.querySelector('li button.call');
        if (BTN_BATTING || BTN_CALL) {
          if (BTN_BATTING) {
            BTN_BATTING.removeAttribute('disabled');
            BTN_BATTING.innerHTML = comnText.call;
            // BTN_BATTING.onclick = () => RULES.CALL();
            BTN_BATTING.onclick = () => BTN_STATE.HANDLER('call');
          } else if (BTN_CALL) {
            BTN_CALL.removeAttribute('disabled');
            BTN_CALL.innerHTML = comnText.call;
            // BTN_CALL.onclick = () => RULES.CALL();
            BTN_CALL.onclick = () => BTN_STATE.HANDLER('call');
          }
        }

        const BTN_ALLIN = BOTTOM_BUTTONS_EL.querySelector('li button.all-in');
        if (BTN_ALLIN) {
          BTN_ALLIN.setAttribute('disabled', true);
        }
      }
    }
  },
};
