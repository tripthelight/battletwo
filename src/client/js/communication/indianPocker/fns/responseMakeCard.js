import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default (cardList) => {
  const encryptKey = findCharCode([77, 68, 79, 88, 73, 86, 69, 70, 65, 80]);
  const decryptVal = window.sessionStorage.getItem(encryptKey);
  if (decryptVal !== null && JSON.parse(decryptVal).length > 0) return;
  storageMethod('s', 'SET_ITEM', encryptKey, cardList.split(','));
};
