import CRC32 from 'crc-32';
import CryptoJS from 'crypto-js';

// indianPocker 안의 모든 value에 uniqueCodeByTime() 값 붙이기
export default (obj, keypair) => {
  const cryptoException = (str) => ['SXIEUDBLPN'].includes(str); // AES secret key일 경우 hash 생성 안함
  // TNUFGJXDCM: CARD_NUMS | OQTDZWUGXS: COIN_NUMS
  const numsException = (str) => ['TNUFGJXDCM', 'OQTDZWUGXS'].includes(str); // NUMS의 v는 shuffle

  const result = {};

  for (const key in obj) {
    const entry = obj[key]; // k, v
    const newEntry = {};

    // k 처리
    if (entry.k) {
      const concatK = entry.k + keypair;
      newEntry.k = (CRC32.str(concatK) >>> 0).toString(16); // 양수로 변환
    }

    // v 처리
    if (typeof entry.v === 'string') {
      if (cryptoException(entry.k)) {
        newEntry.v = entry.v;
      } else {
        const concatV = entry.v + keypair;
        newEntry.v = (CRC32.str(concatV) >>> 0).toString(16); // 양수로 변환
      }
    } else if (typeof entry.v === 'object') {
      const nested = {};

      if (numsException(entry.k)) {
        // 1. 객체 -> [key, value] 배열로 변환
        const numsArr = Object.entries(entry.v);
        // 2. 배열을 무작위로 섞기 (Fisher-Yates Shuffle)
        const numsShuffled = numsArr
          .map((v) => v) // 원본 복사
          .sort(() => Math.random() - 0.5);
        // 3. 섞인 배열을 객체로 다시 변환
        const newNumsObj = Object.fromEntries(numsShuffled);

        for (const innerKey in newNumsObj) {
          const concatInner = entry.v[innerKey] + keypair;
          nested[innerKey] = (CRC32.str(concatInner) >>> 0).toString(16); // 양수로 변환
        }
      } else {
        for (const innerKey in entry.v) {
          const concatInner = entry.v[innerKey] + keypair;
          nested[innerKey] = (CRC32.str(concatInner) >>> 0).toString(16); // 양수로 변환
        }
      }
      newEntry.v = nested;
    }

    result[key] = newEntry;
  }

  return result;
};
