/**
 * module name : TMD(TextDecoder Module Decoder)
 * @param {Array<number>} a - text를 new TextDecoder.encode 로 만든 BufferSource 배열
 * @returns {string} decode 된 문자
 */
export default (a) => {
  return new TextDecoder().decode(new Uint8Array(a));
};
