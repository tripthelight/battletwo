export default () => {
  const elem = document.querySelectorAll(".game-cards .card");
  const elems = {};

  for (let i = 0; i + 1 < elem.length; i += 2) {
    elems[`card${i / 2 + 1}`] = [
      elem[i],
      elem[i + 1]
    ];
  }

  return elems;
}
