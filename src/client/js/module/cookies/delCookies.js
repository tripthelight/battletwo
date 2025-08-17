/**
 * Cookies 삭제
 * @param {string} cookieName Cookies 이름
 */
export default (cookieName, path) => {
  // 쿠키 삭제 방법 1 : 만료일을 과거로 설정
  document.cookie = `${encodeURIComponent(cookieName)}=; path=/${path}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

  // 쿠키 삭제 방법 2 :  앞서 사용했던 max-age 속성을 0으로 설정
  // document.cookie = `${cookieName}=; path=/; max-age=0;`;
};
