import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawEnemyBlock from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawEnemyBlock';

export default () => {
  // storageMethod('s', 'REMOVE_ITEM', 'drewState');
  // storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  // storageMethod('s', 'REMOVE_ITEM', 'dropState');
  // storageMethod('s', 'SET_ITEM', 'betState', 'extraBetting');
  const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
  if (!EXT_FIRST_BET) storageMethod('s', 'SET_ITEM', 'extFirstBet', false);

  // 명령
  setTimeout(() => {
    setTimeout(rfDrawEnemyBlock, timeInterval_1);
  }, timeInterval_1);
};
