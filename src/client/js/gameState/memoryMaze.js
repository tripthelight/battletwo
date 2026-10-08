import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateReady from '@/client/js/gameState/memoryMaze/gameStateReady';
import gameStatePlaying from '@/client/js/gameState/memoryMaze/gameStatePlaying';
import gameStateGameOver from '@/client/js/gameState/memoryMaze/gameStateGameOver';
import { markGameSessionCompleted } from '@/client/js/module/webRTC/connectSignaling';

export default {
  waitEnemy: () => {
    const encryptKey = findCharCode([87, 67, 81, 66, 68, 75, 88, 86, 71, 74]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([81, 66, 68, 80, 75, 78, 83, 65, 89, 74])); // waitEnemy
  },
  ready: () => {
    const encryptKey = findCharCode([87, 67, 81, 66, 68, 75, 88, 86, 71, 74]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([72, 80, 76, 68, 90, 82, 81, 89, 75, 69])); // ready
    gameStateReady();
  },
  playing: () => {
    const encryptKey = findCharCode([87, 67, 81, 66, 68, 75, 88, 86, 71, 74]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([82, 81, 79, 73, 85, 90, 66, 78, 77, 75])); // playing
    gameStatePlaying();
  },
  gameOver: () => {
    const encryptKey = findCharCode([87, 67, 81, 66, 68, 75, 88, 86, 71, 74]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([82, 77, 74, 79, 73, 81, 86, 78, 80, 65])); // gameOver

    // 양쪽 Peer가 정상적으로 게임 종료 상태에 도달했음을 WebRTC 계층에 알린다.
    // 이후의 상대 페이지 이탈은 중도 이탈 오류로 취급하지 않는다.
    markGameSessionCompleted();
    gameStateGameOver();
  },
};
