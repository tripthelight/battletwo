import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import NumToCube from '@/client/js/views/game/blackAndWhite1/fns/common/NumToCube';

export const afterPlayerNumKey = () => (
  findCharCode([86, 65, 82, 73, 75, 79, 81, 83, 88, 76]) // afterPlayerNum
);

export const hasAfterPlayerNum = () => {
  const value = storageMethod('s', 'GET_ITEM', afterPlayerNumKey());
  return value !== null && value !== '';
};

export const saveAfterPlayerNum = (num) => {
  const cubeNum = Number(num);
  if (!Number.isInteger(cubeNum) || cubeNum < 0 || cubeNum > 8) {
    throw throwObj('dataManipulation', 'afterPlayerNum - cube number failed.');
  }

  storageMethod('s', 'SET_ITEM', afterPlayerNumKey(), NumToCube(cubeNum));
};

export const clearAfterPlayerNum = () => {
  storageMethod('s', 'EMPTY_VALUE', afterPlayerNumKey());
};
