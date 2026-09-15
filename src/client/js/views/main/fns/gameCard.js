import GAME_LIST from '@/client/js/webpack/JSON/gameList.json';
import cardData from "@/client/js/views/main/fns/cardData";
import getTranslateXY from '@/client/js/module/transform/getTranslateXY';
import getTransformRotate from '@/client/js/module/transform/getTransformRotate';
import delay from '@/client/js/module/delay';
import makeCardPairs from "@/client/js/views/main/fns/makeCardPairs";
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default async () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'gameCard.js - container element failed.');
    const cardWrap = container.querySelector(".game-cards");
    if (!cardWrap) throw throwObj('elementLoss', 'gameCard.js - .game-cards element failed.');

    const gameList = GAME_LIST.gameList;
    if (!gameList.length) throw throwObj('errorComn', 'gameCard.js - gameList length error.');

    const WW = window.innerWidth;
    const WH = window.innerHeight;
    const overlay = 10; // card l과 r이 겹치는 size
    const angle = 360 / gameList.length;
    const getRandomDegree = Math.floor(Math.random() * 361);
    const getRotateDegree = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;;

    document.documentElement.style.setProperty('--main-card-overlay', `${ overlay }px`);

    const cardSize = Math.round(Math.hypot(WW, WH));
    document.documentElement.style.setProperty('--main-card-size', `${ cardSize }px`);

    const { toy, tty, l, r } = cardData();

    // rotate init
    for (let i = 0; i < gameList.length; i++) {
      const randomAngle = i * angle + getRandomDegree;
      const cutAngle = randomAngle > 360 ? randomAngle - 360 : randomAngle;

      for (let j = 0; j < 2; j++) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.classList.add(gameList[i]);

        card.style.setProperty('z-index', 3);

        if (j === 0) {
          card.classList.add("l");
          card.style.setProperty('transform-origin', `${ l.tox }px ${ toy }px`);
          card.style.setProperty(
            'transform',
            `
              translate(${ l.ttx }px, ${ tty }px)
              rotate(${ cutAngle }deg)
            `
          );
          if (i === gameList.length - 1) {
            // card.style.setProperty('z-index', l.zi);
          }
        } else if (j === 1) {
          card.classList.add("r");
          card.style.setProperty('transform-origin', `${ r.tox }px ${ toy }px`);
          card.style.setProperty(
            'transform',
            `
              translate(${ r.ttx }px, ${ tty }px)
              rotate(${ cutAngle }deg)
            `
          );
          if (i === 0) {
            // card.style.setProperty('z-index', r.zi);
          }
        }

        cardWrap.appendChild(card);
      }
    };

    // rotate animation
    await delay(1);
    cardWrap.classList.add('card-rotate-ani'); // // transition 적용
    const aniAngle = getRotateDegree(40, 80);
    const cards = makeCardPairs();
    const delayTime = 80;
    let duration = 1000;

    for (const [key, cardEven] of Object.entries(cards)) {
      cardEven.forEach(card => {
        document.documentElement.style.setProperty('--main-card-transition-duration', `${ duration }ms`);
        const tx = getTranslateXY(card).translateX;
        const ty = getTranslateXY(card).translateY;
        const tr = getTransformRotate(card) + aniAngle;

        card.style.setProperty(
          'transform',
          `
            translate(${ tx }px, ${ ty }px)
            rotate(${ tr }deg)
          `
        );
      });

      await delay(delayTime);
      duration -= delayTime;
    }
  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'gameCard.js error'
    );
  }
}
