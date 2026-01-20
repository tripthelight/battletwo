export default (elems) => {
  const { svg, svgWrap, wrap } = elems;

  svgWrap.appendChild(svg); // svg를 감싸는 element
  wrap.appendChild(svgWrap); // svg를 감싸는 element 를 감싸는 element
}
