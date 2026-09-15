import { setInnerHeight } from "@/client/js/module/appHeight";
import { deviceCheck } from "@/client/js/module/deviceCheck";
import mainLogo from "@/client/js/views/main/fns/mainLogo";
import gameCardResize from '@/client/js/views/main/fns/gameCardResize';

window.addEventListener('resize', () => {
  setInnerHeight();
  deviceCheck();
  mainLogo();
  gameCardResize();
});
