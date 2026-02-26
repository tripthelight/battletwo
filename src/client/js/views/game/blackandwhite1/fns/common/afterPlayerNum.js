import { request } from '@/client/js/network/blackAndWhite1/request';

export default (num, index) => {
  request("afterPlayerNumber", { num, index })
};
