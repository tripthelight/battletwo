export default (e) => {
  e.stopPropagation();
  // this.classList.remove("over");
  e.target.classList.remove("over");
  e.target.removeAttribute('style');
};
