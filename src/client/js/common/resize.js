import { setInnerHeight } from "@/client/js/module/appHeight";
import { deviceCheck } from "@/client/js/module/deviceCheck";
import mainLogo from "@/client/js/views/main/fns/mainLogo";

window.addEventListener('resize', () => {
  setInnerHeight();
  deviceCheck();
  mainLogo();
});
