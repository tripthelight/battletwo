import { selectCompairNumbers } from '@/client/store/encryptionStore';
import cardNumEncryption from '@/client/js/functions/bcrypt/cardNumEncryption';
import findCharCode from '@/client/js/functions/findCharCode';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default async (_event) => {
  // sessionStorage 모든 key check
  dataHandler({
    p1: findCharCode([68, 74, 69, 77, 70, 75, 76, 86, 68, 69]), // indianPocker
    p2: findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
    p3: findCharCode([70, 72, 79, 69, 87, 80, 73, 67, 84, 83]), // choiceCardClick
  });

  const encryptKey2 = findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]); // playerFirstNumber
  const encryptVal2 = window.sessionStorage.getItem(encryptKey2);

  if (encryptVal2 === '') {
    // 랜덤한 카드 생성 후 -> 0 ~ 39 을 1 ~ 10 사이로 변환
    const encryptPlayerNum = cardNumEncryption((((Math.floor(Math.random() * selectCompairNumbers().length)) - 1) % 10) + 1);
    // local peer / remote peer 같은 숫자 생성
    // const encryptPlayerNum = cardNumEncryption(0);

    // local player가 선택한 카드가 없을 때
    showChoiceCard(_event, encryptPlayerNum);
  } else {
    throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
  };
};
