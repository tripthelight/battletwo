import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import removeElement from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/removeElement';

export default () => {
  const COINS_PLAYER = window.sessionStorage.coinsPlayer;
  const COINS_ENEMY = window.sessionStorage.coinsEnemy;

  const encryptVal_1 = findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]); // true
  const encryptVal_2 = findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]); // false

  storageMethod('s', 'SET_ITEM',
    findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
    findCharCode([70, 84, 75, 87, 74, 67, 73, 77, 80, 65]) // basicBetting
  );

  storageMethod('s', 'SET_ITEM',
    findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), //extFirstBet
    encryptVal_2 // false
  );

  storageMethod('s', 'REMOVE_ITEM', 'drewReady');

  storageMethod('s', 'REMOVE_ITEM', findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85])); // basicBetReady
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
