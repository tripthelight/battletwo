import { timeInterval_1 } from "@/client/js/functions/variable";

export default () => {
  const GO_HOME = document.querySelector("a.home");
  const REPLAY = document.querySelector("a.replay");
  GO_HOME.onclick = () => {
    location.replace("/");
  };
  REPLAY.onclick = () => {
    setTimeout(() => {
      location.replace("/");
      window.sessionStorage.clear();
      setTimeout(() => {
        location.replace("/findsamepicture");
      }, timeInterval_1);
    }, timeInterval_1);
  };
};
