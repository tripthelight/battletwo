import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import removeElement from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/removeElement';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;


  // storageMethod('s', 'SET_ITEM', 'betState', 'basicBetting');
  const encryptKey1 = findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]); // betState
  const encryptKey2 = findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]); // basicBetting
  storageMethod('s', 'SET_ITEM', encryptKey1, encryptKey2);

  storageMethod('s', 'SET_ITEM', 'extFirstBet', false);
  storageMethod('s', 'REMOVE_ITEM', 'drewReady');
  storageMethod('s', 'REMOVE_ITEM', 'basicBetReady');
  if (!COINS_PLAYER && !COINS_ENEMY) {
    storageMethod('s', 'SET_ITEM', 'coinsPlayer', 20);
    storageMethod('s', 'SET_ITEM', 'coinsEnemy', 20);
  };

  if (window.sessionStorage.coinsPlayerBet && Number(window.sessionStorage.coinsPlayerBet) === 1) {
    storageMethod('s', 'SET_ITEM', 'basicBettingState', true);
  } else {
    storageMethod('s', 'SET_ITEM', 'basicBettingState', false);
  };

  removeElement();
};
