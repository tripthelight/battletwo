import modalInitNickname from '@/client/components/popup/modal/modalInitNickname';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { text } from '@/client/js/functions/language';
import getUnicodePoints from '@/client/js/module/unicode/getUnicodePoints';
import errorNameEvent from '@/client/js/functions/errorNameEvent';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';

/**
 * 닉네임 입력 팝업
 * localStorage의 localPlayer 로 저장
 * 닉네임 입력 팝업 닫은 후 띄울 팝업이 있을 수 있음
 * @param {string} afterPopup | 닉네임 입력 팝업 닫은 후 띄울 팝업 종류 ex) 'loading'
 * @param {string | null | undefined} afterStr | 닉네임 입력 팝업 닫은 후 띄울 팝업 문구
 * @returns resolve
 */
export default function initNickName(afterPopup, afterStr) {
  return new Promise((resolve, reject) => {
    // localStorage의 nickname은 string[] 로 저장됨
    const NICK_NAME = localStorage.getItem('localPlayer');

    if (NICK_NAME) {
      // nick이 있는 경우
      resolve();
    } else {
      // nick이 없는 경우
      const MODAL_POPUP = document.querySelector('.init-user-name');
      if (MODAL_POPUP) return;

      const { MODAL_POP_WRAP, IPT_EL, BTN_DEL, MODAL_OK, BODY_EL } = modalInitNickname();

      IPT_EL.focus();

      IPT_EL.addEventListener('input', (_event) => {
        const TARGET = _event.target;
        if (TARGET.value.length > 0) {
          const INFO_TEXT_EL = document.querySelector('.info-change-name');
          if (INFO_TEXT_EL) {
            INFO_TEXT_EL.remove();
          }

          // 띄어쓰기 방지
          TARGET.value = TARGET.value.replace(/\s+/g, '');

          // 20글자 이상 입력 시 입력 방지
          if (TARGET.value.length > 20) {
            TARGET.value = TARGET.value.slice(0, 20);
            errorNameEvent(BODY_EL, text.nickErr20);
          }

          BTN_DEL.classList.remove('hide');
        } else {
          BTN_DEL.classList.add('hide');
        }
      });

      BTN_DEL.addEventListener('click', () => {
        const INFO_TEXT_EL = document.querySelector('.info-change-name');
        if (INFO_TEXT_EL) {
          INFO_TEXT_EL.remove();
        }
        IPT_EL.value = '';
        IPT_EL.focus();
        BTN_DEL.classList.add('hide');
      });

      MODAL_OK.addEventListener('click', () => {
        if (IPT_EL.value === '') {
          errorNameEvent(BODY_EL, text.nickErr0);
        } else {
          // Unicode 배열 형식으로 변환
          const RESULT = getUnicodePoints(IPT_EL.value.replace(/\s+/g, ''));
          storageMethod('l', 'SET_ITEM', 'localPlayer', RESULT);
          MODAL_POP_WRAP.remove();

          // 닉네임 입력 팝업 닫은 후 띄울 팝업 체크
          if (afterPopup) {
            if (afterPopup === 'loading') {
              LOADING_EVENT.show(afterStr ?? null);
            }
          }

          resolve();
        }
      });
    }
  });
}
