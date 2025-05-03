import { timeInterval_1 } from '@/client/js/functions/variable';
import drawBettingZoneCoins from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawBettingZoneCoins';

export default () => {
  // element | seeeion 체크
  const GAME_SCENE = document.getElementById('gameScene');
  if (!GAME_SCENE) return;
  const BETTING_ZONE = document.querySelector('.betting-zone');
  if (BETTING_ZONE) return drawBettingZoneCoins();

  // 명령
  setTimeout(() => {
    let elem = document.createElement('div');
    elem.classList.add('betting-zone');
    GAME_SCENE.appendChild(elem);

    // 다음 함수 실행
    setTimeout(drawBettingZoneCoins, timeInterval_1);
  }, timeInterval_1);
};
