/**
 * Cookies 저장
 * @param {object} cookieData Cookies에 저장시킬 데이터
 * @param {string} cookieName Cookies 이름
 * @param {number} cookieDate Cookies 저장기간 - minutes
 */
export default (params) => {
  const { cookieData, cookieName, cookieDate } = params;
  // JSON 문자열로 변환
  const objString = JSON.stringify(cookieData);
  // 쿠키에 데이터 저장 ex) cookieDate가 10일 경우 = 10 × 60초 = 600초 = 10분
  // document.cookie = `${cookieName}=${encodeURIComponent(objString)}; path=/; max-age=${cookieDate * 60}`;
  document.cookie = [`${cookieName}=${encodeURIComponent(objString)}`, 'path=/', ...(cookieDate !== undefined && cookieDate > 0 ? [`max-age=${cookieDate * 60}`] : [])].join('; ');
};
