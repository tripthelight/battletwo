import { findContainer } from '@/client/js/functions/comnExport';
import { timeInterval_201, timeInterval_203 } from '@/client/js/functions/variable';
import drawBlackSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawBlackSquare';
import activeUserCheck from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheck';
import turnReminderBlink from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlink';
import {
  applyInnerSquareTurnView,
  positionInnerSquare,
  shouldHideInnerSquare,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView';
import {
  clearInnerSquareNotice,
  ensureInnerSquareCloseButton,
  showInnerSquareNotice,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareNotice';
import { reactiveState } from '@/client/js/views/game/blackAndWhite1/fns/common/variable';

export default () => {
  const currentInnerSquare = document.querySelector('.inner-square');

  if (currentInnerSquare?.classList.contains('hide')) {
    clearInnerSquareNotice(currentInnerSquare);
    currentInnerSquare.remove();
  } else if (currentInnerSquare) {
    applyInnerSquareTurnView(currentInnerSquare);

    if (!currentInnerSquare.isConnected) return;

    ensureInnerSquareCloseButton(currentInnerSquare);
    positionInnerSquare(currentInnerSquare);
    activeUserCheck();
    turnReminderBlink();

    // 다음 Round가 시작되면 이전 Round에서 X 또는 자동 숨김으로 사라졌더라도
    // 다시 노출하고 5초 타이머를 새로 시작한다.
    showInnerSquareNotice(currentInnerSquare);
    return;
  }

  // 내가 선Player로 이미 Cube를 제출하고 결과를 기다리는 중이라면
  // live 진행과 동일하게 안내 영역을 다시 만들지 않는다.
  if (shouldHideInnerSquare()) {
    drawBlackSquare();
    activeUserCheck();
    turnReminderBlink();
    return;
  }

  const elem = document.createElement('div');
  const innerFirst = document.createElement('span');
  const innerInfo1 = document.createElement('span');
  const innerInfo2 = document.createElement('span');

  elem.classList.add('inner-square');
  elem.appendChild(innerFirst);
  elem.appendChild(innerInfo1);
  elem.appendChild(innerInfo2);
  ensureInnerSquareCloseButton(elem);

  // 최초 playing 진입이면 START, reload/턴 전환 복구라면 실제 activeUser 기준 문구를 사용한다.
  applyInnerSquareTurnView(elem, { preferStart: true });

  elem.style.width = `${reactiveState.InnerSquareW}px`;

  const container = findContainer();
  if (!container) return;

  container.appendChild(elem);

  setTimeout(() => {
    if (!elem.isConnected) return;

    elem.style.width = `${window.innerWidth - 80}px`;
    elem.classList.add('active');

    drawBlackSquare();
    positionInnerSquare(elem);
    activeUserCheck();

    // 실제 팝업 형태가 완성된 시점부터 5초를 센다.
    showInnerSquareNotice(elem);
  }, timeInterval_201);

  setTimeout(() => {
    if (!elem.isConnected) return;
    turnReminderBlink();
  }, timeInterval_203);
};
