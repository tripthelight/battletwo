import STATE_WAIT_ENEMY from '@/client/js/views/game/findTheSamePicture/fns/gameState/stateWaitEnemy/init';

export default () => {
  STATE_WAIT_ENEMY.main();
};

export function endGameStateWaitEnemy() {
  STATE_WAIT_ENEMY.end();
}
