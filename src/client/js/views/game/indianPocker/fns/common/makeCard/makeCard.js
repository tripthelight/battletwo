import { timeInterval_1 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { request } from '@/client/js/network/indianPocker/request';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import findCharCode from '@/client/js/functions/findCharCode';

export default async () => {
  const encryptKey1 = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]); // cardNum
  const decryptVal1 = window.sessionStorage.getItem(encryptKey1);
  if (decryptVal1 !== null && decryptVal1 !== '') {
    console.log('이미 만들어진 카드 있음');
    return;
  };

  const NUM_ARR = await encryptCardNumber();
  // console.log('NUM_ARR ::::: ', NUM_ARR);
  const CARD_STR = NUM_ARR.join();
  console.log('CARD_STR :::::::::: ', CARD_STR);
  request('requestMakeCard', { list: CARD_STR });


  console.log('카드 새로 만듬');


  /*
  // const cardNum = window.sessionStorage.getItem('cardNum');
  // if (cardNum !== null && JSON.parse(cardNum).length > 0) return;
  // sessionStorage cardNum key 찾기
  const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]); // cardNum
  const decryptVal = window.sessionStorage.getItem(encryptKey);

  // if (decryptVal !== null && JSON.parse(decryptVal).length > 0) return;
  // cardNum은 배열이 아니고 text 문자열
  if (decryptVal !== null && decryptVal !== '') return;

  const encryptCardNumbers = new Promise(async (resolve, reject) => {
    const NUM_ARR = await encryptCardNumber();
    resolve(NUM_ARR);
    // setTimeout(() => {
    //   resolve(encryptCardNumber());
    // }, timeInterval_1);
  });
  encryptCardNumbers
    .then((numArr) => {
      if (numArr) {
        const CARD_STR = numArr.join(); // 'a, b, c'
        const CARD_ARR = CARD_STR.split(','); // ['a', 'b', 'c']

        console.log('CARD_STR :::::::::: ', CARD_STR);


        // storageMethod('s', 'SET_ITEM', 'cardNum', JSON.stringify(numArr));
        // storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(numArr));
        request('requestMakeCard', { list: CARD_STR });
      }
    })
    .catch((err) => {
      console.log('error encryptCardNumbers');
      errorManagement({ errCase: 'errorComn' });
    });
  */
};
