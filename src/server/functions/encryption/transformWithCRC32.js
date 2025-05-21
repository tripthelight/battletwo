import CRC32 from 'crc-32';

// indianPocker 안의 모든 value에 uniqueCodeByTime() 값 붙이기
export default (obj, keypair) => {
  const result = {};

  for (const key in obj) {
    const entry = obj[key];
    const newEntry = {};

    // k 처리
    if (entry.k) {
      const concatK = entry.k + keypair;
      newEntry.k = (CRC32.str(concatK) >>> 0).toString(16); // 양수로 변환
    }

    // v 처리
    if (typeof entry.v === 'string') {
      const concatV = entry.v + keypair;
      newEntry.v = (CRC32.str(concatV) >>> 0).toString(16); // 양수로 변환
    } else if (typeof entry.v === 'object') {
      const nested = {};
      for (const innerKey in entry.v) {
        const concatInner = entry.v[innerKey] + keypair;
        nested[innerKey] = (CRC32.str(concatInner) >>> 0).toString(16); // 양수로 변환
      }
      newEntry.v = nested;
    }

    result[key] = newEntry;
  }

  return result;
};
