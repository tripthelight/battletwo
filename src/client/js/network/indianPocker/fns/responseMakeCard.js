import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default (cardList) => {
  console.log('cardList =========> ', cardList);

  const encryptKey = findCharCode([80, 76, 72, 71, 86, 73, 69, 66, 78, 81]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (decryptVal !== null && JSON.parse(decryptVal).length > 0) return;
  storageMethod('s', 'SET_ITEM', encryptKey, cardList.split(','));
};
