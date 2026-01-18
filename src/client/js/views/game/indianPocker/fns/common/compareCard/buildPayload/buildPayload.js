import toTokenStream from '@/client/js/module/base64/toTokenStream';
import int16ToU8 from '@/client/js/module/base64/int16ToU8';
import cryptInPlace from '@/client/js/module/base64/cryptInPlace';
import u8ToB64 from '@/client/js/module/base64/u8ToB64';

// 최종: 원본 배열 + seed -> PAYLOAD 문자열
export default (nestedArray, seed) => {
  const tokens = toTokenStream(nestedArray);
  const u8 = int16ToU8(tokens);
  cryptInPlace(u8, seed);
  return u8ToB64(u8);
};
