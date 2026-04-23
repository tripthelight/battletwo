import CryptoJS from 'crypto-js';
import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import { KEY } from '@/client/js/module/webRTC/connectSignaling';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import { dec, enc } from '@/client/js/module/crypts/obf8lower';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import _t from '@/client/js/module/crypts/textDE';
import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';

export const BW_KEYS = {
  round: () => findCharCode([77, 84, 83, 88, 69, 85, 82, 87, 90, 79]),
  result: () => findCharCode([71, 73, 69, 77, 83, 78, 89, 88, 82, 66]),
  enemyNick: () => findCharCode([77, 74, 67, 72, 65, 68, 80, 85, 84, 90]),
};

const privateKey = (label) => {
  const key = KEY?.prk ?? null;
  if (!key) throw throwObj('errorComn', `${label} - decrypt key failed.`);
  return key;
};

const numConst = (arr) => dec(enc(encryptNumOfStr(_t(arr))));

export const RESULT_NUM = {
  lose: () => numConst([101, 101, 101, 119, 119, 119, 119, 119]), // 0
  win: () => numConst([101, 101, 101, 119, 119, 119, 119, 98]), // 1
  drew: () => numConst([119, 119, 119, 101, 101, 101, 101, 112]), // 2
};

const parseLegacyResultList = (value) => {
  const quotedKeys = value.replace(/([{,]\s*)([A-Za-z_$][\w$]*)\s*:/g, '$1"$2":');
  const quotedValues = quotedKeys.replace(/'([^']*)'/g, '"$1"');
  return JSON.parse(quotedValues);
};

const normalizeResultList = (list) => {
  if (!Array.isArray(list)) {
    throw throwObj('sessionStorageLoss', 'round result list failed.');
  }

  return list.map((item) => {
    const round = Number(item?.round);
    const result = item?.result;

    if (!Number.isInteger(round) || round < 1 || round > 9 || typeof result !== 'string') {
      throw throwObj('sessionStorageLoss', 'round result item failed.');
    }

    dec(result);
    return { round, result };
  });
};

export const loadRoundResults = () => {
  const encryptedValue = storageMethod('s', 'GET_ITEM', BW_KEYS.result());
  if (encryptedValue === null || encryptedValue === '') return [];

  const decrypted = CryptoJS.AES
    .decrypt(encryptedValue, privateKey('roundResultStorage'))
    .toString(CryptoJS.enc.Utf8);

  if (decrypted === '') {
    throw throwObj('sessionStorageLoss', 'roundResultStorage - result decrypt value failed.');
  }

  try {
    return normalizeResultList(JSON.parse(decrypted));
  } catch (error) {
    if (error?.errCase === 'sessionStorageLoss') throw error;
    return normalizeResultList(parseLegacyResultList(decrypted));
  }
};

export const saveRoundResults = (results) => {
  const normalized = normalizeResultList(results);
  const encryptedValue = CryptoJS.AES
    .encrypt(JSON.stringify(normalized), privateKey('roundResultStorage'))
    .toString();

  storageMethod('s', 'SET_ITEM', BW_KEYS.result(), encryptedValue);
  return normalized;
};

export const getCurrentRound = (fallback = 1) => {
  const encryptedValue = storageMethod('s', 'GET_ITEM', BW_KEYS.round());
  if (encryptedValue === null || encryptedValue === '') return fallback;

  const round = dec(encryptedValue);
  if (!Number.isInteger(round) || round < 1 || round > 10) {
    throw throwObj('sessionStorageLoss', 'roundResultStorage - round value failed.');
  }

  return round;
};

export const scoreFromResults = (results = loadRoundResults()) => {
  return results.reduce(
    (score, item) => {
      const result = dec(item.result);

      if (result === RESULT_NUM.win()) score.player += 1;
      if (result === RESULT_NUM.lose()) score.enemy += 1;

      return score;
    },
    { player: 0, enemy: 0 }
  );
};

export const decodeNicknamePayload = (payload) => {
  if (!payload) return '';

  try {
    return fromUnicodePoints(parsePayloadToHex(payload));
  } catch {
    return '';
  }
};

export const getDisplayNames = () => ({
  player: decodeNicknamePayload(storageMethod('l', 'GET_ITEM', 'localPlayer')),
  enemy: decodeNicknamePayload(storageMethod('s', 'GET_ITEM', BW_KEYS.enemyNick())),
});

