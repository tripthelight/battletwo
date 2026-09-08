import CARD_IMAGES from '@/client/js/views/game/findTheSamePicture/fns/common/cardAssets';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { BOARD_SIZE } from '@/client/js/views/game/findTheSamePicture/fns/common/variable';

export function ensureBoardCards() {
  const { board } = runtime.elements;
  const state = runtime.state;

  if (!board || !state) return;

  if (
    board.childElementCount === BOARD_SIZE &&
    board.dataset.gameId === state.gameId
  ) {
    return;
  }

  const fragment = document.createDocumentFragment();
  const buttons = new Array(BOARD_SIZE);

  for (let i = 0; i < BOARD_SIZE; i += 1) {
    const item = document.createElement('li');
    item.className = 'card';

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn';
    button.dataset.boardIndex = String(i);
    button.setAttribute('aria-label', `flip card ${i + 1}`);

    const front = document.createElement('span');
    front.className = 'front';
    front.textContent = state.letters[i];

    const back = document.createElement('span');
    back.className = 'back';

    const image = new Image();
    image.src = CARD_IMAGES[state.board[i]];
    image.alt = '';
    image.draggable = false;

    back.appendChild(image);
    button.append(front, back);
    item.appendChild(button);
    fragment.appendChild(item);
    buttons[i] = button;
  }

  board.replaceChildren(fragment);
  board.dataset.gameId = state.gameId;
  runtime.elements.boardButtons = buttons;
}

export function getBoardButton(boardIndex) {
  return runtime.elements.boardButtons[boardIndex] ?? null;
}

export function startReveal(boardIndex) {
  getBoardButton(boardIndex)?.classList.add('flip');
}

export function endReveal(boardIndex) {
  getBoardButton(boardIndex)?.classList.remove('flip');
}

export function clearAllReveals() {
  runtime.elements.boardButtons.forEach((button) => {
    button.classList.remove('flip');
  });
}
