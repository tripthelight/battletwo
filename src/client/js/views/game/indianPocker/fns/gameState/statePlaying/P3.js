import { timeInterval_1 } from '@/client/js/functions/variable';
import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_deleteList) => {
  return new Promise((resolve, reject) => {
    console.log('5-3 : ', _deleteList);
    setTimeout(() => {
      // const CARD_NUM = window.sessionStorage.cardNum;
      // if (!CARD_NUM) return;
      // const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
      // sessionStorage cardNum key 찾기
      const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
      const decryptVal = window.sessionStorage.getItem(encryptKey);
      const CARD_NUM_ARR = JSON.parse(decryptVal);
      if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return reject(new Error('cardNum세션을 못받음'));
      if (_deleteList.length === 0) return;
      sessionActiveCard('enemy', _deleteList[0]);
      for (let i = 0; i < CARD_NUM_ARR.length; i++) {
        if (CARD_NUM_ARR[i] === _deleteList[0]) {
          CARD_NUM_ARR.splice(i, 1);
        }
      }
      resolve(CARD_NUM_ARR);
    }, timeInterval_1);
  });
};
