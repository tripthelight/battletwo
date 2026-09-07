import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import turnReminderBlinkNull from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/turnReminderBlinkNull';
import { clearEnemyBeforeCube } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/enemyBeforeCube';
import { clearAfterPlayerNum } from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/afterPlayerCube';

export default () => {
  // 현재 Round에서 내가 선Player로 제출했던 Cube 정보 초기화
  storageMethod(
    's',
    'EMPTY_VALUE',
    findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]) // beforePlayerNum
  );

  // 현재 Round의 상대 첫 제출 색 정보 / 후Player 두 번째 제출 완료 marker 초기화
  clearEnemyBeforeCube();
  clearAfterPlayerNum();

  turnReminderBlinkNull();
};
