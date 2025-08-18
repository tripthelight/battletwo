import { obfuscationList } from './obfuscationList.js';
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
  indianPocker: async (_keypair) => {
    console.log('_keypair ::::::: ', _keypair);

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
    // const keypair = _keypair ? _keypair : uniqueCodeByTimeCRC32();
    const storageData = convertStructure(transformWithCRC32(obfuscationList.indianPocker(), _keypair));

    return {
      storageData: storageData,
      // keypair: keypair,
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
  findGame: async (_gameName, _gameCode) => {
    const funcMap = MAKE_STORAGE.functions();
    if (typeof funcMap[_gameName] === 'function' && obfuscationList[_gameName]) {
      return await funcMap[_gameName](_gameCode.replace(/\s+/g, '') // 1. 띄어쓰기 제거
                                        .replace(/[^a-zA-Z0-9가-힣]/g, '') // 2. 특수문자 제거
                                        .slice(-10) // 3. 맨 뒤 10자리));
                                      );
    }

    return {};
  },
};
