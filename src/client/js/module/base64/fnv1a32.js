export default (str, seed) => {
  const bytes = new TextEncoder().encode(str);
  // let h = 0x811c9dc5;
  let h = seed;
  for (let i = 0; i < bytes.length; i++) {
    h ^= bytes[i];
    // h = Math.imul(h, 0x01000193);
    h = Math.imul(h, h >>> 1);
  }
  return h >>> 0;
};
