import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE
    .then((_data) => {
      const { firstPlayer } = _data;
      storageMethod(
        "s",
        "SET_ITEM",
        findCharCode([86, 88, 85, 83, 90, 65, 84, 70, 78, 69]), // firstUser
        firstPlayer
      );

      console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer);
      console.log("첫플레이어 >>>>>>>>>>>>> ", firstPlayer === storageMethod("l", "GET_ITEM", 'localPlayer') ? '나임' : '나아님');
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
