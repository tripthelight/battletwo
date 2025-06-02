import storageMethod from '@/client/js/module/storage/storageMethod';
import { RF_END_DREW } from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/refreshDrewInit';
import { request } from '@/client/js/communication/indianPocker/request';
import createBattleCardNum from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/createBattleCardNum';

export default (data) => {
  setTimeout(() => {
    storageMethod('s', 'REMOVE_ITEM', 'betResulting');
    storageMethod('s', 'REMOVE_ITEM', 'roundEndReload');
    RF_END_DREW.main();
    setTimeout(() => {
      request('enterDrew', true);
      setTimeout(() => {
        console.log('window.sessionStorage.betUser :: ', window.sessionStorage.betUser);
        if (window.sessionStorage.betUser === 'true') createBattleCardNum();
      }, 202);
    }, 201);
  }, 200);
};
