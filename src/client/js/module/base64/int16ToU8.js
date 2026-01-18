// int16[] -> Uint8Array (little-endian)
export default (arr) => {
  const buf = new ArrayBuffer(arr.length * 2);
  const dv = new DataView(buf);
  for (let i = 0; i < arr.length; i++) dv.setInt16(i * 2, arr[i], true);
  return new Uint8Array(buf);
};
