export default (element) => {
  const getRandomBetween20And60 = () => Math.floor(Math.random() * (60 - 20 + 1)) + 20;

  const randomParams = {
    translateX: getRandomBetween20And60(),
    translateY: getRandomBetween20And60(),
  };

  // DOM 요소가 아닌 경우 랜덤 값 반환
  if (!(element instanceof Element)) {
    return randomParams;
  }

  const style = window.getComputedStyle(element);

  if (style?.transform && style.transform !== 'none') {
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      translateX: matrix.m41,
      translateY: matrix.m42,
    };
  }

  return randomParams;
};
