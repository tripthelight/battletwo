import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const encryptKey1 = findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]); // firstUser
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  const encryptVal2 = storageMethod("l", "GET_ITEM", "localPlayer");
  if (encryptVal1 === encryptVal2) return true;

  // const FIRST_USER = window.sessionStorage.getItem("firstUser");
  // const USER = window.localStorage.getItem("uid");
  // if (FIRST_USER === USER) return true;

  return false;
};
