import throwObj from '@/client/js/module/errorHandler/throwObj';
import { obfuscateInt32, deobfuscateInt32 } from '@/client/js/module/crypts/encryptNumber';
import NumToCube from '@/client/js/views/game/blackAndWhite1/fns/common/NumToCube';
import MatchCubeNum from '@/client/js/views/game/blackAndWhite1/fns/common/MatchCubeNum';
import publicCubeToNum from '@/client/js/views/game/blackAndWhite1/fns/common/publicCubeToNum';

const assertCubeNum = (value, label) => {
  const num = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(num) || num < 0 || num > 8) {
    throw throwObj('dataManipulation', `${label} - cube number failed.`);
  }
  return num;
};

const assertCubeIndex = (value, label) => {
  const index = typeof value === 'number' ? value : Number(value);
  if (!Number.isInteger(index) || index < 0 || index > 8) {
    throw throwObj('dataManipulation', `${label} - cube index failed.`);
  }
  return index;
};

export const encodeMoveIndex = (index) => {
  return obfuscateInt32(assertCubeIndex(index, 'encodeMoveIndex'));
};

export const decodeMoveIndex = (data, label) => {
  if (data?.indexCode !== undefined && data?.indexCode !== null && data?.indexCode !== '') {
    return assertCubeIndex(deobfuscateInt32(data.indexCode), label);
  }

  return assertCubeIndex(data?.index, label);
};

export const encodeCubeNumberForRemote = (num) => {
  const cubeNum = assertCubeNum(num, 'encodeCubeNumberForRemote');
  return MatchCubeNum(NumToCube(cubeNum));
};

export const decodeCubeNumberFromRemote = (data, label) => {
  const code = data?.numCode;
  if (code !== undefined && code !== null && code !== '') {
    return assertCubeNum(publicCubeToNum(code), label);
  }

  const legacyNum = data?.num;
  if (typeof legacyNum === 'string' && legacyNum.trim() !== '') {
    try {
      return assertCubeNum(publicCubeToNum(legacyNum), label);
    } catch (error) {
      return assertCubeNum(legacyNum, label);
    }
  }

  return assertCubeNum(legacyNum, label);
};
