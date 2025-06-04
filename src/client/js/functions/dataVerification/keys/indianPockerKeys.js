import findCharCode from '@/client/js/functions/findCharCode';

export default (gameState) => {
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
      findCharCode([82, 73, 67, 77, 85, 88, 70, 83, 71, 87]), // myNextStepState
      findCharCode([68, 79, 74, 85, 82, 83, 81, 86, 72, 77]), // nextStepChoiceCard
    ];
  }
};
