export default (array) => {
  let rand = (Math.random() * array.length) | 0;
  return array[rand];
};
