import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  const WW = window.innerWidth;
  const WH = window.innerHeight;
  const overlay = 10; // card l과 r이 겹치는 size
  const cardSize = Math.round(Math.hypot(WW, WH));

  return {
    toy: 0 - (Math.round(WH / 20)), // transform-origin y
    tty: WH / 2 - (0 - (Math.round(WH / 20))), // transform translate y
    l: {
      tox: cardSize / 2, // transform-origin x
      ttx: (0 - cardSize / 2) + WW / 2, // transform translate x
      zi: 1 // z-index l
    },
    r: {
      tox: overlay, // transform-origin x
      ttx: WW / 2 - overlay, // transform translate x
      zi: 2 // z-index r
    }
  }
}
