import gameList from '@/client/js/functions/gameList';
import storageMethod from '@/client/js/module/storage/storageMethod';
import bcrypt from 'bcryptjs';

/**
 * 문자열 암호화 함수
 * @param {string} _param
 * @returns {Promise<string>} 해시된 문자열
 */
async function encryption(_param) {
  const saltRounds = 3;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(_param, salt);
}

/**
 * 문자열 복호화 함수
 * @param {string} _decryptStr 비교 대상
 * @param {string} _encryptStr 암호화된 문자
 * @returns {boolean} 암호화된 문자와 비교대상이 일치하면 true
 */
async function decryption(_decryptStr, _encryptStr) {
  const match = await bcrypt.compare(_encryptStr, _decryptStr);
  if (match) {
    return true;
  }
  return false;
}

/**
 * GAME_NAME 찾는 함수
 * @param {string} _encryptStr 암호화된 문자
 * @returns {string|null} 암호화된 문자와 비교대상이 일치하면 true
 */
async function decryptionGameName(_encryptStr) {
  for (const gameName of gameList) {
    try {
      const match = await bcrypt.compare(gameName, _encryptStr);
      if (match) {
        return gameName; // 일치하는 gameName
      }
    } catch (error) {
      console.error('검증 오류 decryptionGameName :', error);
      return null;
    }
  }
  return null;
}

/**
 * 현재 sessionStorage에 파라미터로 받은 _envKey가 있는지 체크
 * @param {string} _envKey env에 등록한 sessionStorage key name
 * @returns {boolean} 일치하는 _envKey키가 있을 경우 true
 */
async function findSessionStorageKey(_envKey) {
  const allKeys = Object.keys(sessionStorage);
  for (const key of allKeys) {
    try {
      const match = await bcrypt.compare(_envKey, key);
      if (match) return true; // 일치하는 키 있음
    } catch (error) {
      console.error('검증 오류 findSessionStorageKey :', error);
      return false;
    }
  }
  // 일치하는 키 없음
  return false;
}

/**
 * 현재 sessionStorage에 파라미터로 받은 _envKey의 value가 있는지 체크
 * @param {string} _envKey env에 등록한 sessionStorage key name
 * @returns {boolean} 일치하는 _envKey키가 있고 키의 value가 있을 경우 true
 */
async function findSessionStorageVal(_envKey) {
  const allKeys = Object.keys(sessionStorage);
  for (const key of allKeys) {
    try {
      const match = await bcrypt.compare(_envKey, key);
      if (match && window.sessionStorage.getItem(key) !== null) {
        return true; // 일치하는 키의 value 있음
      }
    } catch (error) {
      console.error('검증 오류 findSessionStorageVal :', error);
      return false;
    }
  }
  // 일치하는 키 없음
  return false;
}

/**
 * 현재 sessionStorage에 파라미터로 받은 _envKey의 value를 리턴
 * @param {string} _envKey env에 등록한 sessionStorage key name
 * @returns {string|number|object|null} 일치하는 _envKey키가 있고 키의 value가 있을 경우 value를 리턴
 */
async function returnSessionStorageVal(_envKey) {
  const allKeys = Object.keys(sessionStorage);
  for (const key of allKeys) {
    try {
      const match = await bcrypt.compare(_envKey, key);
      if (match && window.sessionStorage.getItem(key) !== null) {
        return window.sessionStorage.getItem(key); // 일치하는 키의 value 를 리턴
      }
    } catch (error) {
      console.error('검증 오류 returnSessionStorageVal :', error);
      return null;
    }
  }
  // 일치하는 키 없음
  return null;
}

/**
 *
 * @param {string} _encryptVal 암호화한 value
 * @param {string} _originVal 비교 대상
 * @returns {boolean} _encryptVal와 _originVal이 일치하면 true
 */
async function compareDecryptionKey(_encryptVal, _originVal) {
  const match = await bcrypt.compare(_originVal, _encryptVal);
  if (match) {
    return true;
  }
  return false;
}

/**
 *
 * @param {string} _originKey 암호화 안된 key
 * @param {string} _originVal 비교 대상
 * @returns {boolean} _originKey와 _originVal이 일치하면 true
 */
async function compareStorageKeyVal(_originKey, _originVal) {
  const allKeys = Object.keys(sessionStorage);
  for (const key of allKeys) {
    try {
      const matchKey = await bcrypt.compare(_originKey, key);
      if (matchKey) {
        const val = window.sessionStorage.getItem(key);
        const matchVal = await bcrypt.compare(_originVal, val);
        if (matchVal) {
          return true; // 일치하는 key에 일치하는 value 있음
        }
      }
    } catch (error) {
      console.error('검증 오류 findSessionStorageKey :', error);
      return false;
    }
  }
  return false;
}

/**
 * 카드번호 테스트
 */
async function bcryptCardTest() {
  const allKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const allNumbs = ['e442c0d4', 'd52eebb2', '87e79ad', '1c66315a', '21c0ff12', 'f479d3fc', '7d7dda45', '499adcbe', '59b8324c', '77fdea28'];
  const allCards = [
    '$2b$04$fgoFdfwm.UDwTO5DE5/kRO/KhQovbXTIQmaLnnuvRquGOpBuEhxly',
    '$2b$04$QQpd4IOOtaUMPDeK15.kteKPlzjeZPF8LSP6i.yegwVTLrf0.i34y',
    '$2b$04$6u6uvurZhhWnpSjbR6DlZu4Q1CYHrjBU5thtaFj0V6/iTUEFj9Rb2',
    '$2b$04$2WPtlPVIqoo5V7UvnWGX6.o/dKiWgghwX/AWwS9zsSFkenMQBnLa.',
    '$2b$04$51tvbeJ3KsG5xkm8B2K2TuezT1XZwobY1sXMwD6/LmkJJNWe.n2yy',
    '$2b$04$T1SBSye3LkcTojAZhtsa5.ZwDFWtIGOohUK0gRQVpS.6Jc/r7qg8O',
    '$2b$04$T16YrgfwatoWuc6bo0rB6.81KfDqWULYMJnWcSBZrR74GSCgu1hae',
    '$2b$04$D2ZM3vdTk.pjTlbjVC1zXeyiu4/LwtueQa.PUvzndIiOGJGA5W3pe',
    '$2b$04$v7U7u6qaASBFUufRFWWvGewdJ1mWL7oHb2P6duG6/pXZH3E5UVM92',
    '$2b$04$tGbINDuWacEXPPzMD17YnOcsSvjSgqHUW.7nix9xRL0J.xYby/5I2',
    '$2b$04$EdQlSwGG5kuIdtwK3pG0FOcQUhdUZK1VlZwRLE2ko//oBy3A.MHMW',
    '$2b$04$m1nMAGop26YafeTdVvGsL.CWKG4fkBD1DhYgwIvtnz900Udul.8rK',
    '$2b$04$3W4qMR4zMeDHRo3beTt27ev/o1vIewr9tcz1PG7YcyqnPHZtTFj5.',
    '$2b$04$BfpWFzt.IRcAVW.d1QY2pON0CW3PqN6v9hP1urH6S2by5MS7SNhx6',
    '$2b$04$mkDauvnfvQlCpWnbXaaxte0rh5x7iOVQJb2E9W7rs57LfxsxIjfxu',
    '$2b$04$PDTcZievju8cubnPkJIRWuMItuAxMk.Lyt/1y5thVg/4pq4m.qZUa',
    '$2b$04$ySuRgjMEEkRUbl/nPuHiR.umaC3aqDcZ9kbjdygBrxVScoddrFe8G',
    '$2b$04$UAwY5kYW.c7PW3OkXyZSIefo5p3glj.iQ8v/EMJsSSOd7/5FZOkR6',
    '$2b$04$CYtLNE8Eih7Z4x21Uf.y2us5WmE7KMCnY0ApJX/DNEhkYi5YeV/p.',
    '$2b$04$u4pKisZiCIKNte2ejC6Oqu9PsEFNzedFu2B4ZAnWgh.rSdmEOW80q',
  ];
  for (const key of allNumbs) {
    for (const card of allCards) {
      try {
        const match = await bcrypt.compare(key, card);
        if (match) {
          console.log('key >>>>>>>>>>>>>> ', key); // 1, 2, 3 ... 10 두번씩 찍힘
        }
      } catch (error) {
        console.error('검증 오류 bcryptCardTest :', error);
      }
    }
  }
}

export const BCRYPT_STORAGE = {
  encryption,
  decryption,
  decryptionGameName,
  findSessionStorageKey,
  findSessionStorageVal,
  returnSessionStorageVal,
  compareDecryptionKey,
  compareStorageKeyVal,
  bcryptCardTest,
};

/*
export const BCRYPT_STORAGE = {
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
  },*/
/**
 * 현재 sessionStorage에 파라미터로 받은 _envKey가 있는지 체크
 * @param {string} _envKey env에 등록한 sessionStorage key name
 * @returns {boolean} 일치하는 _envKey키가 있을 경우 true
 */
/*
  findSessionStorage: async (_envKey) => {
    const allKeys = Object.keys(sessionStorage);
    for (const key of allKeys) {
      try {
        const match = await bcrypt.compare(_envKey, key);
        if (match) {
          // 매칭된 key 반환
          return true;
        }
      } catch (error) {
        console.error('검증 오류 findSessionStorage :', error);
        return false;
      }
    }
    // 일치하는 키 없음
    return false;
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
    const encryptKey = await BCRYPT_STORAGE.encryption(process.env.KEY_INDIAN_POCKER_CARD_NUM);
    const encryptValue = await BCRYPT_STORAGE.encryption('39');
    storageMethod('s', 'SET_ITEM', encryptKey, encryptValue);

    const decryptKey = await BCRYPT_STORAGE.decryptionKey(process.env.KEY_INDIAN_POCKER_CARD_NUM);
    console.log('decryptKey >>>>>>>>> ', decryptKey);

    const encryptedValue = sessionStorage.getItem(decryptKey);
    const decryptValue = await BCRYPT_STORAGE.decryptionVal(encryptedValue, 'NM');
    console.log('decryptValue >>>>>>>>> ', decryptValue);
  },
};
*/
