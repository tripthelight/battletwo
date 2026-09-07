import { enc } from '@/client/js/module/crypts/obf8lower';
import { deobfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import showBattleResult from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showBattleResult';
import { getCurrentRoundNumber } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/pendingRoundResult';

/**
 * @param {{ resultSend: string, round: number }} data 난독화된 round result payload
 */
export default (data) => {
  try {
    console.log('resultRound DATA ::::::: ', data);

    const { resultSend } = data ?? {};
    const round = Number(data?.round);
    const currentRound = getCurrentRoundNumber();

    if (!Number.isInteger(round) || round < 1 || round > 9) {
      throw new Error('resultRound round failed.');
    }

    // recovery가 이전 Round 결과를 다시 보냈지만 이미 다음 Round로 간 경우는 stale duplicate다.
    if (round < currentRound) return;

    if (round !== currentRound) {
      throw new Error('resultRound round mismatch.');
    }

    showBattleResult(
      enc(deobfuscateInt32(resultSend)),
      round
    );
  } catch (error) {
    errorManager(error, true);
  }
};
