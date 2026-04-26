import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import findCharCode from '@/client/js/functions/findCharCode';
import findRandomName from '@/client/js/views/game/findTheSamePicture/fns/common/findRandomName';

const JSON_STORAGE_KEYS = {
  pn: [75, 79, 83, 78, 89, 82, 68, 69, 73, 86],
  en: [80, 82, 68, 73, 86, 85, 90, 66, 87, 71],
};

const readJsonSession = (key, message) => {
  const value = storageMethod('s', 'GET_ITEM', key);
  if (!value) throw throwObj('sessionStorageLoss', message);
  return JSON.parse(value);
};

const writeJsonSession = (key, value) => {
  storageMethod('s', 'SET_ITEM', key, JSON.stringify(value));
};

export const getPnArr = () => {
  return readJsonSession(
    findCharCode(JSON_STORAGE_KEYS.pn),
    'sessionState.js - pn failed.'
  );
};

export const setPnArr = (value) => {
  writeJsonSession(findCharCode(JSON_STORAGE_KEYS.pn), value);
};

export const getEnArr = () => {
  return readJsonSession(
    findCharCode(JSON_STORAGE_KEYS.en),
    'sessionState.js - en failed.'
  );
};

export const setEnArr = (value) => {
  writeJsonSession(findCharCode(JSON_STORAGE_KEYS.en), value);
};

export const getActiveList = () => {
  return readJsonSession(
    findRandomName(5),
    'sessionState.js - active list failed.'
  );
};

export const setActiveList = (value) => {
  writeJsonSession(findRandomName(5), value);
};

export const getPlayerIconPosition = () => {
  const enArr = getEnArr();
  const activeList = getActiveList();
  const position = Number(activeList[enArr[1]]);

  if (!Number.isInteger(position)) {
    throw throwObj('dataManipulation', 'sessionState.js - player icon position failed.');
  }

  return position;
};

export const getEnemyIconPosition = () => {
  const pnArr = getPnArr();
  const activeList = getActiveList();
  const position = Number(activeList[pnArr[1]]);

  if (!Number.isInteger(position)) {
    throw throwObj('dataManipulation', 'sessionState.js - enemy icon position failed.');
  }

  return Number(19 - position);
};
