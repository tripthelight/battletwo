/**
 * Cookies 찾기
 * @param {string} name Cookies 이름
 */
export default (name) => {
  /* const value = `; ${document.cookie}`;
  console.log('COOKIE - value : ', value);

  const parts = value.split(`; ${name}=`);
  console.log('COOKIE - parts : ', parts);
  if (parts.length === 2) {
    console.log('COOKIE - length : ', parts.length);
    return decodeURIComponent(parts.pop().split(';').shift());
  }
  return null; */
  function getCookieValue(name) {
    const match = document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='));
    return match ? match.split('=')[1] : null;
  };

  // 사용 예시
  return getCookieValue(name);
};
