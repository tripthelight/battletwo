import findIconActive from "@/client/js/views/game/findTheSamePicture/fns/common/findIconActive";
import randomNumNewCard from "@/client/js/views/game/findTheSamePicture/fns/common/randomNumNewCard";
import {
  getActiveList,
  getEnArr,
  getPnArr,
  setActiveList,
  setPnArr,
} from '@/client/js/views/game/findTheSamePicture/fns/common/sessionState';

export default (_state) => {
  const PN_ARR = getPnArr();
  const EN_ARR = getEnArr();
  const ACTIVE_ARR = getActiveList();
  const playerActiveNum = findIconActive("p");
  const playerChangeNum = _state ? Number(playerActiveNum - 1) : Number(playerActiveNum + 1);
  ACTIVE_ARR[EN_ARR[1]] = playerChangeNum;

  let randomNum = 0;
  for (let k = 0; k < ACTIVE_ARR.length; k++) {
    randomNum = Math.floor(Math.random() * 20);
    if (k === PN_ARR[1] || k === EN_ARR[1]) randomNum = ACTIVE_ARR[k];
    ACTIVE_ARR[k] = randomNum;
  }

  setActiveList(ACTIVE_ARR);

  let card1Num = 0;
  if (!_state) {
    card1Num = randomNumNewCard();
    for (let i = PN_ARR.length - 1; i >= 0; i--) {
      if (i === 0) {
      } else {
        PN_ARR[i] = PN_ARR[i - 1];
        if (i === 1) {
          PN_ARR[i] = card1Num;
        }
      }
    }

    setPnArr(PN_ARR);
  }

  return { num: playerChangeNum, card1Num: card1Num };
};
