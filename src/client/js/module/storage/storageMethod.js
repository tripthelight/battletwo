import storageEventStore, { updateStorageEvent } from '@/client/store/storageEvent.js';
import saveLocalStorage from '@/client/js/module/storage/save/saveLocalStorage.js';
import saveSessionStorage from '@/client/js/module/storage/save/saveSessionStorage';

export default function storageMethod(_storage, _method, _key, _value, _keys) {
  storageEventStore.dispatch(updateStorageEvent({ value: false }));
  switch (_method) {
    case 'SET_ITEM':
      if (_storage === 'l') {
        localStorage.setItem(_key, _value);
        saveLocalStorage();
      } else if (_storage === 's') {
        sessionStorage.setItem(_key, _value);
        saveSessionStorage();
      }
      break;
    case 'REMOVE_ITEM':
      if (_storage === 'l') {
        localStorage.removeItem(_key);
        saveLocalStorage();
      } else if (_storage === 's') {
        sessionStorage.removeItem(_key);
        saveSessionStorage();
      }
      break;
    case 'REMOVE_ALL':
      if (_storage === 'l') {
        window.localStorage.clear();
        saveLocalStorage();
      } else if (_storage === 's') {
        window.sessionStorage.clear();
        saveSessionStorage();
      }
      break;
    case 'REMOVE_ARR':
      if (_storage === 'l') {
        for (let i = 0; i < _keys.length; i++) window.localStorage.removeItem(_keys[i]);
        saveLocalStorage();
      } else if (_storage === 's') {
        for (let i = 0; i < _keys.length; i++) window.sessionStorage.removeItem(_keys[i]);
        saveSessionStorage();
      }
      break;
    default:
      break;
  }

  storageEventStore.dispatch(updateStorageEvent({ value: true }));
}
