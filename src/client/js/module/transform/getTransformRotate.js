export default (element) => {
  const defaultParams = 0;

  // DOM 요소가 아닌 경우 랜덤 값 반환
  if (!(element instanceof Element)) {
    return defaultParams;
  }

  const style = window.getComputedStyle(element);

  if (style?.transform && style.transform !== 'none') {
    const matrix = new DOMMatrixReadOnly(style.transform);
    const angle = Math.atan2(matrix.m12, matrix.m11) * (180 / Math.PI);
    return Math.round((angle + 360) % 360);
  }

  return defaultParams;
};
