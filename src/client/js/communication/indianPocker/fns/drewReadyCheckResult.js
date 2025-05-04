import { errorManagement } from '@/client/js/module/errorManagement';

export default (_data) => {
  const promise = new Promise((resolve, reject) => {
    resolve(_data);
  });
  promise
    .then((_data) => {
      if (_data) window.sessionStorage.setItem('drewCardReady', true);
    })
    .catch((error) => {
      // return errorComn(error);
      return errorManagement({ errCase: 'errorComn' });
    });
};
