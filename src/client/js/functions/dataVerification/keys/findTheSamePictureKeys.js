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
    return [
      findCharCode([70, 80, 83, 79, 71, 87, 75, 78, 76, 84]), // nicknameList
      findCharCode([75, 77, 88, 72, 80, 73, 86, 71, 67, 78]), // clickUser
      findCharCode([75, 79, 83, 78, 89, 82, 68, 69, 73, 86]), // pn
      findCharCode([80, 82, 68, 73, 86, 85, 90, 66, 87, 71]), // en
      findCharCode([66, 84, 88, 72, 79, 73, 82, 76, 85, 77]), // rns
      findCharCode([67, 81, 82, 88, 79, 85, 66, 78, 89, 69]), // gameStateNext
    ];
  };
  // gameState: firstUserAni
  if (gameState === findCharCode([79, 71, 77, 85, 65, 74, 90, 83, 80, 89])) {
    return [
      findCharCode([81, 77, 68, 70, 74, 82, 69, 67, 75, 80]), // picTxt
    ];
  };
  // gameState: playing
  if (gameState === findCharCode([77, 90, 68, 76, 69, 83, 85, 74, 70, 79])) {
    return [
      findCharCode([]), //
    ];
  };
  // gameState: gameOver
  if (gameState === findCharCode([66, 85, 77, 82, 70, 74, 67, 81, 76, 87])) {
    return [
      findCharCode([79, 85, 89, 77, 72, 87, 81, 78, 65, 66]), // gameStateGetAll
      findCharCode([67, 69, 85, 83, 66, 82, 88, 86, 70, 75]), // refresh
      findCharCode([81, 69, 68, 84, 89, 87, 76, 67, 72, 73]), // round
      findCharCode([90, 65, 88, 69, 78, 89, 67, 74, 76, 73]), // playingRe
      findCharCode([67, 72, 86, 68, 83, 77, 74, 65, 88, 78]), // result
    ];
  };
};
