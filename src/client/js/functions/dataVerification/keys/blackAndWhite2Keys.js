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
      findCharCode([86, 88, 85, 83, 90, 65, 84, 70, 78, 69]), // firstUser
      findCharCode([75, 69, 86, 83, 70, 82, 85, 73, 90, 87]), // enemyNick
    ];
  };
  // gameState: playing
  if (gameState === findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77])) {
    return [
      // findCharCode([]), //
      findCharCode([71, 72, 87, 84, 69, 74, 70, 82, 66, 78]), // roundIndex
      findCharCode([88, 82, 71, 75, 87, 65, 67, 86, 80, 66]), // pointNum
      findCharCode([67, 81, 75, 89, 76, 87, 65, 68, 90, 71]), // indicatorLight
      findCharCode([80, 78, 82, 65, 71, 81, 72, 84, 83, 90]), // localScore
      findCharCode([80, 76, 67, 81, 86, 83, 84, 90, 69, 74]), // remoteScore
      findCharCode([86, 71, 82, 80, 85, 69, 72, 90, 77, 65]), // settledRound
      findCharCode([89, 65, 83, 66, 81, 72, 88, 73, 77, 68]), // pointColor
      // findCharCode([]), //
    ];
  };
  // gameState: gameOver
  if (gameState === findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73])) {
    return [
      // findCharCode([]), //
    ];
  };
};
