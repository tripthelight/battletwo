/**
 * Cookies 조회
 * @param {string} gameName gameName
 */
export default (gameName) => {
  const name = "gc_at=";
  const decoded = decodeURIComponent(document.cookie);
  const cookies = decoded.split("; ");

  for (const c of cookies) {
    if (c.startsWith(name)) {
      return c.substring(name.length);
    }
  }
  return null;
};
