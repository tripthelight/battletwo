import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([73, 70, 65, 67, 86, 66, 83, 89, 90, 80])) { // gameStateAllKeys
    return [
      findCharCode([66, 81, 78, 88, 74, 80, 70, 65, 90, 71]), // waitEnemy
      findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65]), // ready
      findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71]), // waitEnemyShuffle
      findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73]), // setOrder
      findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78]), // playing
      findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85]), // gameOver
    ];
  };

  // gameState: ready
  if (gameState === findCharCode([72, 76, 74, 83, 79, 77, 84, 73, 69, 65])) {
    return [

    ];
  };
  // gameState: waitEnemyShuffle
  if (gameState === findCharCode([67, 86, 80, 69, 76, 66, 77, 73, 72, 71])) {
    return [

    ];
  };
  // gameState: setOrder
  if (gameState === findCharCode([65, 71, 81, 72, 85, 75, 78, 74, 86, 73])) {
    return [

    ];
  };
  // gameState: playing
  if (gameState === findCharCode([75, 68, 67, 71, 82, 87, 74, 73, 66, 78])) {
    return [

    ];
  };
  // gameState: gameOver
  if (gameState === findCharCode([67, 68, 72, 69, 90, 77, 80, 81, 75, 85])) {
    return [

    ];
  };
};
