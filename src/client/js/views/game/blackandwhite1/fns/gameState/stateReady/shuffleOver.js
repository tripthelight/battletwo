export default (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  return false;
};
