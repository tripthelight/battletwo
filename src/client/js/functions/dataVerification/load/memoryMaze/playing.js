import sendEnterPlaying from '@/client/js/views/game/memoryMaze/fns/gameState/statePlaying/sendEnterPlaying';

export const PLAYING_HANDLER = {
  // gameState : playing 에서 reload 한 경우
  handleReload(storageKeys) {
    sendEnterPlaying();
  },
  // gameState : playing 에 처음 입장
  handleInitialLoad(storageKeys) {
    sendEnterPlaying();
  },
};
