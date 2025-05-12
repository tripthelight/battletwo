import storageMethod from '@/client/js/module/storage/storageMethod';
import { timeInterval_1 } from '@/client/js/functions/variable';
import removeElement from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/removeElement';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;

  setTimeout(() => {
    storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
    storageMethod('s', 'SET_ITEM', 'extFirstBet', false);
    storageMethod('s', 'REMOVE_ITEM', 'drewReady');
    storageMethod('s', 'REMOVE_ITEM', 'basicBetReady');
    if (!COINS_PLAYER && !COINS_ENEMY) {
      storageMethod('s', 'SET_ITEM', 'coinsPlayer', 20);
      storageMethod('s', 'SET_ITEM', 'coinsEnemy', 20);
    }

    if (window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) === 1) {
      storageMethod('s', 'SET_ITEM', 'basicBettingState', true);
    } else {
      storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
    }

    setTimeout(removeElement, timeInterval_1);
  }, timeInterval_1);
};
