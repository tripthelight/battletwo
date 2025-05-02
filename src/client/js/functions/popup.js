export default (elem) => {
  const POPUP_ELEM = elem.closest(".modal-popup");
  if (POPUP_ELEM) {
    POPUP_ELEM.remove();
  }
};
