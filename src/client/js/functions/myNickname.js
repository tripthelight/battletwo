import fromUnicodePoints from "@/client/js/module/unicode/fromUnicodePoints";

export default function () {
  const NICK_NAME = localStorage.getItem('nickName');
  if (!NICK_NAME) return '';
  return fromUnicodePoints(
    NICK_NAME.replace(/"/g, '')
      .split(',')
      .map((s) => s.trim()),
  );
}
