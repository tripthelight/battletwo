import { timeInterval_1 } from '@/client/js/functions/variable';
// import sessionActiveCard from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/sessionActiveCard';

export default (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { _deleteList, CARD_NUM_ARR } = data;

      // const CARD_NUM = window.sessionStorage.cardNum;
      // if (!CARD_NUM) return;
      // const CARD_NUM_ARR = JSON.parse(window.sessionStorage.cardNum);
      // sessionStorage cardNum key 찾기
      // const encryptKey = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]); // cardNum
      // const decryptVal = window.sessionStorage.getItem(encryptKey);
      // const CARD_NUM_ARR = JSON.parse(decryptVal);
      if (!CARD_NUM_ARR || CARD_NUM_ARR.length < 1) return reject(new Error('cardNum세션을 못받음'));
      console.log('_deleteList.length >>>>>>>>>>> ', _deleteList.length);

      if (_deleteList.length === 0) return;

      // sessionActiveCard('enemy', _deleteList[0]);
      for (let i = 0; i < CARD_NUM_ARR.length; i++) {
        if (CARD_NUM_ARR[i] === _deleteList[0]) {
          CARD_NUM_ARR.splice(i, 1);
        }
      }
      resolve(CARD_NUM_ARR);
    }, timeInterval_1);
  });
};
