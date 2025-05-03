export default (event) => {
  event.preventDefault();
  if (window.sessionStorage.dropState === "false") return;
  const BATTING_ZONE = document.querySelector(".betting-zone");
  if (!BATTING_ZONE.classList.contains("over")) {
    BATTING_ZONE.classList.add("over");
  }
};
