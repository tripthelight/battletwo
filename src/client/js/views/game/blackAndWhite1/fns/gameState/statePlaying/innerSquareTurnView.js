import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { text } from '@/client/js/functions/language';
import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';
import {
  ensureActiveUser,
  getTurnState,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

const OPENING_GAP = 20;
const FOLLOW_UP_GAP = 12;

const enemyNickKey = () => (
  findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90])
);

const getEnemyDisplayName = () => {
  const enemyNick = storageMethod('s', 'GET_ITEM', enemyNickKey());
  if (!enemyNick) return '';

  try {
    return fromUnicodePoints(parsePayloadToHex(enemyNick));
  } catch {
    return '';
  }
};

const getTurnView = (preferStart = false) => {
  const turnState = getTurnState();
  const hadActiveUser = Boolean(turnState.activeUser);
  const activeUser = ensureActiveUser();
  const isLocalActive = Boolean(
    activeUser &&
    turnState.localPlayer &&
    activeUser === turnState.localPlayer
  );

  const isOpeningTurn = Boolean(
    isLocalActive &&
    turnState.firstUser === turnState.localPlayer &&
    !turnState.hasBeforePlayerNum &&
    !turnState.hasEnemyBeforeCube
  );

  const isFollowUpTurn = Boolean(
    isLocalActive &&
    turnState.firstUser !== turnState.localPlayer &&
    turnState.hasEnemyBeforeCube
  );

  // 선Player가 이미 첫 Cube를 냈거나 후Player의 두 번째 제출까지 끝났으면
  // Round 결과 대기 상태이므로 Turn 안내 팝업은 노출하지 않는다.
  const isLocalFirstWaiting = Boolean(
    turnState.firstUser === turnState.localPlayer &&
    turnState.hasBeforePlayerNum
  );

  return {
    isLocalActive,
    isFollowUpTurn,
    shouldHide: Boolean(
      turnState.hasAfterPlayerNum ||
      isLocalFirstWaiting
    ),
    showStart: Boolean(preferStart && isOpeningTurn && !hadActiveUser),
  };
};

/**
 * 내 Turn 안내 영역을 black-square 바로 위에 고정한다.
 *
 * 이전 구현은 현재 inner-square의 문구가 2줄인지 3줄인지에 따라
 * clientHeight가 달라지는 상태에서 playerBlock.offsetTop을 기준으로
 * top을 계산했다. live 전환에서는 3줄 높이로 계산한 뒤 2줄로 바뀌고,
 * reload 복구에서는 2줄 높이로 바로 계산되어 동일 Turn인데도 위치가
 * 달라질 수 있었다.
 *
 * 이제 실제 drop 영역인 black-square의 viewport top을 기준으로
 * 최종 렌더링된 inner-square 높이와 일정 gap만 사용하므로,
 * 정상 진행과 reload 복구가 항상 같은 기준 좌표를 사용한다.
 */
export const positionInnerSquare = (
  elem = document.querySelector('.inner-square')
) => {
  const view = getTurnView(false);

  if (
    !elem ||
    !elem.isConnected ||
    view.shouldHide ||
    !elem.classList.contains('before')
  ) {
    return;
  }

  const blackSquare = document.querySelector('.black-square');
  const playerBlock = document.querySelector('.player-block');

  if (!blackSquare && !playerBlock) return;

  const anchorTop = blackSquare
    ? blackSquare.getBoundingClientRect().top
    : playerBlock.getBoundingClientRect().top;

  const height = elem.getBoundingClientRect().height;
  if (!Number.isFinite(anchorTop) || !Number.isFinite(height) || height <= 0) {
    return;
  }

  const gap = view.isFollowUpTurn ? FOLLOW_UP_GAP : OPENING_GAP;

  elem.style.top = `${anchorTop - height - gap}px`;
  elem.style.zIndex = 1001;
};

export const shouldHideInnerSquare = () => getTurnView(false).shouldHide;

export const applyInnerSquareTurnView = (
  elem = document.querySelector('.inner-square'),
  { preferStart = false } = {}
) => {
  if (!elem) return;

  const texts = elem.querySelectorAll('span');
  if (texts.length < 3) return;

  const view = getTurnView(preferStart);

  if (view.shouldHide) {
    elem.remove();
    return;
  }

  elem.classList.remove('before', 'after');

  if (view.isLocalActive) {
    elem.classList.add('before');

    if (view.showStart) {
      texts[0].innerText = text.balckandwhite1.start;
      texts[1].innerText = '';
      texts[2].innerText = text.balckandwhite1.moveNum;
    } else {
      texts[0].innerText = text.balckandwhite1.yourTurn;
      texts[1].innerText = text.balckandwhite1.moveNum;
      texts[2].innerText = '';
    }

    // 위치 계산은 element가 DOM에 연결되고 active padding까지 적용된 뒤
    // drawInnerSquare / moveInnerSquare에서 수행한다.
    return;
  }

  elem.classList.add('after');
  elem.style.top = '';
  elem.style.zIndex = '';

  texts[0].innerText = getEnemyDisplayName();
  texts[1].innerText = text.balckandwhite1.order;
  texts[2].innerText = text.balckandwhite1.wait;
};
