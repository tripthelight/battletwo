export default (target) => {
  let ulEl = Array.from(target.closest("ul").children);
  return ulEl.indexOf(target);
};
