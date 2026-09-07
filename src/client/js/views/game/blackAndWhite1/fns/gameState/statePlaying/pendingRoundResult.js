import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import { dec } from '@/client/js/module/crypts/obf8lower';
import throwObj from '@/client/js/module/errorHandler/throwObj';

const pendingResultKey = () => (
  findCharCode([88, 72, 85, 67, 81, 90, 69, 77, 82, 74]) // pendingRoundResult
);

const roundKey = () => (
  findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]) // round
);

const getPrivateKey = (label) => {
  const privateKey = KEY?.prk ?? null;

  if (!privateKey) {
    throw throwObj(
      'errorComn',
      `${label} - encrypt key failed.`
    );
  }

  return privateKey;
};

const validateResult = (result) => {
  if (typeof result !== 'string' || result.length === 0) {
    throw throwObj(
      'dataManipulation',
      'pendingRoundResult - result failed.'
    );
  }

  const resultValue = dec(result);

  if (![0, 1, 2].includes(resultValue)) {
    throw throwObj(
      'dataManipulation',
      'pendingRoundResult - result value failed.'
    );
  }

  return resultValue;
};

export const getCurrentRoundNumber = () => {
  const encryptedRound = storageMethod('s', 'GET_ITEM', roundKey());

  if (encryptedRound === null || encryptedRound === '') {
    throw throwObj(
      'sessionStorageLoss',
      'pendingRoundResult - round failed.'
    );
  }

  const round = dec(encryptedRound);

  if (!Number.isInteger(round) || round < 1 || round > 10) {
    throw throwObj(
      'sessionStorageLoss',
      'pendingRoundResult - round value failed.'
    );
  }

  return round;
};

export const loadPendingRoundResult = () => {
  const encryptedValue = storageMethod(
    's',
    'GET_ITEM',
    pendingResultKey()
  );

  if (encryptedValue === null || encryptedValue === '') return null;

  const decrypted = CryptoJS.AES.decrypt(
    encryptedValue,
    getPrivateKey('loadPendingRoundResult')
  ).toString(CryptoJS.enc.Utf8);

  if (decrypted === '') {
    throw throwObj(
      'sessionStorageLoss',
      'pendingRoundResult - decrypt value failed.'
    );
  }

  try {
    const parsed = JSON.parse(decrypted);
    const round = Number(parsed?.round);
    const result = parsed?.result;

    if (!Number.isInteger(round) || round < 1 || round > 9) {
      throw new Error('invalid pending round');
    }

    validateResult(result);

    return { round, result };
  } catch (error) {
    if (error?.errCase) throw error;

    throw throwObj(
      'sessionStorageLoss',
      `pendingRoundResult - invalid data: ${error.message}`
    );
  }
};

export const savePendingRoundResult = (
  result,
  round = getCurrentRoundNumber()
) => {
  validateResult(result);

  if (!Number.isInteger(round) || round < 1 || round > 9) {
    throw throwObj(
      'sessionStorageLoss',
      'pendingRoundResult - save round failed.'
    );
  }

  const existing = loadPendingRoundResult();

  if (existing) {
    if (
      existing.round !== round ||
      dec(existing.result) !== dec(result)
    ) {
      throw throwObj(
        'dataManipulation',
        'pendingRoundResult - conflicting result.'
      );
    }

    return existing;
  }

  const pending = { round, result };
  const encryptedValue = CryptoJS.AES.encrypt(
    JSON.stringify(pending),
    getPrivateKey('savePendingRoundResult')
  ).toString();

  storageMethod(
    's',
    'SET_ITEM',
    pendingResultKey(),
    encryptedValue
  );

  return pending;
};

export const clearPendingRoundResult = (round = null) => {
  const pending = loadPendingRoundResult();
  if (!pending) return false;

  if (round !== null && pending.round !== round) return false;

  storageMethod('s', 'EMPTY_VALUE', pendingResultKey());
  return true;
};
