export default (elems) => {
  const { svg, svgWrap, imgEl } = elems;

  // 카드뒷면이미지 삭제
  if (imgEl) imgEl.remove();
  svgWrap.appendChild(svg); // svg를 감싸는 element
}
