export default () => {
  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) errorComn("container not found");
  const MODAL = CONTAINER.querySelector(".modal");
  if (MODAL) MODAL.remove();
  if (CONTAINER.classList.contains("info-play-pop")) CONTAINER.classList.remove("info-play-pop");
};
