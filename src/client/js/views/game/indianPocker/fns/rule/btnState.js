import { comnText } from '@/client/js/functions/language';
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
  },
  HIDE: () => {
    // 하단 버튼 삭제
    const BOTTOM_BUTTONS_EL = document.querySelector('.bottom-buttons');
    if (BOTTOM_BUTTONS_EL) BOTTOM_BUTTONS_EL.remove();
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
      if (CPB === CEB) BTN_CALL_RAISE.onclick = () => RULES.CALL();
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => RULES.RAISE();
    }
    BTN_ALLIN.onclick = () => RULES.ALLIN();
    BTN_FOLD.onclick = () => RULES.FOLD();
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
      if (CPB === CEB) BTN_CALL_RAISE.onclick = () => RULES.CALL();
      if (CPB > CEB && CPB - CEB <= CE) BTN_CALL_RAISE.onclick = () => RULES.RAISE();
    }
    const BTN_FOLD = ELEMENT.CHECK('.fold', 'findCheck');
    BTN_FOLD.onclick = () => RULES.FOLD();
    const BTN_ALLIN = ELEMENT.CHECK('.all-in', 'findCheck');
    BTN_ALLIN.onclick = () => RULES.ALLIN();
  },
};
