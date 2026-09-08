import CARD_IMAGES from '@/client/js/views/game/findTheSamePicture/fns/common/cardAssets';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { TRACK_SIZE } from '@/client/js/views/game/findTheSamePicture/fns/common/variable';
import { scheduleLayout } from '@/client/js/views/game/findTheSamePicture/fns/layout/layout';

const TRACK_SHIFT_DURATION_MS = 1000;
const TRACK_SHIFT_EASING = 'ease-in';

function updateTrackImages(
  list,
  imageIndexes,
  activeIndex = -1,
  reverse = false,
) {
  if (!list || !Array.isArray(imageIndexes)) return;

  const items = list.children;

  for (let i = 0; i < TRACK_SIZE; i += 1) {
    const item = items[i];
    const image = item?.firstElementChild;
    const imageIndex = reverse
      ? imageIndexes[TRACK_SIZE - 1 - i]
      : imageIndexes[i];

    if (!item || !image || !Number.isInteger(imageIndex)) continue;

    if (item.dataset.imageIndex !== String(imageIndex)) {
      image.src = CARD_IMAGES[imageIndex];
      item.dataset.imageIndex = String(imageIndex);
    }

    item.classList.toggle(
      'card-active-loop',
      i === activeIndex,
    );
  }
}

function isWrongShift(previousTrack, nextTrack) {
  if (
    !Array.isArray(previousTrack) ||
    !Array.isArray(nextTrack) ||
    previousTrack.length !== TRACK_SIZE ||
    nextTrack.length !== TRACK_SIZE ||
    nextTrack[0] !== previousTrack[0]
  ) {
    return false;
  }

  for (let i = 2; i < TRACK_SIZE; i += 1) {
    if (nextTrack[i] !== previousTrack[i - 1]) {
      return false;
    }
  }

  return true;
}

function createIncomingCard(
  list,
  slot,
  imageIndex,
  reverse,
) {
  const card = document.createElement('li');
  const image = new Image();
  const width = slot.clientWidth;
  const height = slot.clientHeight;

  image.src = CARD_IMAGES[imageIndex];
  image.alt = '';
  image.draggable = false;
  image.style.width = '100%';
  image.style.height = '100%';

  card.appendChild(image);
  card.style.position = 'absolute';
  card.style.left = `${slot.offsetLeft}px`;
  card.style.top = `${slot.offsetTop}px`;
  card.style.width = `${width}px`;
  card.style.height = `${height}px`;
  card.style.opacity = '0';
  card.style.pointerEvents = 'none';
  card.style.zIndex = '1002';
  card.style.willChange = 'transform, opacity';
  card.style.transition =
    `transform ${TRACK_SHIFT_DURATION_MS}ms ${TRACK_SHIFT_EASING}, ` +
    `opacity ${TRACK_SHIFT_DURATION_MS}ms ${TRACK_SHIFT_EASING}`;
  card.style.transform = reverse
    ? `translateY(${height}px)`
    : `translateY(${-height}px)`;

  list.appendChild(card);

  return card;
}

function prepareShiftItem(item) {
  item.style.willChange = 'transform, opacity';
  item.style.transition =
    `transform ${TRACK_SHIFT_DURATION_MS}ms ${TRACK_SHIFT_EASING}, ` +
    `opacity ${TRACK_SHIFT_DURATION_MS}ms ${TRACK_SHIFT_EASING}`;
}

function resetShiftItemWithoutTransition(item) {
  item.style.transition = 'none';
  item.style.transform = '';
  item.style.opacity = '';
  item.style.zIndex = '';
  item.style.willChange = '';
}

/**
 * 이동 애니메이션의 마지막 프레임과 nextState DOM을 한 번에 확정한다.
 *
 * transform을 지우는 순간 CSS transition이 살아 있으면 브라우저가
 * "이동된 위치 -> 원래 슬롯"을 두 번째 애니메이션으로 해석할 수 있다.
 * 따라서 transition을 끈 상태에서 transform 제거 + 최종 이미지 반영을 끝내고,
 * layout을 한 번 확정한 뒤 CSS transition을 복원한다.
 */
function commitWrongTrackShift(
  list,
  items,
  incomingCard,
) {
  items.forEach(resetShiftItemWithoutTransition);
  incomingCard.remove();

  // runtime.state에는 이미 검증된 nextState가 저장되어 있다.
  // 두 rail을 최종 state로 한 번만 반영한다.
  renderTracks();

  // transition:none + transform:none + 최종 이미지 상태를 실제 layout으로
  // 확정한 뒤 transition 속성을 복원해야 역방향 재애니메이션이 생기지 않는다.
  void list.offsetWidth;

  items.forEach((item) => {
    item.style.removeProperty('transition');
  });
}

/**
 * 오답 시 rail 카드 이동 애니메이션.
 *
 * local player rail:
 *   index 0은 유지하고 1..18을 오른쪽 한 칸 이동,
 *   새 카드는 index 1로 위에서 진입,
 *   마지막 index 19는 rail 밖으로 이탈한다.
 *
 * remote player rail은 화면에 reverse로 그려지므로 반대 방향으로 움직인다.
 * state/network는 이미 확정된 값을 그대로 사용하고 DOM만 시각적으로 보간한다.
 */
export function animateWrongTrackShift(
  actorId,
  previousState,
  nextState,
) {
  const isLocalActor = actorId === runtime.clientId;
  const isRemoteActor = actorId === runtime.peerId;

  if (!isLocalActor && !isRemoteActor) {
    return Promise.resolve(false);
  }

  const previousPlayer = previousState?.players?.[actorId];
  const nextPlayer = nextState?.players?.[actorId];

  if (
    !previousPlayer ||
    !nextPlayer ||
    !isWrongShift(previousPlayer.track, nextPlayer.track)
  ) {
    return Promise.resolve(false);
  }

  const reverse = isRemoteActor;
  const list = reverse
    ? runtime.elements.enemyList
    : runtime.elements.playerList;

  if (!list) {
    return Promise.resolve(false);
  }

  const items = Array.from(list.children).slice(0, TRACK_SIZE);

  if (items.length !== TRACK_SIZE) {
    return Promise.resolve(false);
  }

  const incomingVisualIndex = reverse
    ? TRACK_SIZE - 2
    : 1;
  const incomingImageIndex = nextPlayer.track[1];
  const incomingSlot = items[incomingVisualIndex];

  if (
    !incomingSlot ||
    !Number.isInteger(incomingImageIndex) ||
    !CARD_IMAGES[incomingImageIndex]
  ) {
    return Promise.resolve(false);
  }

  const incomingCard = createIncomingCard(
    list,
    incomingSlot,
    incomingImageIndex,
    reverse,
  );

  for (let i = 1; i < TRACK_SIZE - 1; i += 1) {
    prepareShiftItem(items[i]);
  }

  const exitIndex = reverse
    ? 0
    : TRACK_SIZE - 1;
  const exitCard = items[exitIndex];

  prepareShiftItem(exitCard);
  exitCard.style.zIndex = '1001';

  // incomingCard의 시작 위치를 브라우저에 확정시킨 뒤 transition을 시작한다.
  // 한 번의 layout flush만 사용하고, 이후 이동은 transform 기반으로 처리한다.
  void incomingCard.offsetWidth;

  scheduleLayout();

  window.requestAnimationFrame(() => {
    for (let i = 1; i < TRACK_SIZE - 1; i += 1) {
      const targetIndex = reverse
        ? i - 1
        : i + 1;
      const source = items[i];
      const target = items[targetIndex];
      const x = target.offsetLeft - source.offsetLeft;
      const y = target.offsetTop - source.offsetTop;

      source.style.transform = `translate(${x}px, ${y}px)`;
    }

    const exitDistance = Math.max(
      exitCard.clientWidth,
      exitCard.clientHeight,
    ) * 1.6;
    const exitDirection = reverse ? 1 : -1;

    exitCard.style.opacity = '0';
    exitCard.style.transform =
      `translate(${exitDirection * exitDistance}px, ` +
      `${exitDirection * exitDistance}px) ` +
      `scale(1.35) rotate(${exitDirection * 270}deg)`;

    incomingCard.style.opacity = '1';
    incomingCard.style.transform = 'translateY(0)';
  });

  return new Promise((resolve) => {
    window.setTimeout(() => {
      commitWrongTrackShift(
        list,
        items,
        incomingCard,
      );

      resolve(true);
    }, TRACK_SHIFT_DURATION_MS);
  });
}

export function renderTracks() {
  const state = runtime.state;

  if (!state || !runtime.peerId) return;

  const player = state.players[runtime.clientId];
  const enemy = state.players[runtime.peerId];

  if (!player || !enemy) return;

  updateTrackImages(
    runtime.elements.playerList,
    player.track,
    player.position > 0 && player.position <= TRACK_SIZE
      ? player.position - 1
      : -1,
  );

  updateTrackImages(
    runtime.elements.enemyList,
    enemy.track,
    -1,
    true,
  );

  scheduleLayout();
}
