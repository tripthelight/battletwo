import findCharCode from '@/client/js/functions/findCharCode';

export default function (_key) {
  try {
    const encryptKey = findCharCode(_key);
    const encryptval = window.sessionStorage.getItem(encryptKey);
    if (encryptval === null) {
      throw { errCase: 'sessionStorageLoss', message: `boolean sessionStorage not found.` };
    } else {
      if (encryptval === '') {
        return '';
      } else {
        if (
          encryptval === findCharCode([69, 67, 72, 65, 74, 68, 73, 80, 66, 75]) || // true
          encryptval === findCharCode([70, 74, 89, 84, 79, 75, 88, 87, 85, 78]) // false
        ) {
          return encryptval;
        } else {
          throw {
            errCase: 'sessionStorageLoss',
            message: 'local peer boolean sessionStorage value error.',
            sendMsg: 'remote peer boolean sessionStorage value error.'
          };
        };
      }
    };
  } catch (error) {
    throw {
      errCase: error?.errCase ?? 'sessionStorageLoss',
      message: error?.message ?? `local peer sessionStorage boolean another error.`,
      sendMsg: error?.sendMsg ?? `remote peer sessionStorage boolean another error.`,
    };
  }
}
