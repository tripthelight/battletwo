import { timeInterval_1000 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';
import { request } from '@/client/js/communication/indianPocker/request';
import { RF_END_DREW } from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/refreshDrewInit';

export default (_data) => {
  const PROMISE = new Promise((resolve, reject) => {
    resolve(_data);
  });
  PROMISE.then((_data) => {
    console.log('_data >>>>>>>> ', _data);

    if (_data) {
      setTimeout(() => {
        const BET_RESULTING = window.sessionStorage.betResulting;
        if (BET_RESULTING && BET_RESULTING === 'true') {
          // round end 화면에서 drew일 때 새로고침하면,
          // 상대방에게 여기를 받고 내 화면을, 완벽히 그려야돼
          RF_END_DREW.main();
          setTimeout(() => {
            const ROUND_END_RELOAD = window.sessionStorage.roundEndReload;
            if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'true') {
              request('enterDrew', true); // *** 서로 새로고침 하면 없어야 됨
            } else if (ROUND_END_RELOAD && ROUND_END_RELOAD === 'false') {
            }
            window.sessionStorage.removeItem('betResulting');
            window.sessionStorage.removeItem('roundEndReload');
            // setSocketEnterDrewCheck(true);
            setTimeout(() => {
              if (!window.sessionStorage.drewReady || window.sessionStorage.drewReady !== 'true') request('enterDrew', false);
              if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === 'true') {
                if (window.sessionStorage.betUser === 'true') createBattleCardNum();
              }
            }, 102);
          }, 101);
        } else {
          if (!window.sessionStorage.drewReady || window.sessionStorage.drewReady !== 'true') request('enterDrew', false);
          if (window.sessionStorage.drewReady && window.sessionStorage.drewReady === 'true') {
            if (window.sessionStorage.betUser === 'true') createBattleCardNum();
          }
        }
      }, 100);
    } else if (!_data) {
      setTimeout(() => {
        request('enterDrew', true);
      }, timeInterval_1000);
    }
  }).catch((error) => {
    errorManagement({ errCase: 'errorComn', message: 'enterPlayingResult() 함수를 못탐 22 ::: ' });
  });
  // 명령
};
