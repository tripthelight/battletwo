// xorshift32 는 SERVER와 CLIENT 모두 사용
export default (x) => {
  x >>>= 0;
  x ^= (x << 13) >>> 0;
  x ^= (x >>> 17) >>> 0;
  x ^= (x << 5) >>> 0;
  return x >>> 0;
};
