import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([88, 66, 65, 72, 90, 68, 86, 75, 85, 73])) {
  // if (gameState ==='gameStateAllKeys') {
    return [
      findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]), // waitEnemy
      findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
      findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]), // basicBet
      findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]), // playing
      findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]), // gameOver
    ];
    /* return [
      'waitEnemy', // waitEnemy
      'choiceCard', // choiceCard
      'basicBet', // basicBet
      'playing', // playing
      'gameOver', // gameOver
    ]; */
  };

  // gameState: choiceCard
  if (gameState === findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82])) {
    return [
      findCharCode([78, 73, 68, 76, 67, 82, 87, 83, 89, 70]), // ulIndex
      findCharCode([83, 70, 79, 67, 65, 71, 66, 87, 77, 86]), // liIndex
      findCharCode([77, 68, 73, 90, 74, 72, 86, 71, 85, 87]), // playerFirstNumber
      findCharCode([78, 72, 89, 73, 67, 85, 71, 79, 77, 76]), // ulIndexEnemy
      findCharCode([77, 67, 69, 73, 72, 75, 68, 82, 71, 80]), // liIndexEnemy
      findCharCode([81, 67, 82, 74, 87, 76, 89, 79, 83, 85]), // enemyFirstNumber
      findCharCode([68, 71, 87, 77, 85, 66, 65, 84, 88, 69]), // enemyCardChoiceReady
      findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
      findCharCode([79, 88, 77, 84, 87, 86, 83, 69, 89, 73]), // tieWait
      findCharCode([82, 73, 67, 77, 85, 88, 70, 83, 71, 87]), // myNextStepState
      findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]), // nextStepChoiceCard
    ];
    /* return [
      'ulIndex', // ulIndex
      'liIndex', // liIndex
      'playerFirstNumber', // playerFirstNumber
      'ulIndexEnemy', // ulIndexEnemy
      'liIndexEnemy', // liIndexEnemy
      'enemyFirstNumber', // enemyFirstNumber
      'enemyCardChoiceReady', // enemyCardChoiceReady
      'betUser', // betUser
      'betUserFirst', // betUserFirst
      'tieWait', // tieWait
      'myNextStepState', // myNextStepState
      'nextStepChoiceCard', // nextStepChoiceCard
    ]; */
  };

  // gameState: basicBet
  if (gameState === findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68])) {
    return [
      findCharCode([70, 77, 80, 88, 87, 86, 83, 89, 75, 65]), // betState
      findCharCode([83, 78, 86, 79, 68, 73, 71, 87, 82, 85]), // roundEnd
      findCharCode([72, 81, 73, 79, 83, 70, 78, 80, 75, 88]), // basicBetReady
      findCharCode([77, 76, 67, 88, 79, 87, 83, 90, 89, 86]), // extFirstBet
      findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]), // betUser
      findCharCode([90, 89, 80, 70, 68, 84, 65, 77, 74, 78]), // betUserFirst
      findCharCode([81, 67, 69, 68, 71, 77, 83, 90, 65, 74]), // coinsPlayer
      findCharCode([88, 79, 86, 74, 72, 80, 71, 70, 69, 77]), // coinsPlayerBet
      findCharCode([70, 90, 79, 67, 88, 77, 69, 82, 84, 81]), // coinsPlayerExtBet
      findCharCode([83, 78, 84, 68, 66, 80, 71, 65, 67, 87]), // coinsEnemy
      findCharCode([67, 79, 66, 70, 75, 82, 74, 88, 69, 68]), // coinsEnemyBet
      findCharCode([80, 73, 68, 65, 90, 69, 88, 86, 82, 67]), // coinsEnemyExtBet
      findCharCode([82, 67, 70, 69, 68, 86, 88, 74, 83, 78]), // drewReady
      findCharCode([81, 69, 77, 72, 75, 67, 73, 87, 79, 74]), // basicBettingState
      findCharCode([67, 71, 79, 68, 76, 73, 84, 74, 80, 77]), // drewState
      findCharCode([79, 85, 77, 74, 71, 78, 80, 67, 81, 72]), // result
      findCharCode([81, 69, 71, 84, 85, 90, 82, 67, 77, 89]), // dropState
      findCharCode([86, 90, 81, 77, 74, 72, 88, 83, 65, 80]), // coinsEnemyLocalFold
      findCharCode([80, 78, 65, 74, 82, 70, 66, 67, 81, 69]), // coinsPlayerLocalFold
      findCharCode([79, 90, 74, 71, 78, 89, 69, 82, 88, 84]), // coinsEnemyRemoteFold
      findCharCode([87, 68, 77, 88, 86, 90, 75, 79, 74, 82]), // coinsPlayerRemoteFold
      findCharCode([66, 65, 81, 76, 84, 71, 67, 86, 82, 83]), // foldUser
      findCharCode([65, 72, 66, 75, 85, 69, 87, 79, 88, 86]), // foldState
      findCharCode([73, 75, 72, 65, 77, 82, 85, 80, 66, 87]), // battleCardNum
      findCharCode([75, 81, 83, 80, 89, 88, 86, 72, 82, 77]), // playingReloadUser
      'betCoin', // findCharCode([68, 85, 72, 73, 84, 65, 90, 70, 89, 88]), // betCoin
      'betCoinPos' // findCharCode([68, 69, 75, 72, 67, 86, 90, 80, 65, 79]), // betCoinPos
    ];
  };
};
