import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

import drawPictureBoard from "@/client/js/views/game/findTheSamePicture/fns/gameState/statePlaying/drawPictureBoard"

export const PLAYING_HANDLER = {
  // gameState : playing 에서 reload 한 경우
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    };

    drawPictureBoard();
  },
  // gameState : playing 에 처음 입장
  handleInitialLoad(storageKeys) {
    // 모든 sessionStorage key를 순회하면서 필요한 data insert
    for (const key of storageKeys) {
      const val = window.sessionStorage.getItem(key);
      if (val === null) {
        // sessionStorage에 key가 없을 경우 빈문자열 삽입
        storageMethod('s', 'SET_ITEM', key, '');
      } else {
        storageMethod('s', 'SET_ITEM', key, val);
      }
    };

    // playing 단계에서 필요한 data insert 후 다음 단계 진행
    drawPictureBoard();
  },
};
