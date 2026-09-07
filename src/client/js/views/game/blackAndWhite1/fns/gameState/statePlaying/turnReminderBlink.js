import storageMethod from '@/client/js/module/storage/storageMethod';
import turnReminderBlinkNull from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull';
import {
  ensureActiveUser,
  getTurnState,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

export default () => {
  turnReminderBlinkNull();

  const playerBlack = document.querySelector('.black-square');
  const enemyBlack = document.querySelector('.enemy-black-square');
  if (!playerBlack || !enemyBlack) return;

  const turnState = getTurnState();

  // 두 번째 제출 이후에는 결과 대기 상태이므로 어느 쪽 Goal도 Turn으로 강조하지 않는다.
  if (turnState.hasAfterPlayerNum) return;

  const activeUser = ensureActiveUser();
  const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
  if (!activeUser || !localPlayer) return;

  if (activeUser === localPlayer) {
    enemyBlack.classList.remove('active');
    playerBlack.classList.add('active');
  } else {
    playerBlack.classList.remove('active');
    enemyBlack.classList.add('active');
  }
};
