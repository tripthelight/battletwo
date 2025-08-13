import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/indianPocker/request';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';

export default async (_event) => {
  // sessionStorage 모든 key check
  dataHandler({
    p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    p3: findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83]), // choiceCardClick
  });

  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  // if (window.sessionStorage.playerFirstNumber) {
  if (encryptVal2 === '') {
    const { selectCompairNumbers } = await import('@/client/store/encryptionStore');
    const { default: bcrypt } = await import('bcryptjs');
    const arrNumbs = selectCompairNumbers();
    const randomValue = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];
    const encryptPlayerNum = bcrypt.hashSync(randomValue, 3);

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
