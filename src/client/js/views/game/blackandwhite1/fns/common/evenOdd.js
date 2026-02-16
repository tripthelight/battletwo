export default (elem) => {
  if (parseInt(elem.innerHTML) % 2 == 0) {
    elem.classList.remove("odd");
    elem.classList.add("even");
  } else {
    elem.classList.remove("even");
    elem.classList.add("odd");
  }
};
