import { text } from '@/client/js/functions/language';

export default (_container, _playBlock) => {
  const MODAL_CHK = document.querySelector(".modal");
  if (MODAL_CHK) return;
  const MODAL = document.createElement("div");
  const MODAL_TXT = text.findsamepicture.touch;
  const MODAL_WIDTH = MODAL_TXT.length * 14 + 24 + 32;

  if (MODAL_WIDTH > window.innerWidth) {
    MODAL.classList.add("multi-line");
  } else {
    MODAL.classList.add("one-line");
  }
  MODAL.style.bottom = `${_playBlock.clientHeight + 10}px`;

  MODAL.innerHTML = MODAL_TXT;
  MODAL.classList.add("modal");
  _container.appendChild(MODAL);
  setTimeout(() => {
    MODAL.classList.add("show");
  }, 30);
};
