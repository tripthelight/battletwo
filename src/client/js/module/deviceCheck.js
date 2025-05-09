import deviceStateStore, { updateDeviceState } from '@/client/store/deviceStateStore';

/**
 * PC, MOBILE CHECK
 */
export function deviceCheck () {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    // mobile
    deviceStateStore.dispatch(updateDeviceState('mobile'));
    document.body.classList.remove("pc");
    document.body.classList.remove("notIE");
    document.body.classList.add("mobile");
  } else {
    // pc
    deviceStateStore.dispatch(updateDeviceState('pc'));
    document.body.classList.remove("mobile");
    document.body.classList.add("pc");

    const GNB = document.querySelector(".gnb");
    if (GNB) GNB.setAttribute("aria-hidden", "false");

    const agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == "Netscape" && agent.indexOf("trident") != -1) || agent.indexOf("msie") != -1) {
      // pc : ie
      const URL = window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
      if (navigator.userAgent.indexOf("Trident") > 0) {
        console.log("exLog");
        window.location = "microsoft-edge:" + URL;
      } else if (/MSIE \d |Trident.*rv:/.test(navigator.userAgent)) {
        console.log("exLog");
        window.location = "microsoft-edge:" + URL;
      }
      document.body.classList.remove("notIE");
      document.body.classList.add("IE");
    } else {
      // pc : not ie
      document.body.classList.remove("IE");
      document.body.classList.add("notIE");
    }
  }
};
