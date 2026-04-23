import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([79, 89, 69, 86, 65, 66, 82, 90, 73, 68])) { // gameStateAllKeys
    return [
      findCharCode([89, 73, 74, 69, 67, 85, 65, 84, 81, 77]), // waitEnemy
      findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75]), // choiceFirstPlayer
      findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89]), // firstUserAni
      findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79]), // playing
      findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87]), // gameOver
    ];
  };

  // gameState: choiceFirstPlayer
  if (gameState === findCharCode([86, 79, 82, 66, 65, 73, 88, 68, 77, 75])) {
    return [];
  };
  // gameState: firstUserAni
  if (gameState === findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89])) {
    return [];
  };
  // gameState: playing
  if (gameState === findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79])) {
    return [];
  };
  // gameState: gameOver
  if (gameState === findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87])) {
    return [];
  };
};
