import obfuscationList from './obfuscationList.js';
import uniqueCodeByTimeCRC32 from './uniqueCodeByTimeCRC32.js';
import uniqueCodeByTimeAES from './uniqueCodeByTimeAES.js';
import transformWithCRC32 from './transformWithCRC32.js';
import transformWithAES from './transformWithAES.js';
import convertStructure from './convertStructure.js';

/*
const objkeypair = {
  newPair: '',
  oldPair: '',
  flagPair: '',
};
*/

export const MAKE_STORAGE = {
  indianPocker: async () => {
    /*
    if (objkeypair.newPair === '') {
      objkeypair.newPair = uniqueCodeByTime();
      objkeypair.oldPair = objkeypair.newPair;
    }

    if (objkeypair.oldPair !== '') {
      objkeypair.oldPair = objkeypair.newPair;
      objkeypair.newPair = uniqueCodeByTime();
    }
    */

    // const keypair = uniqueCodeByTimeAES();
    // const storageData = convertStructure(transformWithAES(obfuscationList.indianPocker, keypair));
    const keypair = uniqueCodeByTimeCRC32();
    const storageData = convertStructure(transformWithCRC32(obfuscationList.indianPocker, keypair));

    return {
      storageData: storageData,
      keypair: keypair,
      // storageData: convertStructure(transformWithCRC32(obfuscationList.indianPocker, objkeypair.newPair)),
      // keypair: objkeypair.newPair,
      // oldpair: objkeypair.oldPair,
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
