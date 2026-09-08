import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import {
  BOARD_SIZE,
  FIRST_USER_ANI_DURATION_MS,
} from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import { getPairIds } from '@/client/js/views/game/findTheSamePicture/fns/common/state';
import { applyOrientation } from '@/client/js/views/game/findTheSamePicture/fns/layout/layout';

const MIN_ANIMATION_MS = 1800;
const PHASE = Object.freeze({
  FADE_START: 0.54,
  MOVE_START: 0.66,
  ACTIVE_FLIP_START: 0.75,
  BORDER_START: 0.88,
  BORDER_END: 0.98,
});

function hashString(value) {
  let hash = 2166136261;

  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seedText) {
  let seed = hashString(seedText) || 0x9e3779b9;

  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(source, random) {
  const result = source.slice();

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function getAnimationData(state) {
  const pairIds = getPairIds();
  const firstPlayer = state.players[state.turn];
  const firstChars = Array.from(firstPlayer.nickname).slice(0, BOARD_SIZE);
  const fillerChars = pairIds
    .flatMap((playerId) => Array.from(state.players[playerId].nickname));
  const sourceChars = fillerChars.length > 0
    ? fillerChars
    : firstChars;
  const random = createSeededRandom(
    `${state.gameId}:${state.turn}:first-user-ani`,
  );
  const positions = seededShuffle(
    Array.from({ length: BOARD_SIZE }, (_, index) => index),
    random,
  ).slice(0, firstChars.length);
  const cards = Array.from(
    { length: BOARD_SIZE },
    () => ({
      char: sourceChars[
        Math.floor(random() * sourceChars.length)
      ] ?? '?',
      activeIndex: -1,
      flipTurns: random() < 0.5 ? 2 : 4,
      flipDurationRatio: 0.45 + (random() * 0.45),
    }),
  );

  for (let i = 0; i < firstChars.length; i += 1) {
    const position = positions[i];
    cards[position] = {
      char: firstChars[i],
      activeIndex: i,
      flipTurns: [1, 3, 5][Math.floor(random() * 3)],
      flipDurationRatio: 0.45 + (random() * 0.45),
    };
  }

  return cards;
}

function addTimer(callback, delay) {
  const timerId = window.setTimeout(callback, Math.max(0, delay));
  runtime.firstUserAniTimerIds.push(timerId);
  return timerId;
}

function clearAnimationTimers() {
  runtime.firstUserAniTimerIds.forEach((timerId) => {
    clearTimeout(timerId);
  });
  runtime.firstUserAniTimerIds.length = 0;
}

function clearAnimationResizeHandler() {
  if (!runtime.firstUserAniResizeHandler) {
    return;
  }

  window.removeEventListener(
    'resize',
    runtime.firstUserAniResizeHandler,
  );
  runtime.firstUserAniResizeHandler = null;
}

function setDrawingBoardType(drawingBoard) {
  drawingBoard.classList.remove('type-width', 'type-height');
  drawingBoard.classList.add(
    window.innerWidth >= window.innerHeight
      ? 'type-width'
      : 'type-height',
  );
}

function createDrawingBoard(state, duration) {
  const gameScene = runtime.elements.gameScene ?? document.getElementById('gameScene');

  if (!gameScene) {
    return null;
  }

  applyOrientation();
  gameScene.replaceChildren();

  const drawingBoard = document.createElement('div');
  drawingBoard.className = 'drawing-board';

  const board = document.createElement('ul');
  board.className = 'board';
  board.style.position = 'relative';

  const cardsData = getAnimationData(state);
  const cards = new Array(BOARD_SIZE);
  const fragment = document.createDocumentFragment();

  cardsData.forEach((data, index) => {
    const card = document.createElement('li');
    card.className = 'picture-card';
    card.dataset.cardIndex = String(index);
    card.style.transform = 'rotateY(0deg)';
    card.style.transition = `transform ${Math.max(
      350,
      duration * data.flipDurationRatio * PHASE.FADE_START,
    )}ms ease-in, opacity 180ms ease-in`;

    if (data.activeIndex >= 0) {
      card.classList.add('active');
      card.dataset.active = String(data.activeIndex);
    }

    const front = document.createElement('span');
    front.className = 'front';

    const back = document.createElement('span');
    back.className = 'back';
    back.textContent = data.char;

    card.append(front, back);
    fragment.appendChild(card);
    cards[index] = card;
  });

  board.appendChild(fragment);
  drawingBoard.appendChild(board);
  setDrawingBoardType(drawingBoard);
  gameScene.appendChild(drawingBoard);

  const resizeHandler = () => {
    applyOrientation();
    setDrawingBoardType(drawingBoard);
  };
  runtime.firstUserAniResizeHandler = resizeHandler;
  window.addEventListener('resize', resizeHandler, { passive: true });

  // DOM 삽입 직후의 rotateY(0deg) 상태를 한 번만 확정한다.
  // 이 단계가 없으면 브라우저가 초기/최종 transform을 같은 paint로 합쳐
  // 첫 카드 flip transition을 생략할 수 있다.
  void board.offsetWidth;

  window.requestAnimationFrame(() => {
    cardsData.forEach((data, index) => {
      cards[index].style.transform = `rotateY(${data.flipTurns * 180}deg)`;
    });
  });

  return {
    gameScene,
    drawingBoard,
    board,
    cards,
  };
}

function createActiveCards(board, cards) {
  const activeCards = cards
    .filter((card) => card.classList.contains('active'))
    .sort(
      (a, b) => Number(a.dataset.active) - Number(b.dataset.active),
    );

  return activeCards.map((card) => {
    const clone = document.createElement('li');
    clone.className = 'active-card';
    clone.dataset.active = card.dataset.active;
    clone.style.width = `${card.clientWidth}px`;
    clone.style.height = `${card.clientHeight}px`;
    clone.style.left = `${card.offsetLeft}px`;
    clone.style.top = `${card.offsetTop}px`;

    const front = document.createElement('span');
    front.className = 'front';
    front.textContent = card.querySelector('.back')?.textContent ?? '';
    front.style.fontSize = getComputedStyle(card).fontSize;

    const back = document.createElement('span');
    back.className = 'back';

    clone.append(front, back);
    board.appendChild(clone);
    card.style.opacity = '0';

    return clone;
  });
}

function flickerAndFade(cards, duration, onDone) {
  const inactiveCards = cards.filter(
    (card) => !card.classList.contains('active'),
  );
  const flickerDuration = Math.max(180, duration * 0.09);
  const steps = 4;

  for (let step = 1; step <= steps; step += 1) {
    addTimer(() => {
      const opacity = step === steps
        ? '0'
        : String(step % 2 === 0 ? 0.22 : 0.72);

      inactiveCards.forEach((card) => {
        card.style.opacity = opacity;
      });
    }, (flickerDuration / steps) * step);
  }

  addTimer(onDone, flickerDuration + 10);
}

function arrangeActiveCards(board, activeCards, duration) {
  if (activeCards.length === 0) {
    return;
  }

  const vertical =
    window.innerWidth < window.innerHeight &&
    activeCards.length >= 5;
  const borderLeft = parseFloat(getComputedStyle(board).borderLeftWidth) || 0;
  const borderRight = parseFloat(getComputedStyle(board).borderRightWidth) || 0;
  const borderTop = parseFloat(getComputedStyle(board).borderTopWidth) || 0;
  const borderBottom = parseFloat(getComputedStyle(board).borderBottomWidth) || 0;
  const borderX = borderLeft + borderRight;
  const borderY = borderTop + borderBottom;
  const maxLength = vertical
    ? Math.min(window.innerHeight - 24, 600)
    : Math.min(window.innerWidth - 24, 600);
  const crossLimit = vertical
    ? Math.min(window.innerWidth - 24, 150)
    : Math.min(window.innerHeight - 24, 150);
  const cardSize = Math.max(
    34,
    Math.min(
      crossLimit,
      Math.floor(
        (maxLength - (vertical ? borderY : borderX)) /
          activeCards.length,
      ),
    ),
  );
  const boardWidth = vertical
    ? cardSize + borderX
    : (cardSize * activeCards.length) + borderX;
  const boardHeight = vertical
    ? (cardSize * activeCards.length) + borderY
    : cardSize + borderY;

  board.style.transition = `width ${duration}ms ease-in, height ${duration}ms ease-in, max-width ${duration}ms ease-in, max-height ${duration}ms ease-in`;
  board.style.width = `${boardWidth}px`;
  board.style.height = `${boardHeight}px`;
  board.style.maxWidth = `${boardWidth}px`;
  board.style.maxHeight = `${boardHeight}px`;

  activeCards.forEach((card, index) => {
    card.style.transition = `left ${duration}ms ease-in, top ${duration}ms ease-in, width ${duration}ms ease-in, height ${duration}ms ease-in`;
    card.style.width = `${cardSize}px`;
    card.style.height = `${cardSize}px`;
    card.style.left = `${vertical ? 0 : cardSize * index}px`;
    card.style.top = `${vertical ? cardSize * index : 0}px`;

    const front = card.querySelector('.front');
    if (front) {
      front.style.fontSize = `${Math.max(20, cardSize - 16)}px`;
    }
  });
}

function flipActiveCards(board, activeCards, duration) {
  if (activeCards.length === 0) {
    return;
  }

  board.classList.add('flip-active');

  const waveDuration = Math.max(120, duration * 0.035);
  const flipDuration = Math.max(220, duration * 0.07);
  const step = waveDuration / activeCards.length;

  activeCards.forEach((card, index) => {
    const delay = step * index;
    card.style.transition = `transform ${flipDuration}ms ease-in ${delay}ms, opacity 100ms linear ${delay + (flipDuration * 0.7)}ms`;
    card.classList.add('flip');
    card.style.opacity = '0';
  });
}

function getPlayingBoardSize() {
  if (document.body.classList.contains('portrait')) {
    return Math.min(window.innerWidth, 600);
  }

  const landscapeSize =
    window.innerHeight - (window.innerWidth * 0.16);

  return Math.min(
    600,
    Math.max(120, landscapeSize),
  );
}

function morphBoardBorder(gameScene, board, duration) {
  const rect = board.getBoundingClientRect();
  const style = getComputedStyle(board);
  const border = document.createElement('div');
  const targetSize = getPlayingBoardSize();

  border.style.position = 'fixed';
  border.style.left = `${rect.left}px`;
  border.style.top = `${rect.top}px`;
  border.style.width = `${rect.width}px`;
  border.style.height = `${rect.height}px`;
  border.style.boxSizing = 'border-box';
  border.style.border = style.border;
  border.style.backgroundColor = style.backgroundColor;
  border.style.pointerEvents = 'none';
  border.style.zIndex = '9904';
  border.style.transition = `all ${duration}ms ease-in`;

  gameScene.replaceChildren(border);

  window.requestAnimationFrame(() => {
    border.style.left = '50%';
    border.style.top = '50%';
    border.style.width = `${targetSize}px`;
    border.style.height = `${targetSize}px`;
    border.style.transform = 'translate(-50%, -50%)';
  });

  return border;
}

export function runFirstUserAnimation(onComplete) {
  const state = runtime.state;

  if (!state) {
    onComplete?.();
    return;
  }

  clearAnimationTimers();
  clearAnimationResizeHandler();

  const remain = Math.max(0, state.readyAt - Date.now());

  if (remain < MIN_ANIMATION_MS) {
    addTimer(() => {
      runtime.firstUserAniTimerIds.length = 0;
      onComplete?.();
    }, remain);
    return;
  }

  const duration = Math.min(
    FIRST_USER_ANI_DURATION_MS,
    remain,
  );
  const scene = createDrawingBoard(state, duration);

  if (!scene) {
    addTimer(onComplete, remain);
    return;
  }

  let activeCards = [];

  addTimer(() => {
    flickerAndFade(scene.cards, duration, () => {
      activeCards = createActiveCards(scene.board, scene.cards);
    });
  }, duration * PHASE.FADE_START);

  addTimer(() => {
    scene.cards.forEach((card) => card.remove());
    arrangeActiveCards(
      scene.board,
      activeCards,
      Math.max(220, duration * 0.07),
    );
  }, duration * PHASE.MOVE_START);

  addTimer(() => {
    flipActiveCards(scene.board, activeCards, duration);
  }, duration * PHASE.ACTIVE_FLIP_START);

  let border = null;
  addTimer(() => {
    clearAnimationResizeHandler();
    border = morphBoardBorder(
      scene.gameScene,
      scene.board,
      Math.max(300, duration * 0.11),
    );
  }, duration * PHASE.BORDER_START);

  addTimer(() => {
    border?.remove();
  }, duration * PHASE.BORDER_END);

  addTimer(() => {
    clearAnimationTimers();
    clearAnimationResizeHandler();
    onComplete?.();
  }, remain);
}
