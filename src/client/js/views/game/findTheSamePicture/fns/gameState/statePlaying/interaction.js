import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';

export function canLocalPlayerAct() {
  const state = runtime.state;

  return Boolean(
    state &&
    state.status === 'playing' &&
    Date.now() >= state.readyAt &&
    !runtime.uiLocked &&
    state.turn === runtime.clientId,
  );
}

export function updateBoardInteractivity() {
  const board = runtime.elements.board;

  if (!board) return;

  const enabled = canLocalPlayerAct();
  board.classList.toggle('select-active', enabled);

  runtime.elements.boardButtons.forEach((button) => {
    button.disabled = !enabled;
  });
}

export function showFailEffect() {
  if (document.querySelector('.fail-effect')) return;

  const effect = document.createElement('div');
  effect.className = 'fail-effect';
  document.body.appendChild(effect);

  setTimeout(() => {
    effect.remove();
  }, 650);
}
