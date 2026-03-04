import addEventsShuffleCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/addEventsShuffleCube";

export default () => {
  const shuffleCubes = document.querySelectorAll("ul.cube li");
  [].forEach.call(shuffleCubes, (item) => {
    addEventsShuffleCube(item, true);
  });
};
