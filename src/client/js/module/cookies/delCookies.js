/**
 * Cookies 삭제
 * @param {string} gameName gameName
 */
export default (gameName) => {
  document.cookie = `gc_at=; path=/game/${gameName}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
