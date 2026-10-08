import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([73, 69, 80, 72, 76, 78, 79, 84, 66, 71])) { // gameStateAllKeys
    return [
      findCharCode([81, 78, 74, 80, 86, 83, 73, 82, 75, 72]), // waitEnemy
      findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88]), // ready
      findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77]), // playing
      findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73]), // gameOver
    ];
  };

  // gameState: ready
  if (gameState === findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88])) {
    return [

    ];
  };
  // gameState: playing
  if (gameState === findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77])) {
    return [

    ];
  };
  // gameState: gameOver
  if (gameState === findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73])) {
    return [

    ];
  };
};
