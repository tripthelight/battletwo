import { errorManagement } from '@/client/js/module/errorHandler/errorManagement';
import findCookie from '@/client/js/module/cookies/findCookie';

/**
 * Cookies 불러오기
 * @param {string} cookieName Cookies 이름
 */
export default (params) => {
  const { cookieName } = params;

  const cookiesValue = findCookie(cookieName);
  if (cookiesValue) {
    /* const objCookie = JSON.parse(cookiesValue);
    const cookieValue = objCookie[cookieKey];
    if (cookieValue) {
      return cookieValue;
    } else {
      // errorManagement({ errCase: 'cookies', message: 'cookie value가 없습니다.' });
      return null;
    } */
    return cookiesValue
  } else {
    // errorManagement({ errCase: 'cookies', message: 'cookieName이 없습니다.' });
    return null;
  }
};
