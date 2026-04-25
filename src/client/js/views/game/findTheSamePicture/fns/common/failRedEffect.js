import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  const FAIL_EFFECT_CHK = document.querySelector(".fail-effect");
  if (FAIL_EFFECT_CHK) return;

  const FAIL_EFFECT = document.createElement("div");
  FAIL_EFFECT.classList.add("fail-effect");

  const CONTAINER = document.getElementById("container");
  if (!CONTAINER) throw throwObj('elementLoss', "failRedEffect.js - #container element failed.");
  CONTAINER.appendChild(FAIL_EFFECT);

  setTimeout(() => {
    FAIL_EFFECT.remove();
  }, 601);
};
