import drawEnemyBlock from '@/client/js/views/game/indianPocker/fns/gameState/stateBasicBet/drawEnemyBlock';

export default () => {
  if (document.querySelector('.round-result')) document.querySelector('.round-result').remove();
  drawEnemyBlock();
};
