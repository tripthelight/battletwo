import {
  applyInnerSquareTurnView,
  positionInnerSquare
} from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/innerSquareTurnView';

export default () => {
  const INNER_SQUARE = document.querySelector(".inner-square");
  if (!INNER_SQUARE) return;

  applyInnerSquareTurnView(INNER_SQUARE);
  positionInnerSquare(INNER_SQUARE);
};
