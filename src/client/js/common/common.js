import '@/client/assets/scss/common';
import clearStorage from '@/client/js/common/clearStorage';
import storageEvent from '@/client/js/module/storage/storageEvent';
import '@/client/js/module/networkCheck';
import '@/client/js/module/browserLang';
import { setInnerHeight } from '@/client/js/module/appHeight';
import { deviceCheck } from '@/client/js/module/deviceCheck';
import '@/client/js/common/gesture';
import '@/client/js/common/resize';

clearStorage(window.location.pathname);
storageEvent();
setInnerHeight();
deviceCheck();
