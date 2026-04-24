import errorManager from '@/client/js/module/errorHandler/errorManager';
import receiveMakeNicknameList from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateChoiceFirstPlayer/receiveMakeNicknameList";

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      receiveMakeNicknameList(data);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
