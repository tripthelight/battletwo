import CryptoJS from "crypto-js";

/**
 * cookie에서 roomName 리턴 코드
 * @param {string} gameName gameName
 * @returns {string} roomName
 */
export default (gameName) => {
  const name = "gc_at=";
  const decoded = decodeURIComponent(document.cookie);

  const cookies = decoded.split("; ");

  for (const c of cookies) {
    if (c.startsWith(name)) {
      try {
        const value = c.substring(name.length);
        const bytes = CryptoJS.AES.decrypt(value, (gameName.toLowerCase() + [...gameName.toLowerCase()].reverse().join('') + gameName.toLowerCase()).slice(-16));
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);

        // AES 복호화가 잘못되면 빈 문자열이 반환되는 경우가 많음
        if (!decrypted) {
          throw { errCase: 'errorComn', message: 'cookie roomName decrypt error' };
        };

        return decrypted;
      } catch (error) {
        throw {
          errCase: error?.errCase ?? 'errorComn',
          message: error?.message ?? 'cookie roomName decrypt failed'
        };
      };
    };
  };
  return null;
};
