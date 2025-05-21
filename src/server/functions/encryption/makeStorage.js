import obfuscationList from './obfuscationList.js';
import uniqueCodeByTime from './uniqueCodeByTime.js';
import transformWithCRC32 from './transformWithCRC32.js';
import convertStructure from './convertStructure.js';

const objkeypair = {
  newPair: '',
  oldPair: '',
  flagPair: '',
};

export const MAKE_STORAGE = {
  indianPocker: async () => {
    if (objkeypair.newPair === '') {
      objkeypair.newPair = uniqueCodeByTime();
      objkeypair.oldPair = objkeypair.newPair;
    }

    if (objkeypair.oldPair !== '') {
      objkeypair.oldPair = objkeypair.newPair;
      objkeypair.newPair = uniqueCodeByTime();
    }

    return {
      storageData: convertStructure(transformWithCRC32(obfuscationList.indianPocker, objkeypair.newPair)),
      keypair: objkeypair.newPair,
      oldKeypair: objkeypair.oldPair,
    };
  },
  functions: () => {
    return {
      indianPocker: MAKE_STORAGE.indianPocker,
    };
  },
  findGame: async (_gameName) => {
    const funcMap = MAKE_STORAGE.functions();
    if (typeof funcMap[_gameName] === 'function' && obfuscationList[_gameName]) {
      return await funcMap[_gameName]();
    }

    return {};
  },
};
