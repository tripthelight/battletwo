import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';

export default (_num) => {
  // const NAMES = window.sessionStorage.rns;
  // if (!NAMES) return throwObj("sessionStorageLoss", "rns stroage failed.");

  const encryptKey1 = findCharCode([66, 84, 88, 72, 79, 73, 82, 76, 85, 77]); // rns
  const encryptVal1 = storageMethod('s', 'GET_ITEM', encryptKey1);
  if (!encryptVal1) throw throwObj('sessionStorageLoss', "findRandomName.js - rns failed.");
  const ARR = JSON.parse(encryptVal1);
  switch (_num) {
    case 0:
      return ARR[0];
    case 1:
      return ARR[1];
    case 2:
      return ARR[2];
    case 3:
      return ARR[3];
    case 4:
      return ARR[4];
    case 5:
      return ARR[5];
    default:
      break;
  }
};
