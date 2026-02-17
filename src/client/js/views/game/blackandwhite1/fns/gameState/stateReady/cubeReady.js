import infoShuffle from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateReady/infoShuffle';

export default () => {
  const CUBE_EL = document.querySelector("ul.cube");
  if (CUBE_EL) {
    CUBE_EL.classList.add("ready");
  };

  // 다음 단계
  infoShuffle();
};
