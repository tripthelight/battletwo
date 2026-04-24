export default () => {
  return new Promise((resolve, reject) => {
    const PIC_CARD_FLIP = document.querySelectorAll(".picture-card");
    if (PIC_CARD_FLIP.length < 1) reject("not found .picture-card");
    for (let i = 0; i < PIC_CARD_FLIP.length; i++) {
      let loopNum = 0;
      loopNum = (Math.random() * 3).toFixed(2);
      if (loopNum < 1) loopNum = 1;
      const STATE = PIC_CARD_FLIP[i].classList.contains("active");
      const ACTIVE_CASE = `transform ${loopNum}s ease-in`;
      const DEFAULT_CASE = `transform ${loopNum}s ease-in, opacity .2s ease-in`;
      PIC_CARD_FLIP[i].style.transition = STATE ? ACTIVE_CASE : DEFAULT_CASE;
    }
    resolve(PIC_CARD_FLIP);
    // // setTimeout(resolve, 1, PIC_CARD_FLIP);
  });
};
