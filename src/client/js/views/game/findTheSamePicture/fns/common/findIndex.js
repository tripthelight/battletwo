export default (_target) => {
  let nodes = Array.from(_target.closest("ul").children);
  return nodes.indexOf(_target.closest("li"));
};
