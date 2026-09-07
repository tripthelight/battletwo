import storageMethod from '@/client/js/module/storage/storageMethod';
import findCharCode from '@/client/js/functions/findCharCode';
import errorManager from '@/client/js/module/errorHandler/errorManager';
import X from '@/client/js/module/crypts/bool-obf';
import decodeTF from '@/client/js/module/crypts/obfTrueFalse';
import _t from '@/client/js/module/crypts/textDE';
import gameState from '@/client/js/gameState/blackAndWhite1';

export default (_data) => {
  const PROMISE = new Promise((resolve) => {
    resolve(_data);
  });

  PROMISE
    .then((data) => {
      switch (data.stat) {
        case 'enemyReadyEnd':
          // enemyShuffleState : true
          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]), // enemyShuffleState
            X.enc(decodeTF(_t([99, 109, 112, 97]))), // "cmpa" : true
          );
          break;

        case 'allReady':
          // 상대의 shuffle 완료 상태와 firstUser를 확정한 뒤
          // gameState.setOrder()가 gameState를 setOrder로 저장하고
          // 선/후공 표시 단계로 진입한다.
          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([66, 79, 83, 65, 89, 81, 74, 68, 87, 70]), // enemyShuffleState
            X.enc(decodeTF(_t([107, 119, 112, 117]))), // "kwpu" : true
          );

          storageMethod(
            's',
            'SET_ITEM',
            findCharCode([73, 81, 90, 83, 68, 86, 69, 89, 78, 70]), // firstUser
            data.firstUser,
          );

          gameState.setOrder();
          break;

        default:
          break;
      }
    })
    .catch((error) => {
      errorManager(error, true);
    });
};
