import { getStyle } from '@/client/js/functions/comnExport';
import { timeInterval_1, timeInterval_1001 } from '@/client/js/functions/variable';
import { errorManagement } from '@/client/js/module/errorManagement';

export default () => {
  return new Promise((resolve, reject) => {
    const COINS_PLAYER = window.sessionStorage.coinsPlayer;
    if (!COINS_PLAYER) return errorManagement({ errCase: 'errorComn', message: 'fold 버튼 페널티 시 coinsPlayer 세션이 없습니다' });
    if (Number(COINS_PLAYER) === 0) return resolve('nextRound'); // 다음 함수 실행
    const COINS_PLAYER_EL = document.querySelector('.coins-player');
    if (!COINS_PLAYER_EL) return errorManagement({ errCase: 'errorComn', message: 'fold 버튼 페널티 시 .coins-player 엘리먼트가 없습니다' });
    const PLAYER_COINS = COINS_PLAYER_EL.querySelectorAll('li');
    if (PLAYER_COINS.length === 0) return resolve('nextRound'); // 다음 함수 실행
    const COINS_ENEMY = window.sessionStorage.coinsEnemy;
    if (!COINS_ENEMY) return errorManagement({ errCase: 'errorComn', message: 'fold 버튼 페널티 시 coinsEnemy 세션이 없습니다' });
    const BETTING_ZONE = document.querySelector('.betting-zone');
    if (!BETTING_ZONE) return errorManagement({ errCase: 'errorComn', message: 'fold 버튼 페널티 시 .betting-zone 엘리먼트가 없습니다' });
    const COINS_ENEMY_EL = document.querySelector('.coins-enemy');
    if (!COINS_ENEMY_EL) return errorManagement({ errCase: 'errorComn', message: 'fold 버튼 페널티 시 .coins-enemy 엘리먼트가 없습니다' });
    const ENEMY_COINS = COINS_ENEMY_EL.querySelectorAll('li');
    const PENALTY_COINS = Number(COINS_PLAYER) >= 10 ? 10 : Number(COINS_PLAYER);
    const LAST_ENEMY_EL = ENEMY_COINS.length > 0 ? ENEMY_COINS[ENEMY_COINS.length - 1] : 0;
    const PPL = getStyle(COINS_PLAYER_EL, 'padding-left');
    const EPB = getStyle(COINS_ENEMY_EL, 'padding-bottom');
    let cw = ENEMY_COINS[0] ? ENEMY_COINS[0].getBoundingClientRect().width : PLAYER_COINS[0] ? PLAYER_COINS[0].getBoundingClientRect().width : 0;
    let ch = ENEMY_COINS[0] ? ENEMY_COINS[0].getBoundingClientRect().height : PLAYER_COINS[0] ? PLAYER_COINS[0].getBoundingClientRect().height : 0;
    let lastOsLeft = LAST_ENEMY_EL === 0 ? 0 : LAST_ENEMY_EL.offsetLeft;
    let basicTop = Number(BETTING_ZONE.clientHeight);
    let playerIdx = Number(COINS_PLAYER) - 1;
    let xIndex = 1;
    let yIndex = 0;
    let moves = [];
    for (let i = 0; i < Number(PENALTY_COINS); i++) {
      if (lastOsLeft <= PPL) {
        lastOsLeft = Number(window.innerWidth - PPL);
        xIndex = 1;
        yIndex += 1;
      }
      if (Number(0 - PLAYER_COINS[playerIdx].offsetLeft + lastOsLeft - cw * xIndex) < 0) {
        if (Number(PLAYER_COINS[playerIdx].offsetLeft) - Math.abs(Number(0 - PLAYER_COINS[playerIdx].offsetLeft + lastOsLeft - cw * xIndex)) <= PPL) {
          lastOsLeft = Number(window.innerWidth - PPL);
          xIndex = 1;
          yIndex += 1;
        }
      }
      moves.push({
        x: Number(0 - PLAYER_COINS[playerIdx].offsetLeft + lastOsLeft - cw * xIndex),
        y: Number(0 - PLAYER_COINS[playerIdx].offsetTop - basicTop - document.querySelector('.coins-enemy').clientHeight + EPB - cw * yIndex),
      });
      playerIdx = playerIdx - 1;
      xIndex += 1;
    }
    let mIdx = 0;
    for (let i = PLAYER_COINS.length; i > PLAYER_COINS.length - Number(PENALTY_COINS); i--) {
      let resIdx = i - 1;
      PLAYER_COINS[resIdx].style.transition = 'transform 1s ease-in';
      PLAYER_COINS[resIdx].style.transform = 'translate(' + moves[mIdx].x + 'px, ' + moves[mIdx].y + 'px)';
      mIdx = mIdx + 1;
    }
    setTimeout(() => {
      const P_RESULT = Number(window.sessionStorage.coinsPlayer) - Number(PENALTY_COINS);
      const E_RESULT = Number(window.sessionStorage.coinsEnemy) + Number(PENALTY_COINS);
      window.sessionStorage.setItem('coinsPlayer', P_RESULT);
      window.sessionStorage.setItem('coinsEnemy', E_RESULT);
      setTimeout(resolve, timeInterval_1);
    }, timeInterval_1001);
  });
};
