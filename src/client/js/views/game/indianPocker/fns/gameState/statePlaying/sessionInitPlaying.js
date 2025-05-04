import { timeInterval_1 } from '@/client/js/functions/variable';
import drawEnemyBlockPlaying from '@/client/js/views/game/indianPocker/fns/gameState/statePlaying/drawEnemyBlockPlaying';

export default () => {
  window.sessionStorage.removeItem('drewState');
  window.sessionStorage.removeItem('drewReady');
  window.sessionStorage.removeItem('dropState');
  window.sessionStorage.setItem('betState', 'extraBetting');
  const EXT_FIRST_BET = window.sessionStorage.extFirstBet;
  if (!EXT_FIRST_BET) window.sessionStorage.setItem('extFirstBet', false);

  // 명령
  setTimeout(() => {
    setTimeout(drawEnemyBlockPlaying, timeInterval_1);
  }, timeInterval_1);
};
