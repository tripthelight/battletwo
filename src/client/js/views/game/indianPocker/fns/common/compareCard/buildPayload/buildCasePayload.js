
import int16ToU8 from '@/client/js/module/base64/int16ToU8';
import cryptInPlace from '@/client/js/module/base64/cryptInPlace';
import u8ToB64 from '@/client/js/module/base64/u8ToB64';

// payload 빌더 (for 대신 reduce로 tokens 구성)
export default (mode, recs, seed) => {
  const tokens = recs.reduce(
    (acc, [ax, ay, sid]) => (acc.push(ax | 0, ay | 0, sid | 0), acc),
    [mode | 0, recs.length | 0]
  );

  const u8 = int16ToU8(tokens);
  cryptInPlace(u8, (seed >>> 0));
  return u8ToB64(u8);
};
