import CryptoJS from "crypto-js";

/**
 * Cookies 생성
 * @param {string} roomName roomName
 * @param {string} gameName gameName
 * @returns {string} cookie
 */
export default (roomName, gameName) => {
  try {
    const ciphertext = CryptoJS.AES.encrypt(
      roomName,
      (gameName.toLowerCase() + [...gameName.toLowerCase()].reverse().join('') + gameName.toLowerCase()).slice(-16) // 영문 16글자 이상 128bits
    ).toString();

    document.cookie = `gc_at=${encodeURIComponent(ciphertext)}; path=/game/${gameName}`;
  } catch (error) {
    throw { errCase: 'errorComn', message: 'cookie roomName encrypt error' };
  }
};
