import cardData from "@/client/js/views/main/fns/cardData";
import throwObj from '@/client/js/module/errorHandler/throwObj';

export default () => {
  try {
    const container = document.getElementById("container");
    if (!container) throw throwObj('elementLoss', 'mainLogo.js - container element failed.');
    const mainLogoWrap = container.querySelector(".main-logo");
    if (!mainLogoWrap) throw throwObj('elementLoss', 'mainLogo.js - .main-logo element failed.');
    const mainLogoSVG = mainLogoWrap.querySelector("SVG");
    if (!mainLogoSVG) throw throwObj('elementLoss', 'mainLogo.js - .main logo SVG element failed.');

    const { toy } = cardData();
    const diameter = Math.abs(toy * 2); // 중앙 도형의 지름
    const logoSize = Math.round(diameter - (diameter * 0.4)); // LOGO의 width, height는 중앙 도형의 지름의 60%
    document.documentElement.style.setProperty('--main-logo-size', `${ logoSize }px`);

  } catch (error) {
    throw throwObj(
      error?.errCase ?? 'errorComn',
      error?.message ?? 'mainLogo.js error'
    );
  }
}
