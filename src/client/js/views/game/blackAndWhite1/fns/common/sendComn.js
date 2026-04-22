import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import beforePlayerNum from '@/client/js/views/game/blackAndWhite1/fns/common/beforePlayerNum';
import afterPlayerNum from '@/client/js/views/game/blackAndWhite1/fns/common/afterPlayerNum';
import changeCubeSession from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeCubeSession';
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';
import {
  getTurnState,
  isLocalTurn
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

/**
 * @param {number} num selected cube number
 * @param {number} index selected cube index
 */
export default (num, index) => {
  const firstUserKey = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
  const firstUser = storageMethod('s', 'GET_ITEM', firstUserKey);
  const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
  const turnState = getTurnState();
  const localIsFirst = firstUser === localPlayer;

  const localCanMove =
    isLocalTurn() &&
    !turnState.hasAfterPlayerNum &&
    (
      (localIsFirst && !turnState.hasBeforePlayerNum) ||
      (!localIsFirst && turnState.hasEnemyBeforeCube)
    );

  if (!localCanMove) return;

  if (localIsFirst) {
    beforePlayerNum(num, index);
    changeActiveUser();
  } else {
    afterPlayerNum(num, index);
  }

  changeCubeSession(num);
};
