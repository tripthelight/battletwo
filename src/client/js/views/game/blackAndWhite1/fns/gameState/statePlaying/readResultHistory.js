import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';

/**
 * sessionStorage에 AES로 저장된 Round 결과 이력을 읽는다.
 *
 * 결과가 아직 없는 최초 playing 진입에서는 빈 배열을 반환한다.
 * 복호화/구조 검증은 한 곳에서만 수행하여 scoreAssignment와 reload UI 복구가
 * 동일한 데이터를 사용하도록 한다.
 *
 * @returns {Array<{round: number, result: string}>}
 */
export default function readResultHistory() {
  const privateKey = KEY?.prk ?? null;

  if (!privateKey) {
    throw throwObj(
      'errorComn',
      'readResultHistory - decrypt key failed.'
    );
  }

  const resultKey = findCharCode([
    71, 73, 69, 77, 83, 78, 89, 88, 82, 66,
  ]); // result

  const encryptedResult = storageMethod(
    's',
    'GET_ITEM',
    resultKey
  );

  if (encryptedResult === null || encryptedResult === '') {
    return [];
  }

  const bytes = CryptoJS.AES.decrypt(
    encryptedResult,
    privateKey
  );

  const decrypted = bytes.toString(
    CryptoJS.enc.Utf8
  );

  if (decrypted === '') {
    throw throwObj(
      'sessionStorageLoss',
      'readResultHistory - decrypt value failed.'
    );
  }

  try {
    // 기존 저장 포맷: [{round:1,result:'...'}]
    // JSON parser를 재사용할 수 있도록 key/value quote만 복구한다.
    let jsonStr = decrypted.replace(
      /(\w+)\s*:/g,
      '"$1":'
    );

    jsonStr = jsonStr.replace(
      /'([^']*)'/g,
      '"$1"'
    );

    const resultHistory = JSON.parse(jsonStr);

    if (!Array.isArray(resultHistory)) {
      throw new Error('result history is not an array');
    }

    for (const item of resultHistory) {
      if (
        !item ||
        !Number.isInteger(item.round) ||
        item.round < 1 ||
        item.round > 10 ||
        typeof item.result !== 'string' ||
        item.result.length === 0
      ) {
        throw new Error('invalid result history item');
      }
    }

    return resultHistory;
  } catch (error) {
    throw throwObj(
      'sessionStorageLoss',
      `readResultHistory - invalid result data: ${error.message}`
    );
  }
}
