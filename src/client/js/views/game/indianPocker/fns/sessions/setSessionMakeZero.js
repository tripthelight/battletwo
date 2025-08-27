import storageMethod from '@/client/js/module/storage/storageMethod';
import textDE from '@/client/js/module/crypts/textDE';
import { encryptNumOfStr } from '@/client/js/module/crypts/encryptNumber';
import { enc } from '@/client/js/module/crypts/obf8lower';

export default (_session) => {
  // storageMethod('s', 'SET_ITEM', _session, 0);
  storageMethod('s', 'SET_ITEM',
    _session,
    enc(encryptNumOfStr(textDE([101, 101, 101, 101]))) // "eeee" : 0
  );
};
