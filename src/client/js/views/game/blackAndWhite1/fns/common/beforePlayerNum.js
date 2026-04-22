import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import { request } from '@/client/js/network/blackAndWhite1/request';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import NumToCube from '@/client/js/views/game/blackAndWhite1/fns/common/NumToCube';
import { encodeMoveIndex } from '@/client/js/views/game/blackAndWhite1/fns/common/movePayload';

export default (num, index) => {
  try {
    const cubeNum = Number(num);
    if (!Number.isInteger(cubeNum) || cubeNum < 0 || cubeNum > 8) {
      throw throwObj('dataManipulation', 'beforePlayerNum - cube number failed.');
    }

    storageMethod(
      's',
      'SET_ITEM',
      findCharCode([65, 69, 68, 79, 82, 85, 78, 80, 90, 75]), // beforePlayerNum
      NumToCube(cubeNum)
    );

    request('beforePlayerNumber', { indexCode: encodeMoveIndex(index) });
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'beforePlayerNum.js error'
    );
  }
};
