import storageMethod from '@/client/js/module/storage/storageMethod';

export default () => {
  // 랜덤 8자리 문자열 (숫자 + 영문 소문자) 생성 함수
  function generateRandomKey() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const oldKeys = Object.keys(sessionStorage);

  oldKeys.forEach(oldKey => {
    // 새로운 랜덤 키 생성
    const newKey = generateRandomKey();

    // 기존 value는 무시하고 빈 문자열로 저장
    storageMethod('s', 'SET_ITEM', newKey, '');

    // 기존 key 삭제
    storageMethod('s', 'REMOVE_ITEM', oldKey);
  });
};
