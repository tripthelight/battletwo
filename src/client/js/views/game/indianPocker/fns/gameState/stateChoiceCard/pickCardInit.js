import bcrypt from 'bcryptjs';
import { selectCompairNumbers } from '@/client/store/encryptionStore';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import { errorManagement } from '@/client/js/module/errorManagement';
import findCharCode from '@/client/js/functions/findCharCode';
import { timeInterval_1 } from '@/client/js/functions/variable';
import { request } from '@/client/js/network/indianPocker/request';
import storageMethod from '@/client/js/module/storage/storageMethod';
import randomNumberMinMax from '@/client/js/views/game/indianPocker/fns/common/randomNumberMinMax';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';
import encryption from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryption';

export default async (_event) => {
  // sessionStorage 모든 key check
  dataHandler({
    p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    p3: findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83]), // choiceCardClick
  });

  // storageMethod('s', 'SET_ITEM', 'enemyCardChoiceReady', false);

  // const encryptKey1 = findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]); // enemyCardChoiceReady
  // storageMethod('s', 'SET_ITEM', encryptKey1, false);

  // TEST: 같은 숫자 뽑기
  // const playerNum = 5;
  // selectCompairNumbers()의 숫자들로 암호화???
  // const playerNum = randomNumberMinMax(1, 10);
  // const encryptPlayerNum = await encryption(playerNum.toString(), 3);

  const arrNumbs = selectCompairNumbers();
  const randomValue = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];
  const encryptPlayerNum = bcrypt.hashSync(randomValue, 3);


  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // if (window.sessionStorage.playerFirstNumber) {
  if (encryptVal2 === '') {
    // local player가 선택한 카드가 없을 때
    showChoiceCard(_event, encryptPlayerNum);
    // setTimeout(showChoiceCard, timeInterval_1, _event, playerNum);
  } else {
    // local player가 선택한 카드가 있을 때
    const message = '내가 선택하기 전 카드 번호 sessionStorage value 조작';
    request('opponentFouls', { message });
    throw { errCase: 'sessionStorageLoss', message }
    // errorManagement({ errCase: 'sessionStorageLoss', message });
  };
};
