import { timeInterval_1 } from '@/client/js/functions/variable';
import rfDrawEnemyBlock from '@/client/js/refresh/indianpoker/refreshPlaying/refreshRoundEndDrew/rfDrawEnemyBlock';

export default () => {
  // window.sessionStorage.removeItem("drewState");
  // window.sessionStorage.removeItem("drewReady");
  // window.sessionStorage.removeItem("dropState");
  // window.sessionStorage.setItem("betState", "extraBetting");
  const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
  if (!EXT_FIRST_BET) window.sessionStorage.setItem('extFirstBet', false);

  // 명령
  setTimeout(() => {
    setTimeout(rfDrawEnemyBlock, timeInterval_1);
  }, timeInterval_1);
};
