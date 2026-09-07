import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec } from '@/client/js/module/crypts/obf8lower';
import activeUserCheckRound from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/activeUserCheckRound';
import setGameOrderRoundCheck from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setGameOrderRoundCheck';
import drawInnerSquare from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare';
import setBlink from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/setBlink';

/**
 * 한 라운드가 끝난 뒤 다음 라운드의 선Player와 activeUser를 결정한다.
 *
 * resultValue
 * 0: lose
 * 1: win
 * 2: draw
 *
 * 승리한 Player가 다음 라운드의 선Player가 되고,
 * 무승부일 때는 기존 선Player가 그대로 선Player를 유지한다.
 * 다음 라운드 시작 시점에는 activeUser와 firstUser가 반드시 같아야 한다.
 *
 * 다음 Round가 존재하는 경우에는 이전 Round 제출 과정에서 제거된
 * inner-square를 새 Turn 상태에 맞춰 다시 생성한다.
 *
 * @param {string} res 난독화된 라운드 결과
 */
export default (res) => {
  try {
    const activeUserKey = findCharCode([
      73, 71, 65, 80, 77, 75, 84, 66, 85, 82,
    ]); // activeUser

    const firstUserKey = findCharCode([
      73, 81, 90, 83, 68, 86, 69, 89, 78, 70,
    ]); // firstUser

    const enemyNickKey = findCharCode([
      77, 74, 67, 72, 65, 68, 80, 85, 84, 90,
    ]); // enemyNick

    const localPlayer = storageMethod('l', 'GET_ITEM', 'localPlayer');
    const enemyNick = storageMethod('s', 'GET_ITEM', enemyNickKey);
    const currentFirstUser = storageMethod('s', 'GET_ITEM', firstUserKey);

    if (!localPlayer || !enemyNick) {
      throw throwObj(
        'sessionStorageLoss',
        'setGameOrderRound - player value failed.'
      );
    }

    const isKnownUser = (user) => user === localPlayer || user === enemyNick;
    const resultValue = dec(res);

    let nextFirstUser;

    switch (resultValue) {
      case 1: // win
        nextFirstUser = localPlayer;
        break;

      case 0: // lose
        nextFirstUser = enemyNick;
        break;

      case 2: // draw
        if (!isKnownUser(currentFirstUser)) {
          throw throwObj(
            'dataManipulation',
            'setGameOrderRound - firstUser data failed.'
          );
        }

        nextFirstUser = currentFirstUser;
        break;

      default:
        throw throwObj(
          'dataManipulation',
          'setGameOrderRound - round result data failed.'
        );
    }

    // 새 Round 시작점에서는 두 값이 반드시 동일해야 한다.
    storageMethod('s', 'SET_ITEM', firstUserKey, nextFirstUser);
    storageMethod('s', 'SET_ITEM', activeUserKey, nextFirstUser);

    // 마지막 Round가 끝났다면 gameOver가 화면을 구성하므로
    // playing용 Turn UI를 다시 만들지 않는다.
    if (!setGameOrderRoundCheck()) return;

    // Turn 소유권에 따라 Cube 입력 가능 여부를 즉시 갱신한다.
    activeUserCheckRound();

    // 이전 Round에서 Cube 제출 시 제거된 안내 영역을 새 Round마다 재생성한다.
    // drawInnerSquare() 내부에서 activeUser 기준으로 before/after 문구를 결정한다.
    drawInnerSquare();

    // black-square / enemy-black-square의 Turn 강조 상태도 즉시 갱신한다.
    setBlink();
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'setGameOrderRound.js error'
    );
  }
};
