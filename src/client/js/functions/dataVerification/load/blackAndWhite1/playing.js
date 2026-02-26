import storageMethod from '@/client/js/module/storage/storageMethod';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import storageKeyDeleteCheck from '@/client/js/functions/dataVerification/load/storageKeyDeleteCheck';

import cubeReady from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubeReady';
import cubePlaying from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/cubePlaying";
import showEnemyCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/showEnemyCube";
import shuffleCubeStop from '@/client/js/views/game/blackAndWhite1/fns/gameState/stateWaitEnemyShuffle/shuffleCubeStop';
import drawInnerSquare from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawInnerSquare";
import btnStartChange from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/btnStartChange';
import selectCube from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/selectCube";

export const PLAYING_HANDLER = {
  // gameState : playing 에서 reload 한 경우
  handleReload(storageKeys) {
    if (storageKeyDeleteCheck(storageKeys)) {
      throw throwObj('sessionStorageLoss', 'delete sessionStorage.');
    };

    cubeReady();
    cubePlaying();
    showEnemyCube();
    shuffleCubeStop();
    drawInnerSquare();
    btnStartChange();
    selectCube();

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
    }

    // playing 단계에서 필요한 data insert 후 다음 단계 진행

    cubeReady();
    cubePlaying();
    showEnemyCube();
    shuffleCubeStop();
    drawInnerSquare();
    btnStartChange();
    selectCube();
  },
};
