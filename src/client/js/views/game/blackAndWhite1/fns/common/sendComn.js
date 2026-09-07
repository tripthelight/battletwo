import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import beforePlayerNum from '@/client/js/views/game/blackAndWhite1/fns/common/beforePlayerNum';
import afterPlayerNum from '@/client/js/views/game/blackAndWhite1/fns/common/afterPlayerNum';
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';
import changeCubeSession from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeCubeSession';
import {
  getTurnState,
  isLocalTurn,
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnState';

/**
 * 현재 Player가 제출한 Cube 정보를 상대 Peer에 전달한다.
 *
 * @param {number} num 내가 선택한 큐브 숫자
 * @param {number} index 내가 선택한 큐브 index
 * @returns {boolean} 실제 제출 메시지를 전송했으면 true
 */
export default (num, index) => {
  const firstUserKey = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
  const activeUserKey = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const enemyNickKey = findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]); // enemyNick

  const firstUser = storageMethod('s', 'GET_ITEM', firstUserKey);
  const activeUser = storageMethod('s', 'GET_ITEM', activeUserKey);
  const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
  const enemyNick = storageMethod('s', 'GET_ITEM', enemyNickKey);

  if (!localPlayer || !enemyNick || !firstUser || !activeUser) {
    throw throwObj('sessionStorageLoss', 'sendComn - turn state failed.');
  }

  if (firstUser !== localPlayer && firstUser !== enemyNick) {
    throw throwObj('dataManipulation', 'sendComn - firstUser data failed.');
  }

  if (activeUser !== localPlayer && activeUser !== enemyNick) {
    throw throwObj('dataManipulation', 'sendComn - activeUser data failed.');
  }

  const turnState = getTurnState();
  const localIsFirst = firstUser === localPlayer;

  // 중앙 검증 지점에서 같은 Round 중복 제출을 차단한다.
  // 특히 후Player의 second move가 저장된 뒤에는 activeUser가 local로 남아 있어도
  // isLocalTurn()이 false가 되므로 reload / stale event 모두 전송할 수 없다.
  const localCanMove = Boolean(
    isLocalTurn() &&
    !turnState.hasAfterPlayerNum &&
    (
      (localIsFirst && !turnState.hasBeforePlayerNum) ||
      (!localIsFirst && turnState.hasEnemyBeforeCube)
    )
  );

  if (!localCanMove) return false;

  if (localIsFirst) {
    beforePlayerNum(num, index);
    changeActiveUser();
  } else {
    afterPlayerNum(num, index);
  }

  changeCubeSession(num);
  return true;
};
