import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';

export default () => {
  const encryptKey1 = findCharCode([73, 71, 65, 80, 77, 75, 84, 66, 85, 82]); // activeUser
  const encryptVal1 = storageMethod("s", "GET_ITEM", encryptKey1);
  if (encryptVal1 === storageMethod("l", "GET_ITEM", "localPlayer")) return true;

  // const FIRST_USER = window.sessionStorage.getItem("activeUser");
  // const USER = window.localStorage.getItem("uid");
  // if (FIRST_USER === USER) return true;

  return false;
};
