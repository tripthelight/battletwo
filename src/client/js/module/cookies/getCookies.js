import { errorManagement } from '@/client/js/module/errorManagement';
import findCookie from '@/client/js/module/cookies/findCookie';

/**
 * Cookies 불러오기
 * @param {string} cookieName Cookies 이름
 * @param {string} cookieKey Cookies data에서 불러올 key name
 */
export default (params) => {
  const { cookieName, cookieKey } = params;

  const cookiesValue = findCookie(cookieName);
  if (cookiesValue) {
    const objCookie = JSON.parse(cookiesValue);
    const cookieValue = objCookie[cookieKey];
    if (cookieValue) {
      return cookieValue;
    } else {
      // errorManagement({ errCase: 'cookies', message: 'cookie value가 없습니다.' });
      return null;
    }
  } else {
    // errorManagement({ errCase: 'cookies', message: 'cookieName이 없습니다.' });
    return null;
  }
  return null;
};
