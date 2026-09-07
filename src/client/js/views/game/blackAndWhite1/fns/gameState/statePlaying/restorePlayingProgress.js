import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import passScore from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/passScore';
import readResultHistory from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/readResultHistory';

/**
 * playing 화면을 새 document에 다시 만든 직후 Score와 Round 표시를 복원한다.
 *
 * 실제 진행 데이터(result, round)는 sessionStorage에 이미 유지되므로
 * Peer 간 추가 메시지 없이 현재 Peer의 DOM만 동기적으로 갱신한다.
 * 정상 최초 진입에서는 result=[] / round=1이므로 기존 화면과 동일하다.
 */
export default function restorePlayingProgress() {
  const scoreBoard = document.querySelector('.score-board');
  const roundCircle = document.querySelector('.round-circle');

  if (!scoreBoard || !roundCircle) {
    throw throwObj(
      'elementLoss',
      'restorePlayingProgress - progress DOM failed.'
    );
  }

  const roundKey = findCharCode([
    77, 84, 83, 88, 69, 85, 82, 87, 90, 79,
  ]); // round

  const encryptedRound = storageMethod(
    's',
    'GET_ITEM',
    roundKey
  );

  if (encryptedRound === null || encryptedRound === '') {
    throw throwObj(
      'sessionStorageLoss',
      'restorePlayingProgress - round failed.'
    );
  }

  const round = dec(encryptedRound);

  if (
    !Number.isInteger(round) ||
    round < 1 ||
    round > 10
  ) {
    throw throwObj(
      'sessionStorageLoss',
      'restorePlayingProgress - round value failed.'
    );
  }

  const roundNum = roundCircle.querySelector('.num');

  if (!roundNum) {
    throw throwObj(
      'elementLoss',
      'restorePlayingProgress - round number failed.'
    );
  }

  // 결과 이력은 최대 9개 수준이므로 reload 시 한 번 순회하는 비용만 발생한다.
  passScore(readResultHistory());
  roundNum.textContent = String(round);
}
