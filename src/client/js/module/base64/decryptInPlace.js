import xorshift32 from '@/client/js/module/base64/xorshift32';

export default (u8, seed) => {
  let s = (seed ^ 0x9e3779b9) >>> 0;
  let acc = 0x85ebca6b >>> 0;

  for (let i = 0; i < u8.length; i++) {
    s = xorshift32(s);
    acc = Math.imul(acc ^ s, 0xc2b2ae35) >>> 0;
    const m = (acc ^ (acc >>> 11) ^ (s >>> 19)) & 0xff;
    u8[i] ^= m;
  }
  return u8;
};
