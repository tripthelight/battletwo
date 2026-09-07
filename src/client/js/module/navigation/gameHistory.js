const HISTORY_STATE_KEY = '__battletwoGameHistory';
const SELECT_GAME_PATH = '/selectGame';

let skipInProgress = false;

function getPathname(url) {
  if (!url) return '';

  try {
    return new URL(url, window.location.href).pathname;
  } catch {
    return '';
  }
}

function isSelectGamePath(pathname) {
  return (
    pathname === SELECT_GAME_PATH ||
    pathname.startsWith(`${SELECT_GAME_PATH}/`)
  );
}

function isGamePath(pathname) {
  return pathname.startsWith('/game/');
}

function getNavigationIndex() {
  const index = window.navigation?.currentEntry?.index;
  return Number.isInteger(index) ? index : null;
}

function getNavigationType() {
  const [entry] = performance.getEntriesByType?.('navigation') ?? [];
  return entry?.type ?? null;
}

function getHistoryStateObject() {
  const state = window.history.state;

  if (
    state &&
    typeof state === 'object' &&
    !Array.isArray(state)
  ) {
    return state;
  }

  return {};
}

function getGameHistoryMeta() {
  const state = window.history.state;

  if (
    !state ||
    typeof state !== 'object' ||
    Array.isArray(state)
  ) {
    return null;
  }

  const meta = state[HISTORY_STATE_KEY];

  if (
    !meta ||
    typeof meta !== 'object' ||
    meta.version !== 1 ||
    meta.isGameEntry !== true
  ) {
    return null;
  }

  return meta;
}

function setGameHistoryMeta(meta) {
  const state = getHistoryStateObject();

  window.history.replaceState(
    {
      ...state,
      [HISTORY_STATE_KEY]: meta,
    },
    '',
    window.location.href,
  );

  return meta;
}

/**
 * 현재 /game/... history entry에 복귀 경로 정보를 기록한다.
 *
 * /selectGame 또는 /selectGame/...에서 게임으로 진입한 경우에는
 * game entry 바로 앞의 selectGame entry뿐 아니라 그 이전 entry까지
 * 기억한다. 게임이 끝난 뒤 오래된 game entry가 history traversal로
 * 다시 나타나면 두 entry를 함께 건너뛰어 최초 selectGame 진입 전
 * 경로로 돌아갈 수 있게 하기 위함이다.
 *
 * replaceState만 사용하므로 history entry 수를 늘리지 않는다.
 */
export function markGameHistoryEntry() {
  if (!isGamePath(window.location.pathname)) {
    return null;
  }

  const existing = getGameHistoryMeta();
  if (existing) return existing;

  const referrerPath = getPathname(document.referrer);
  const enteredFromSelectGame = isSelectGamePath(referrerPath);
  const currentIndex = getNavigationIndex();

  let returnIndex = null;

  if (currentIndex !== null && currentIndex > 0) {
    if (enteredFromSelectGame) {
      // index 1처럼 selectGame 이전 entry가 없는 경우에는
      // 가능한 가장 가까운 selectGame entry(index 0)를 fallback으로 사용한다.
      returnIndex = currentIndex >= 2
        ? currentIndex - 2
        : currentIndex - 1;
    } else {
      returnIndex = currentIndex - 1;
    }
  }

  const fallbackBackSteps =
    enteredFromSelectGame && window.history.length >= 3
      ? 2
      : 1;

  return setGameHistoryMeta({
    version: 1,
    isGameEntry: true,
    enteredFromSelectGame,
    retired: false,
    returnIndex,
    fallbackBackSteps,
  });
}

/**
 * 현재 게임 entry를 다시 진입하면 안 되는 과거 게임으로 표시한다.
 * reload는 같은 history entry에서 수행되므로 retired 여부와 무관하게
 * 정상 reload 복구가 가능하고, back/forward traversal에서만 skip한다.
 */
export function retireGameHistoryEntry() {
  const meta = markGameHistoryEntry();
  if (!meta) return false;
  if (meta.retired) return true;

  setGameHistoryMeta({
    ...meta,
    retired: true,
  });

  return true;
}

function isHistoryTraversal(event) {
  if (event?.persisted === true) return true;
  return getNavigationType() === 'back_forward';
}

function getReturnDelta(meta) {
  const currentIndex = getNavigationIndex();

  if (
    currentIndex !== null &&
    Number.isInteger(meta.returnIndex) &&
    meta.returnIndex >= 0 &&
    meta.returnIndex < currentIndex
  ) {
    return meta.returnIndex - currentIndex;
  }

  const steps = Number.isInteger(meta.fallbackBackSteps)
    ? Math.max(1, meta.fallbackBackSteps)
    : 1;

  return -steps;
}

/**
 * 끝났거나 이탈한 과거 game entry가 뒤로/앞으로가기로 복원되면
 * 게임 init을 실행하지 않고 해당 entry를 즉시 건너뛴다.
 *
 * /selectGame에서 진입했던 게임이라면 game + 그 게임 앞 selectGame을
 * 함께 건너뛰어 최초 selectGame 진입 전 경로로 복귀한다.
 *
 * @param {PageTransitionEvent|null} event
 * @returns {boolean} history skip을 시작했으면 true
 */
export function skipRetiredGameHistoryEntry(event = null) {
  if (skipInProgress) return true;

  const meta = getGameHistoryMeta();

  if (
    !isGamePath(window.location.pathname) ||
    !meta?.retired ||
    !isHistoryTraversal(event)
  ) {
    return false;
  }

  skipInProgress = true;

  // BFCache가 오래된 게임 화면을 그리기 전에 가능한 한 즉시 숨긴다.
  if (document.documentElement) {
    document.documentElement.style.visibility = 'hidden';
  }

  const delta = getReturnDelta(meta);

  if (window.history.length > 1 && delta < 0) {
    window.history.go(delta);
    return true;
  }

  window.location.replace(SELECT_GAME_PATH);
  return true;
}

/**
 * 게임 오류 등 코드에서 /selectGame으로 돌아갈 때 새 history entry를
 * 추가하지 않는다. selectGame에서 들어온 게임이면 기존 selectGame
 * entry로 back하고, 직접 진입한 게임이면 현재 game entry를 replace한다.
 */
export function returnToSelectGame() {
  const meta = markGameHistoryEntry();

  retireGameHistoryEntry();

  if (
    meta?.enteredFromSelectGame &&
    window.history.length > 1
  ) {
    window.history.back();
    return;
  }

  window.location.replace(SELECT_GAME_PATH);
}
