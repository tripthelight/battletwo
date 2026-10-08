import findCharCode from '@/client/js/functions/findCharCode';
import storageMethod from '@/client/js/module/storage/storageMethod';
import gameStateReady from '@/client/js/gameState/blackAndWhite2/gameStateReady';
import gameStatePlaying from '@/client/js/gameState/blackAndWhite2/gameStatePlaying';
import gameStateGameOver from '@/client/js/gameState/blackAndWhite2/gameStateGameOver';
import { markGameSessionCompleted } from '@/client/js/module/webRTC/connectSignaling';

export default {
  waitEnemy: () => {
    const encryptKey = findCharCode([72, 86, 73, 68, 83, 82, 88, 89, 69, 67]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([81, 78, 74, 80, 86, 83, 73, 82, 75, 72])); // waitEnemy
  },
  ready: () => {
    const encryptKey = findCharCode([72, 86, 73, 68, 83, 82, 88, 89, 69, 67]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([90, 73, 85, 83, 81, 74, 66, 65, 80, 88])); // ready
    gameStateReady();
  },
  playing: () => {
    const encryptKey = findCharCode([72, 86, 73, 68, 83, 82, 88, 89, 69, 67]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([81, 86, 90, 89, 70, 66, 83, 75, 84, 77])); // playing
    gameStatePlaying();
  },
  gameOver: () => {
    const encryptKey = findCharCode([72, 86, 73, 68, 83, 82, 88, 89, 69, 67]); // gameState
    storageMethod('s', 'SET_ITEM', encryptKey, findCharCode([80, 83, 88, 65, 79, 75, 86, 76, 87, 73])); // gameOver

    // 양쪽 Peer가 정상적으로 게임 종료 상태에 도달했음을 WebRTC 계층에 알린다.
    // 이후의 상대 페이지 이탈은 중도 이탈 오류로 취급하지 않는다.
    markGameSessionCompleted();
    gameStateGameOver();
  },
};
