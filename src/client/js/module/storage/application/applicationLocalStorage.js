import storageEventStore, { updateStorageEvent } from '@/client/store/storageEvent';
import storageDataStore, { updateLocalStorageData, updateSessionStorageData } from '@/client/store/storageData';
import saveLocalStorage from '@/client/js/module/storage/save/saveLocalStorage';
import saveSessionStorage from '@/client/js/module/storage/save/saveSessionStorage';

export default function applicationLocalStorage() {
  window.addEventListener('storage', (event) => {
    if (event.storageArea === localStorage) {
      // 브라우저의 Application 탭에서 localStorage 변경
      storageEventStore.dispatch(updateStorageEvent({ value: false }));

      // 브라우저에서 localStorage에 마우스 오른쪽 버튼을 눌러서 "clear" 할 경우
      if (event.key === null && event.oldValue === null && event.newValue === null) {
        const localStorageData = storageDataStore.getState().storageDataState.localStorageData;

        for (const key in localStorageData) {
          if (localStorageData.hasOwnProperty(key) && !localStorage.getItem(key)) {
            localStorage.setItem(key, localStorageData[key]);
          }
        }

        saveLocalStorage();

        storageEventStore.dispatch(updateStorageEvent({ value: true }));
        return;
      }

      localStorage.removeItem(event.key);
      localStorage.setItem(event.key, event.oldValue);

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // 새로 생성되는 key는 값이 'null'이기 때문에 삭제 필요
        if (value === 'null') {
          localStorage.removeItem(key);
        }
      }
      storageEventStore.dispatch(updateStorageEvent({ value: true }));
    } else if (event.storageArea === sessionStorage) {
      // 브라우저의 Application 탭에서 sessionStorage 변경
      storageEventStore.dispatch(updateStorageEvent({ value: false }));

      // 브라우저에서 sessionStorage에 마우스 오른쪽 버튼을 눌러서 "clear" 할 경우
      if (event.key === null && event.oldValue === null && event.newValue === null) {
        const sessionStorageData = storageDataStore.getState().storageDataState.sessionStorageData;
        for (const key in sessionStorageData) {
          if (sessionStorageData.hasOwnProperty(key) && !sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, sessionStorageData[key]);
          }
        }
        saveSessionStorage();

        storageEventStore.dispatch(updateStorageEvent({ value: true }));
        return;
      }

      sessionStorage.removeItem(event.key);
      sessionStorage.setItem(event.key, event.oldValue);

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);

        // 새로 생성되는 key는 값이 'null'이기 때문에 삭제 필요
        if (value === 'null') {
          sessionStorage.removeItem(key);
        }
      }
      storageEventStore.dispatch(updateStorageEvent({ value: true }));
    }
    storageEventStore.dispatch(updateStorageEvent({ value: true }));
  });
}
