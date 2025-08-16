import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default function (_key) {
  try {
    const encryptKey = findCharCode(_key);
    const encryptval = window.sessionStorage.getItem(encryptKey);
    if (encryptval === null) {
      throw throwObj('sessionStorageLoss', 'boolean sessionStorage not found.');
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
          throw throwObj('sessionStorageLoss', 'boolean sessionStorage value error.');
        };
      }
    };
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'sessionStorageLoss',
      error?.message ?? `sessionStorage boolean another error.`
    );
  };
};
