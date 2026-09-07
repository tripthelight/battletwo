import drawRoundCircle from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/drawRoundCircle';
import restorePlayingProgress from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/restorePlayingProgress';

export default () => {
  let scoreBoard = document.querySelector('.score-board');

  if (!scoreBoard) {
    const sbEl = document.createElement('div');
    const dlElPlayer = document.createElement('dl');
    const dtElPlayer = document.createElement('dt');
    const dtElPlayerSpan1 = document.createElement('span');
    const dtElPlayerSpan2 = document.createElement('span');
    const ddElPlayer = document.createElement('dd');
    const dlElEnemy = document.createElement('dl');
    const dtElEnemy = document.createElement('dt');
    const dtElEnemySpan1 = document.createElement('span');
    const dtElEnemySpan2 = document.createElement('span');
    const ddElEnemy = document.createElement('dd');

    dtElPlayerSpan1.innerText = 'PLAYER';
    dtElEnemySpan1.innerText = 'OPPONENT';
    dtElPlayerSpan2.innerText = window.localStorage.getItem('nickname');
    dtElEnemySpan2.innerText = window.sessionStorage.getItem('enemyNick');

    dtElPlayer.appendChild(dtElPlayerSpan1);
    dtElPlayer.appendChild(dtElPlayerSpan2);
    dtElEnemy.appendChild(dtElEnemySpan1);
    dtElEnemy.appendChild(dtElEnemySpan2);

    dlElPlayer.appendChild(dtElPlayer);
    dlElPlayer.appendChild(ddElPlayer);
    dlElEnemy.appendChild(dtElEnemy);
    dlElEnemy.appendChild(ddElEnemy);

    sbEl.appendChild(dlElPlayer);
    sbEl.appendChild(dlElEnemy);

    dlElPlayer.classList.add('player');
    dlElEnemy.classList.add('enemy');
    ddElPlayer.innerText = '0';
    ddElEnemy.innerText = '0';
    sbEl.classList.add('score-board');

    const container = document.getElementById('container');

    if (!container) return;

    container.appendChild(sbEl);
    scoreBoard = sbEl;
  }

  // scoreboard가 기존 DOM이든 reload로 새로 생성됐든 round DOM을 보장한다.
  drawRoundCircle(scoreBoard);

  // DOM 생성과 같은 tick에서 저장된 진행값을 적용하므로 0:0 / 1로 paint되지 않는다.
  restorePlayingProgress();
};
