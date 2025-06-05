import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
  // find gameState all keys
  if (gameState === findCharCode([88, 66, 65, 72, 90, 68, 86, 75, 85, 73])) {
    return [
      findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]), // waitEnemy
      findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]), // choiceCard
      findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]), // basicBet
      findCharCode([84, 88, 86, 66, 78, 73, 82, 81, 87, 71]), // playing
      findCharCode([65, 70, 79, 73, 76, 85, 88, 87, 86, 75]), // gameOver
    ];
  }

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
  }
};
