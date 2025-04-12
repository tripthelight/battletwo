import storageMethod from '@/client/js/module/storage/storageMethod.js';
import { request } from '@/client/js/communication/taptap/request';

export default (count) => {
  count.value = Number(count.value) + 1;
  storageMethod('s', 'SET_ITEM', 'tap-count', Number(count.value));
  request('tapCount', Number(count.value));
};
