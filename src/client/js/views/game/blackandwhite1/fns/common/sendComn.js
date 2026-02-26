import beforePlayerNum from "@/client/js/views/game/blackAndWhite1/fns/common/beforePlayerNum";
import changeActiveUser from '@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeActiveUser';
import afterPlayerNum from "@/client/js/views/game/blackAndWhite1/fns/common/afterPlayerNum";
import changeCubeSession from "@/client/js/views/game/blackAndWhite1/fns/gameState/statePlaying/changeCubeSession";

export default (num, index) => {
  const MY_UID = window.localStorage.getItem("uid");
  const USER_ORDER = window.sessionStorage.getItem("userOrder");
  const USER_ORDER_ARR = USER_ORDER.split(",");
  for (let i = 0; i < USER_ORDER_ARR.length; i++) {
    if (USER_ORDER_ARR[0] == MY_UID) {
      // 내가 선
      beforePlayerNum(num, index);
      changeActiveUser();
      break;
    } else {
      // 내가 후
      afterPlayerNum(num, index);
      break;
    }
  }
  changeCubeSession(num);
};
