export default (element) => {
  const defaultParams = {
    translateX: 0,
    translateY: 0,
  };

  // DOM 요소가 아닌 경우 랜덤 값 반환
  if (!(element instanceof Element)) {
    return defaultParams;
  }

  const style = window.getComputedStyle(element);

  if (style?.transform && style.transform !== 'none') {
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      translateX: matrix.m41,
      translateY: matrix.m42,
    };
  }

  return defaultParams;
};
