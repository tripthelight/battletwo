import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import NumToCube from '@/client/js/views/game/blackAndWhite1/fns/common/NumToCube';
import cubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/cubeToNum';

export const afterPlayerNumKey = () => (
  findCharCode([86, 65, 82, 73, 75, 79, 81, 83, 88, 76]) // afterPlayerNum
);

export const hasAfterPlayerNum = () => {
  const value = storageMethod('s', 'GET_ITEM', afterPlayerNumKey());
  return value !== null && value !== '';
};

export const loadAfterPlayerNum = () => {
  const value = storageMethod('s', 'GET_ITEM', afterPlayerNumKey());
  if (value === null || value === '') return null;

  try {
    const num = cubeToNum(value);

    if (!Number.isInteger(num) || num < 0 || num > 8) {
      throw new Error('invalid after player cube');
    }

    return num;
  } catch (error) {
    throw throwObj(
      'sessionStorageLoss',
      `afterPlayerCube - invalid cube value: ${error.message}`
    );
  }
};

export const saveAfterPlayerNum = (num) => {
  const cubeNum = Number(num);

  if (!Number.isInteger(cubeNum) || cubeNum < 0 || cubeNum > 8) {
    throw throwObj(
      'dataManipulation',
      'afterPlayerCube - cube number failed.'
    );
  }

  const savedNum = loadAfterPlayerNum();

  // 동일 Round에서 같은 second move가 reliable retry로 다시 들어오는 것은 허용한다.
  // 다른 숫자로 덮어쓰는 것은 Round 상태가 깨진 것이므로 거부한다.
  if (savedNum !== null) {
    if (savedNum !== cubeNum) {
      throw throwObj(
        'dataManipulation',
        'afterPlayerCube - conflicting cube value.'
      );
    }

    return false;
  }

  storageMethod(
    's',
    'SET_ITEM',
    afterPlayerNumKey(),
    NumToCube(cubeNum)
  );

  return true;
};

export const clearAfterPlayerNum = () => {
  storageMethod('s', 'EMPTY_VALUE', afterPlayerNumKey());
};
