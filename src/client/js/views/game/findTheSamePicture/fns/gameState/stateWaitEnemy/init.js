import waitPeer from '@/client/js/functions/waitPeer';
import runtime from '@/client/js/views/game/findTheSamePicture/fns/common/runtime';
import { getLocalNickname } from '@/client/js/views/game/findTheSamePicture/fns/common/utils';

export default {
  main: () => {
    if (runtime.waitEnemyVisible) {
      return;
    }

    waitPeer(1, getLocalNickname());
    runtime.waitEnemyVisible = true;
  },

  end: () => {
    if (!runtime.waitEnemyVisible) {
      return;
    }

    waitPeer(2);
    runtime.waitEnemyVisible = false;
  },
};
