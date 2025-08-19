import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawEnemyBlockPlaying';

export default () => {

  storageMethod('s', 'REMOVE_ITEM', 'drewState');
  storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  storageMethod('s', 'REMOVE_ITEM', 'dropState');

  // storageMethod('s', 'SET_ITEM', 'betState', 'extraBetting');
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  storageMethod('s', 'SET_ITEM', encryptKey1, 'extraBetting');
  const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
  if (!EXT_FIRST_BET) storageMethod('s', 'SET_ITEM', 'extFirstBet', false);

  // 명령
  setTimeout(() => {
    setTimeout(drawEnemyBlockPlaying, timeInterval_1);
  }, timeInterval_1);
};
