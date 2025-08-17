import storageMethod from '@/client/js/module/storage/storageMethod';
import encryptCardNumber from '@/client/js/views/game/indianPocker/fns/common/makeCard/encryptCardNumber';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default async () => {
  try {
    const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]); // cardNum
    const decryptVal = window.sessionStorage.getItem(encryptKey);
    if (decryptVal !== null && JSON.parse(decryptVal).length > 0) {
      console.log('이미 만들어진 카드 있음');
      return;
    };

    const NUM_ARR = await encryptCardNumber();
    storageMethod('s', 'SET_ITEM', encryptKey, JSON.stringify(NUM_ARR));
    console.log('카드 새로 만듬');
  } catch (error) {
    throw {
      ...throwObj(
        error?.errCase ?? 'cardNum',
        error?.message ?? 'make card error.'
      ),
      errorDetails: error
    };
  };
};
