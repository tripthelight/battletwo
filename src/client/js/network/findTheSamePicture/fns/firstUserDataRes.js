import errorManager from '@/client/js/module/errorHandler/errorManager';
import saveFirstUser from "@/client/js/views/game/findTheSamePicture/fns/gameState/stateChoiceFirstPlayer/saveFirstUser";

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      saveFirstUser(data);
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
