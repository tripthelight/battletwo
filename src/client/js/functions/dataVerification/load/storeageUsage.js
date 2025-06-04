import { errorManagement } from '@/client/js/module/errorManagement';
import { request } from '@/client/js/communication/indianPocker/request';

/**
 * storage key의 존재 유무를 체크
 * @typedef {Object} params
 * @property {string} storageArea 'l': localStorage | 's': sessionStorage
 * @property {Array<string>} storageKeys 찾고자 하는 storage key 배열
 * @returns {boolean|null} 찾고자 하는 key가 모두 있을 경우 true
 */
export default ({ storageArea, storageKeys }) => {
  // storageArea에 따른 storage 객체 가져오기
  const storage = storageArea === 'l' ? localStorage : storageArea === 's' ? sessionStorage : null;

  if (!storage) {
    errorManagement({ errCase: 'sessionStorageLoss', message: "storage가 'l'이나 's' 가 아닙니다." });
    return null;
  }

  const allKeys = Object.keys(storage);
  const setKeys = new Set(allKeys);
  const allExist = storageKeys.every((key) => setKeys.has(key));
  if (allExist) {
    return true;
  } else {
    const message = '내가 sessionStorage 삭제';
    request('opponentFouls', { subject: 'local', message: message });
    errorManagement({ errCase: 'sessionStorageLoss', message: 'storage안에 찾고자 하는 key가 모두 없습니다.' });
    return null;
  }
};
