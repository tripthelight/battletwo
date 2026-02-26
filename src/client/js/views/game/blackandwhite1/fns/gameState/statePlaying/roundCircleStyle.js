import { getStyle } from "@/client/js/functions/comnExport";

export default (elem, sbElem) => {
  const NOTCH_BOTTOM = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--safe-bottom"));
  // elem.style.bottom = sbElem.clientHeight + parseInt(getStyle(sbElem, "bottom")) + 10 + "px";
  elem.style.bottom = `${sbElem.clientHeight + parseInt(getStyle(sbElem, "bottom")) + 10 + NOTCH_BOTTOM}px`;
};
