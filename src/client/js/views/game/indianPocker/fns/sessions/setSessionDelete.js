/**
 * session의 key들을 연속으로 삭제
 * @param {string} _session
 * @param {string[]} _keys
 */

export default (_session, _keys) => {
  switch (_session) {
    case 'localStorage':
      for (let i = 0; i < _keys.length; i++) {
        storageMethod('l', 'REMOVE_ITEM', _keys[i]);
      }
      break;
    case 'sessionStorage':
      for (let i = 0; i < _keys.length; i++) {
        storageMethod('s', 'REMOVE_ITEM', _keys[i]);
      }
      break;
    default:
      break;
  }
};
