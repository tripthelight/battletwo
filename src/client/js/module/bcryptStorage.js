import storageMethod from '@/client/js/module/storage/storageMethod';
import bcrypt from 'bcryptjs';

export const BCRYPY_STORAGE = {
  // 암호화
  encryption: (_param) => {
    return new Promise(async (resolve, reject) => {
      const hashedParam = async (_param) => {
        const saltRounds = 3;
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(_param, salt);
      };

      const PARAM = await hashedParam(_param);
      resolve(PARAM);
    });
  },
  // 키 복호화
  decryptionKey: async (_envKey) => {
    const allKeys = Object.keys(sessionStorage);

    for (const key of allKeys) {
      try {
        const match = await bcrypt.compare(_envKey, key);
        if (match) {
          // console.log('일치: ', key);
          // console.log('일치: ', _envKey);
          return key; // 매칭된 key 반환
          // return _envKey; // 매칭된 _envKey 반환
        }
      } catch (error) {
        console.error('검증 오류:', error);
      }
    }

    console.log('일치하는 키 없음');
    return null;
  },
  // value 복호화
  decryptionVal: async (_value, _state) => {
    // TEST: 숫자 0~40까지 테스트 해봄
    const nums = Array.from({ length: 41 }, (_, i) => i.toString()); // ['0', ..., '40']
    const gameNames = ['indianPocker'];
    let res = null;

    if (_state === 'NM') {
      for (const num of nums) {
        try {
          const match = await bcrypt.compare(num, _value);
          if (match) {
            res = num;
            return num; // 일치하는 숫자를 문자열로 반환
          }
        } catch (error) {
          console.error('검증 오류:', error);
        }
      }
    } else if (_state === 'GN') {
      for (const gameName of gameNames) {
        try {
          const match = await bcrypt.compare(gameName, _value);
          if (match) {
            res = gameName;
            return gameName;
          }
        } catch (error) {
          console.error('검증 오류:', error);
        }
      }
    }
    if (res) return res;

    console.log('일치하는 값 없음');
    return null;
  },
  // TEST: 암복호화 테스트 코드
  test: async () => {
    const encryptKey = await BCRYPY_STORAGE.encryption(process.env.KEY_CARD_NUM);
    const encryptValue = await BCRYPY_STORAGE.encryption('39');
    storageMethod('s', 'SET_ITEM', encryptKey, encryptValue);

    const decryptKey = await BCRYPY_STORAGE.decryptionKey(process.env.KEY_CARD_NUM);
    console.log('decryptKey >>>>>>>>> ', decryptKey);

    const encryptedValue = sessionStorage.getItem(decryptKey);
    const decryptValue = await BCRYPY_STORAGE.decryptionVal(encryptedValue, 'NM');
    console.log('decryptValue >>>>>>>>> ', decryptValue);
  },
};
