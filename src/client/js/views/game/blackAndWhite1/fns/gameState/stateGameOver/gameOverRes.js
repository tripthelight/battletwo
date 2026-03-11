import throwObj from '@/client/js/module/errorHandler/throwObj';
import { comnText } from '@/client/js/functions/language';

export default (result) => {
  try {
    switch (result) {
      case new TextDecoder().decode(new Uint8Array([119, 105, 110])): // "win"
        return comnText.win;
      case new TextDecoder().decode(new Uint8Array([108, 111, 115, 101])): // "lose"
        return comnText.die;
      case new TextDecoder().decode(new Uint8Array([100, 114, 101, 119])): // "drew"
        return comnText.drew;

      default: throw throwObj('dataManipulation', 'gameOverRes - result data failed.');
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'gameOverRes.js error'
    );
  }
};
