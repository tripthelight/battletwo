export default (_elem) => {
  _elem.classList.remove("type-width");
  _elem.classList.remove("type-height");
  const WW = window.innerWidth;
  const WH = window.innerHeight;
  if (WW > WH || WW === WH) _elem.classList.add("type-width");
  if (WW < WH) _elem.classList.add("type-height");
};
