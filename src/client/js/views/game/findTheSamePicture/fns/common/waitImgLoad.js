export default (imageElement) => {
  return new Promise((resolve) => {
    imageElement.onload = resolve;
  });
};
