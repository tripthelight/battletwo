import '@/client/assets/scss/game/indianPocker/common';
import '@/client/js/common/common';
import reload from '@/client/js/module/reload';
import rtcPeer from '@/client/js/webRTC/rtcPeer';
import indianPockerGameState from '@/client/js/gameState/indianPocker';
import makeCard from '@/client/js/views/game/indianPocker/fns/common/makeCard/makeCard';
import findCharCode from '@/client/js/functions/findCharCode';
import { LOADING_EVENT } from '@/client/components/popup/full/loading';
import getCookies from '@/client/js/module/cookies/getCookies';
import delCookies from '@/client/js/module/cookies/delCookies';
import throwObj from '@/client/js/module/errorHandler/throwObj';
import errorManager from '@/client/js/module/errorHandler/errorManager';

// onMounted
document.onreadystatechange = async () => {
  if (document.readyState !== 'complete') return;
  try {
    LOADING_EVENT.show();

    const GAME_NAME = 'indianPocker';

    // 새로고침 트리거
    if (reload) {
      // 아직 연결 안되어 대기중에 새로고침하면 여기를 탐
      // 이전에 두 Peer가 연결되었다가 새로고침한 peer는 여기를 탐
      // 게임 중, sessionStorage를 모두 지우고, cookie도 지우고 새로고침 하면 처음부터 새로운 Peer와 재연결 - 게임 나감 처리로 간주
      if (getCookies(GAME_NAME)) {
        if (sessionStorage.length === 0) {
          throw { errCase: 'sessionStorageLoss', message: 'reload sessionStorageLoss failed.' };
        };
      } else {
        if (sessionStorage.length > 0) {
          throw { errCase: 'cookies', message: 'reload cookies failed.' };
        };
      };
      await new Promise(resolve => setTimeout(resolve, 1000));
    } else {
      delCookies(GAME_NAME);
    };

    // 아예 처음 진입했거나,
    // 새로고침 했는데,
    // window.sessionStorage.length가 0보다 크고,
    // gc_at 쿠키가 있으면 이 단계로 진입

    await rtcPeer(GAME_NAME);

    // webRTC 연결 후,
    // gameState가 있으면 이 단계로 진입

    await makeCard();

    if (reload) {
      const encryptKey = findCharCode([77, 73, 75, 86, 85, 68, 75, 76, 87, 79, 68]); // gameState
      const decryptVal = window.sessionStorage.getItem(encryptKey);

      switch (decryptVal) {
        case findCharCode([74, 75, 71, 90, 87, 79, 85, 69, 65, 88]): // waitEnemy
        case findCharCode([87, 74, 65, 80, 89, 85, 90, 84, 72, 82]): // choiceCard
          indianPockerGameState.choiceCard();
          break;
        case findCharCode([70, 72, 86, 88, 82, 66, 75, 89, 79, 68]): // basicBet
          indianPockerGameState.basicBet();
          break;
        default:
          throw throwObj('sessionStorageLoss', 'reload gameState not found');
      };
    } else {
      // 처음 진입해서 상대 peer 와 연결 대기 중 새로고침 안하고
      // 처음 연결 되면
      // choiceCard 단계로 진입
      indianPockerGameState.choiceCard();
    };

    console.log('betUser : ', findCharCode([72, 70, 85, 67, 83, 68, 89, 82, 77, 88]));


  } catch (error) {
    console.log('error indianPocker.js >>>>>>>>>>>> ');
    errorManager(error, false);
  };
};
