import { publicCardNumbs } from '@/client/store/encryptionStore';
// import cardNumEncryption from '@/client/js/functions/bcrypt/cardNumEncryption';
import findCharCode from '@/client/js/functions/findCharCode';
import showChoiceCard from '@/client/js/views/game/indianPocker/fns/gameState/stateChoiceCard/showChoiceCard';
import dataHandler from '@/client/js/functions/dataVerification/click/dataHandler';
import throwObj from '@/client/js/module/errorHandler/throwObj';
// import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
// import findCardPukNum from '@/client/js/views/game/indianPocker/fns/test/findCardPukNum';

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
    const arrNumbs = publicCardNumbs();
    if (!arrNumbs || (arrNumbs && arrNumbs.length === 0)) {
      throw throwObj('cardNum', 'cardNum length 0 - 1');
    }

    // encryptPlayerNum : publicCardNums 중 랜덤한 하나 선택
    const encryptPlayerNum = arrNumbs[Math.floor(Math.random() * arrNumbs.length)];

    // console.log('선택한 카드 코드 : ', findCardPukNum(encryptPlayerNum));

    showChoiceCard(_event, encryptPlayerNum);
  } else {
    throw throwObj('sessionStorageLoss', 'cardNum sessionStorage value manipulat.');
  }
};
