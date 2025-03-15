// import taptapRes from './taptapRes.js';
import storageMethod from '@/client/js/module/storage/storageMethod.js';
import { request } from '@/client/js/communication/taptap/request';

export default (count) => {
  let cnt = Number(count.value);
  count.value = ++cnt;
  storageMethod('s', 'SET_ITEM', 'tap-count', count.value);
  // taptapRes.tapCount(count.value);
  request('tapCount', count.value);
};
