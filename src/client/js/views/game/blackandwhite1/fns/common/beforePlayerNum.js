import { request } from '@/client/js/network/blackAndWhite1/request';

export default (num, index) => {
  window.sessionStorage.setItem("beforePlayerNum", num);
  request("beforePlayerNumber", { index })
};
