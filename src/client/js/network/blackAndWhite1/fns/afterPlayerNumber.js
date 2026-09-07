import errorManager from '@/client/js/module/errorHandler/errorManager';
import moveEnemyCube from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/moveEnemyCube';
import battleCard from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/battleCard';
import { saveAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';
import { getCurrentRoundNumber } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

/**
 * 선Player가 후Player의 두 번째 Cube를 받는 경로.
 * reliable ACK 이전 같은 JavaScript turn 안에서 afterPlayerNum을 먼저 저장한다.
 */
export default (data) => {
  try {
    console.log('afterPlayerNumber DATA ::::::: ', data);

    const num = Number(data?.num);
    const index = Number(data?.index);
    const round = Number(data?.round);
    const currentRound = getCurrentRoundNumber();

    if (
      !Number.isInteger(num) || num < 0 || num > 8 ||
      !Number.isInteger(index) || index < 0 || index > 8 ||
      !Number.isInteger(round) || round < 1 || round > 9
    ) {
      throw new Error('afterPlayerNumber payload failed.');
    }

    // reconnect/recovery 뒤 늦게 도착한 이전 Round second-move는 무시한다.
    if (round < currentRound) return;

    if (round !== currentRound) {
      throw new Error('afterPlayerNumber round mismatch.');
    }

    saveAfterPlayerNum(num);
    moveEnemyCube(index);
    battleCard(num, round);
  } catch (error) {
    errorManager(error, true);
  }
};
