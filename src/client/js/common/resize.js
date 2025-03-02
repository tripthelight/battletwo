import { setInnerHeight } from "@/client/js/module/appHeight";
import { deviceCheck } from "@/client/js/module/deviceCheck";

window.addEventListener('resize', () => {
  setInnerHeight();
  deviceCheck();
});
