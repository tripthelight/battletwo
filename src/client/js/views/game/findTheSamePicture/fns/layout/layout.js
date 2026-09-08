import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { TRACK_SIZE } from '@/client/js/views/game/findTheSamePicture/fns/common/variable';

export function setIconToCard(icon, item) {
  if (!icon) return;

  if (!item) {
    icon.style.display = 'none';
    return;
  }

  icon.style.display = '';
  icon.style.left = `${item.offsetLeft + 1}px`;
  icon.style.top = `${item.offsetTop + 1}px`;
  icon.style.width = `${Math.max(0, item.clientWidth - 2)}px`;
  icon.style.height = `${Math.max(0, item.clientHeight - 2)}px`;
}

export function positionIcons() {
  const state = runtime.state;

  if (!state || !runtime.peerId) return;

  const player = state.players[runtime.clientId];
  const enemy = state.players[runtime.peerId];
  const playerItems = runtime.elements.playerList?.children;
  const enemyItems = runtime.elements.enemyList?.children;

  if (!player || !enemy || !playerItems || !enemyItems) return;

  const playerIndex =
    player.position >= TRACK_SIZE
      ? TRACK_SIZE - 1
      : player.position;
  const enemyIndex =
    enemy.position >= TRACK_SIZE
      ? 0
      : TRACK_SIZE - 1 - enemy.position;

  setIconToCard(
    runtime.elements.playerIcon,
    player.position >= TRACK_SIZE
      ? null
      : playerItems[playerIndex],
  );
  setIconToCard(
    runtime.elements.enemyIcon,
    enemy.position >= TRACK_SIZE
      ? null
      : enemyItems[enemyIndex],
  );
}

export function applyOrientation() {
  document.body.classList.remove('landscape', 'portrait');

  const width = window.innerWidth;
  const height = window.innerHeight;
  const landscape =
    width >= 600 ||
    width >= height ||
    height - width <= 246;

  document.body.classList.add(
    landscape ? 'landscape' : 'portrait',
  );
}

export function resizeBoardText() {
  const buttons = runtime.elements.boardButtons;

  if (!buttons.length) return;

  buttons.forEach((button) => {
    const front = button.firstElementChild;

    if (front) {
      front.style.fontSize = `${button.clientWidth / 2}px`;
    }
  });
}

export function scheduleLayout() {
  if (runtime.resizeRaf) return;

  runtime.resizeRaf = window.requestAnimationFrame(() => {
    runtime.resizeRaf = 0;
    applyOrientation();
    resizeBoardText();
    positionIcons();
  });
}
