import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { text } from '@/client/js/functions/language';
import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';
import {
  ensureActiveUser,
  getTurnState
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

const enemyNickKey = () => findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]);

const getEnemyDisplayName = () => {
  const enemyNick = storageMethod('s', 'GET_ITEM', enemyNickKey());
  if (!enemyNick) return '';

  try {
    return fromUnicodePoints(parsePayloadToHex(enemyNick));
  } catch {
    return '';
  }
};

const getTurnView = (preferStart) => {
  const turnState = getTurnState();
  const activeUser = ensureActiveUser();
  const isLocalActive =
    activeUser &&
    turnState.localPlayer &&
    activeUser === turnState.localPlayer;

  const isOpeningTurn =
    isLocalActive &&
    turnState.firstUser === turnState.localPlayer &&
    !turnState.hasBeforePlayerNum &&
    !turnState.hasEnemyBeforeCube;

  const isFollowUpTurn =
    isLocalActive &&
    turnState.firstUser !== turnState.localPlayer &&
    turnState.hasEnemyBeforeCube;

  return {
    activeUser,
    isLocalActive,
    isFollowUpTurn,
    isRoundLocked: turnState.hasAfterPlayerNum,
    shouldHide: turnState.hasAfterPlayerNum,
    showStart: Boolean(preferStart && isOpeningTurn && !turnState.activeUser),
  };
};

export const positionInnerSquare = (elem = document.querySelector('.inner-square')) => {
  const view = getTurnView(false);
  if (!elem || view.shouldHide || !elem.classList.contains('before')) return;

  const PLAYER_BLOCK = document.querySelector('.player-block');
  if (!PLAYER_BLOCK) return;

  const offset = view.isFollowUpTurn ? 12 : -20;
  elem.style.top = PLAYER_BLOCK.offsetTop - elem.clientHeight + offset + 'px';
  elem.style.zIndex = 1001;
};

export const shouldHideInnerSquare = () => getTurnView(false).shouldHide;

export const applyInnerSquareTurnView = (
  elem = document.querySelector('.inner-square'),
  { preferStart = false } = {}
) => {
  if (!elem) return;

  const TXTS = elem.querySelectorAll('span');
  if (TXTS.length < 3) return;

  const view = getTurnView(preferStart);

  if (view.shouldHide) {
    elem.remove();
    return;
  }

  elem.classList.remove('before', 'after');

  if (view.isLocalActive && !view.isRoundLocked) {
    elem.classList.add('before');

    if (view.showStart) {
      TXTS[0].innerText = text.balckandwhite1.start;
      TXTS[1].innerText = '';
      TXTS[2].innerText = text.balckandwhite1.moveNum;
    } else {
      TXTS[0].innerText = text.balckandwhite1.yourTurn;
      TXTS[1].innerText = text.balckandwhite1.moveNum;
      TXTS[2].innerText = '';
    }

    positionInnerSquare(elem);
    return;
  }

  elem.classList.add('after');
  elem.style.top = '';
  elem.style.zIndex = '';

  TXTS[0].innerText = getEnemyDisplayName();
  TXTS[1].innerText = text.balckandwhite1.order;
  TXTS[2].innerText = text.balckandwhite1.wait;
};
