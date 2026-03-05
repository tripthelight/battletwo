import fromUnicodePoints from '@/client/js/module/unicode/fromUnicodePoints';
import { parsePayloadToHex } from '@/client/js/module/crypts/obf_u32_xor_prng_b64';

export default function (nickName) {
  const NICK_NAME = localStorage.getItem(nickName);
  if (!NICK_NAME) return ''; // TODO: localStorage 없음 error case -> 홈으로 이동
  const DEC_NICK_NAME = parsePayloadToHex(NICK_NAME); // 난독화 닉네임 복호화
  return fromUnicodePoints(DEC_NICK_NAME);
  // return fromUnicodePoints(
  //   NICK_NAME.replace(/"/g, '')
  //     .split(',')
  //     .map((s) => s.trim()),
  // );
}
