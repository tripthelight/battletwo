import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/communication/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import storageKeys from '@/client/js/module/storeageUsage/storageKeys';
import storeageUsage from '@/client/js/module/storeageUsage/storeageUsage';

export default (_event) => {
  // sessionStorage 모든 key check
  storeageUsage({
    storageArea: 's',
    storageKeys: storageKeys({
      p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
      p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    }),
  });

  // storageMethod('s', 'SET_ITEM', 'enemyCardChoiceReady', false);

  const encryptKey1 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  storageMethod('s', 'SET_ITEM', encryptKey1, false);

  const playerNum = randomNumberMinMax(1, 10);

  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // if (window.sessionStorage.playerFirstNumber) {
  if (encryptVal2 === '') {
    // local player가 선택한 카드가 없을 때
    setTimeout(showChoiceCard, timeInterval_1, _event, playerNum);
  } else {
    // local player가 선택한 카드가 있을 때
    const message = '내가 선택하기 전 카드 번호 sessionStorage value 조작';
    request('opponentFouls', { subject: 'local', message: message });
  }
};
