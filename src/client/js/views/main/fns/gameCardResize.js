import cardData from "@/client/js/views/main/fns/cardData";
import getTransformRotate from '@/client/js/module/transform/getTransformRotate';
import makeCardPairs from "@/client/js/views/main/fns/makeCardPairs";
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) return;
    const cardWrap = container.querySelector(".game-cards");
    if (!cardWrap) return;
    const cardLists = cardWrap.querySelectorAll(".card");
    if (!cardLists.length) return;

    cardWrap.classList.remove('card-rotate-ani'); // transition 제거

    const WW = window.innerWidth;
    const WH = window.innerHeight;
    const cardSize = Math.round(Math.hypot(WW, WH));

    document.documentElement.style.setProperty('--main-card-size', `${ cardSize }px`);

    const cards = makeCardPairs();

    const { toy, tty, l, r } = cardData();

    for (const [key, cardEven] of Object.entries(cards)) {
      cardEven.forEach(card => {
        const tr = getTransformRotate(card);

        if (card.classList.contains('l')) {
          card.style.setProperty('transform-origin', `${ l.tox }px ${ toy }px`);
          card.style.setProperty(
            'transform',
            `
              translate(${ l.ttx }px, ${ tty }px)
              rotate(${ tr }deg)
            `
          );
        } else if (card.classList.contains('r')) {
          card.style.setProperty('transform-origin', `${ r.tox }px ${ toy }px`);
          card.style.setProperty(
            'transform',
            `
              translate(${ r.ttx }px, ${ tty }px)
              rotate(${ tr }deg)
            `
          );
        }
      });
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'gameCardResize.js error'
    );
  }
}
