import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([82, 73, 76, 72, 66, 83, 78, 77, 71, 90])) { // gameStateAllKeys
    return [
      findCharCode([81, 66, 68, 80, 75, 78, 83, 65, 89, 74]), // waitEnemy
      findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69]), // ready
      findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75]), // playing
      findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65]), // gameOver
    ];
  };

  // gameState: ready
  if (gameState === findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69])) {
    return [

    ];
  };
  // gameState: playing
  if (gameState === findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75])) {
    return [

    ];
  };
  // gameState: gameOver
  if (gameState === findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65])) {
    return [

    ];
  };
};
