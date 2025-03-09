import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';

export default function (nickName) {
  const NICK_NAME = localStorage.getItem(nickName);
  if (!NICK_NAME) return ''; // TODO: localStorage 없음 error case -> 홈으로 이동
  return fromUnicodePoints(
    NICK_NAME.replace(/"/g, '')
      .split(',')
      .map((s) => s.trim()),
  );
}
