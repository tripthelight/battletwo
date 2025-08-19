import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawEnemyBlockPlaying';

export default () => {

  storageMethod('s', 'REMOVE_ITEM', 'drewState');
  storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  storageMethod('s', 'REMOVE_ITEM', 'dropState');

  // storageMethod('s', 'SET_ITEM', 'betState', 'extraBetting');
  const encryptKey4 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  storageMethod('s', 'SET_ITEM', encryptKey4, 'extraBetting');

  const encryptKey5 = findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]); // extFirstBet
  const decryptVal5 = window.sessionStorage.getItem(encryptKey5);
  const encryptVal5 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false
  if (decryptVal5 === null) storageMethod('s', 'SET_ITEM', encryptKey5, encryptVal5);

  // 명령
  setTimeout(() => {
    setTimeout(drawEnemyBlockPlaying, timeInterval_1);
  }, timeInterval_1);
};
