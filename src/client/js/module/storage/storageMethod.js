import storageEventStore, { updateStorageEvent } from '@/client/store/storageEvent';
import saveLocalStorage from '@/client/js/module/storage/save/saveLocalStorage';
import saveSessionStorage from '@/client/js/module/storage/save/saveSessionStorage';

export default function storageMethod(_storage, _method, _key, _value, _keys) {
  storageEventStore.dispatch(updateStorageEvent({ value: false }));
  switch (_method) {
    case 'SET_ITEM':
      if (_storage === 'l') {
        window.localStorage.setItem(_key, _value);
        saveLocalStorage();
      } else if (_storage === 's') {
        window.sessionStorage.setItem(_key, _value);
        saveSessionStorage();
      }
      break;
    case 'GET_ITEM':
      if (_storage === 'l') {
        return window.localStorage.getItem(_key);
      } else if (_storage === 's') {
        return  window.sessionStorage.getItem(_key);
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
    case 'REMOVE_VALUE':
      if (_storage === 'l') {
        for (let i = 0; i < _keys.length; i++) window.localStorage.setItem(_keys[i], '');
        saveLocalStorage();
      } else if (_storage === 's') {
        for (let i = 0; i < _keys.length; i++) window.sessionStorage.setItem(_keys[i], '');
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
