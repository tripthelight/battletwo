import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";

export default (_playerCards) => {
  const PLAYER_ACTIVE = findIconActive("p");
  for (let i = 0; i < _playerCards.length; i++) {
    if (i === PLAYER_ACTIVE - 1) {
      _playerCards[i].classList.add("active-before");
    }
    if (i === PLAYER_ACTIVE) {
      _playerCards[i].classList.add("active-after");
    }
  }
};
