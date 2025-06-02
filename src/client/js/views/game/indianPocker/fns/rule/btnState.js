import { errorManagement } from '@/client/js/module/errorManagement';
import { timeInterval_1, timeInterval_200 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import { comnText } from '@/client/js/functions/language';
import storageMethod from '@/client/js/module/storage/storageMethod';
import BOTTOM_BUTTONS from '@/client/js/views/game/indianPocker/fns/common/components/bottomButtons';
import INDIANPOCKER_SESSION from '@/client/js/views/game/indianPocker/fns/rule/indianpockerSession';
import { ELEMENT } from '@/client/js/views/game/indianPocker/fns/rule/element';
import { RULES } from '@/client/js/views/game/indianPocker/fns/rule/rules';
import changeBottomComnText from '@/client/js/views/game/indianPocker/fns/common/changeBottomComnText';
import changeBottomComnDisabled from '@/client/js/views/game/indianPocker/fns/common/changeBottomComnDisabled';

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
    request('requestPlayerCardNum', { clickBtn: clickBtn });
  },
  INIT: () => {
    const BTN_FOLD = ELEMENT.CHECK('.fold', 'findCheck');
    const BTN_ALLIN = ELEMENT.CHECK('.all-in', 'findCheck');
    if (!INDIANPOCKER_SESSION('EFB') || INDIANPOCKER_SESSION('EFB') === 'false') {
      // 첫 배팅일 경우
      const BTN_BETTING = ELEMENT.CHECK('.betting', 'findCheck');
      // disabled
      if (INDIANPOCKER_SESSION('CPEB') > 0 && INDIANPOCKER_SESSION('CPEB') <= INDIANPOCKER_SESSION('CE')) {
        BTN_BETTING.removeAttribute('disabled');
        BTN_BETTING.onclick = () => RULES.BETTING();
      } else {
        BTN_BETTING.setAttribute('disabled', true);
      }
    } else if (INDIANPOCKER_SESSION('EFB') && INDIANPOCKER_SESSION('EFB') === 'true') {
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
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => RULES.RAISE();
    }
    // BTN_ALLIN.onclick = () => RULES.ALLIN();
    BTN_ALLIN.onclick = () => BTN_STATE.HANDLER('allin');
    // BTN_FOLD.onclick = () => RULES.FOLD();
    BTN_FOLD.onclick = () => BTN_STATE.HANDLER('fold');
  },
  CHANGE: () => {
    if (!ELEMENT.CHECK('.bottom-buttons', 'find')) return;
    if (!INDIANPOCKER_SESSION('EFB') || INDIANPOCKER_SESSION('EFB') === 'false') {
      // 첫 배팅일 경우
      const BTN_BETTING = ELEMENT.CHECK('.betting', 'findCheck');
      // disabled
      if (INDIANPOCKER_SESSION('CPEB') > 0 && INDIANPOCKER_SESSION('CPEB') <= INDIANPOCKER_SESSION('CE')) {
        BTN_BETTING.removeAttribute('disabled');
        BTN_BETTING.onclick = () => RULES.BETTING();
      } else {
        BTN_BETTING.setAttribute('disabled', true);
      }
    } else if (INDIANPOCKER_SESSION('EFB') && INDIANPOCKER_SESSION('EFB') === 'true') {
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
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => RULES.RAISE();
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

    const COINS_ENEMY = window.sessionStorage.coinsEnemy ?? 0;
    const COINS_ENEMY_BET = window.sessionStorage.coinsEnemyBet ?? 0;
    const COINS_ENEMY_EXT_BET = window.sessionStorage.coinsEnemyExtBet ?? 0;
    const COINS_PLAYER = window.sessionStorage.coinsPlayer ?? 0;
    const COINS_PLAYER_BET = window.sessionStorage.coinsPlayerBet ?? 0;
    const COINS_PLAYER_EXT_BET = window.sessionStorage.coinsPlayerExtBet ?? 0;

    const C_E = Number(COINS_ENEMY);
    const C_E_B = Number(COINS_ENEMY_BET);
    const C_E_E_B = Number(COINS_ENEMY_EXT_BET);
    const P_E = Number(COINS_PLAYER);
    const P_E_B = Number(COINS_PLAYER_BET);
    const P_E_E_B = Number(COINS_PLAYER_EXT_BET);

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
